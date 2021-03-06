# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
import datetime
from frappe.model.document import Document
from frappe.utils import now_datetime, get_url
from frappe import _, throw
from erpx_prulia.prulia_members.doctype.prulia_member.prulia_member import mobile_member_login
from erpx_prulia.onesignal import push_noti
from jinja2 import Template


class PRULIATraining(Document):
    def validate(self):
        status = 'open For Registration'
        if not self.is_new():
            old_doc = frappe.get_doc("PRULIA Training", self.name)
            if self.training_status == 'Publish':
                status = 'published'
            if old_doc.training_status != self.training_status and (
                    self.training_status == 'Publish' or self.training_status == 'Open For Registration'):
                # set image
                big_image = (self.training_image or '')
                if big_image:
                    big_image = get_url() + self.training_image
                else:
                    throw(_('Please provide an image'))
                # set tags to restrict to QL only
                filters = []
                if self.position_restriction == 'QL':
                    filters = [
                        {'field': 'tag', 'key': 'position', 'relation': '=',
                         'value': self.position_restriction}
                    ]
                push_noti('A new training {} is now {}'.format(
                    self.training_name, status), big_image, filters)
            else:
                pass


@frappe.whitelist()
def add_attendance(data):
    ret = json.loads(data)
    member = ret.get('member')
    member_name = ret.get('member_name')
    event = ret.get('event')
    meal = ret.get('meal')
    shirt = ret.get('shirt')
    accomodation = ret.get('accomodation')

    member_data = frappe.get_doc("PRULIA Member", member)
    event = frappe.get_doc("PRULIA Training", event)
    event.flags.ignore_permissions = True
    event.append("trainee", {
        "member": member,
        "member_name": member_name,
        "nric_number": member_data.nric_number,
        "cell_number": member_data.cell_number,
        "email": member_data.email,
        "region": member_data.region,
        "branch": member_data.branch,
        "shirt_size": shirt,
        "meal_option": meal,
        "accomodation": accomodation,
        "agency_no": member_data.agency_no,
        "reg_datetime": now_datetime(),
        "fees": event.early_fees if event.early_fees else event.fees
    })
    event.save()
    frappe.msgprint("Your attendance is confirmed")


@frappe.whitelist()
def check_registration(member, training):
    training = frappe.get_doc("PRULIA Training", training)
    validate = frappe._dict()
    if training.training_status == "Open For Registration":
        validate.register = True
        validate.cancel = False

        for trainee in training.trainee:
            if (trainee.member == member):
                validate.register = False
                validate.cancel = True
                break

    else:
        validate.register = False
        validate.cancel = False

    return validate


@frappe.whitelist()
def del_attendance(member, training):
    training = frappe.get_doc("PRULIA Training", training)
    training.flags.ignore_permissions = True
    check_exist = False
    for trainee in training.trainee:
        if (trainee.member == member):
            training.remove(trainee)
            training.save()
            check_exist = True
            frappe.msgprint("Your attendance is cancelled")
    if not check_exist:
        throw(_("Record not found"))


@frappe.whitelist()
def get_training_list(member_name):
    trainings = frappe.get_all('PRULIA Training',
                               fields=['name', 'training_name', 'description', 'start_date_time', 'end_date_time', 'venue',
                                       'training_status', 'position_restriction', 'training_image', 'show_open_for_registration',
                                       'display_accomodation_option', 'display_shirt_option'],
                               filters=[('PRULIA Training', "end_date_time", ">=", now_datetime().date()),
                                        ('PRULIA Training', "training_status", "!=", "Draft")],
                               order_by='start_date_time desc')
    member = frappe.get_doc("PRULIA Member", member_name)

    training_result = []
    global_defaults = frappe.get_doc("Global Defaults")
    for training in trainings:
        if (training.position_restriction and training.position_restriction != member.position):
            continue

        template = Template(training.description)
        training.description = template.render(member=member)

        registration = frappe.get_all('PRULIA Trainee', filters={'member': member_name, 'parent': training.name},
                                      fields=['name', 'shirt_size', 'meal_option', 'accomodation'])
        if registration:
            training.register = True
            training.trainee_name = registration[0].name
            training.shirt_size = registration[0].shirt_size
            training.meal_option = registration[0].meal_option
            training.accomodation = registration[0].accomodation
        else:
            training.register = False
        if global_defaults.default_currency:
            training.currency = global_defaults.default_currency
        training_result.append(training)
    return training_result


@frappe.whitelist()
def update_training_trainee(data):
    attendee = json.loads(data)
    attendee_rec = frappe.get_doc(
        "PRULIA Trainee", attendee.get('trainee_name'))
    if attendee_rec:
        attendee_rec.flags.ignore_permissions = True
        attendee_rec.meal_option = attendee.get('meal_option')
        attendee_rec.shirt_size = attendee.get('shirt_size')
        attendee_rec.accomodation = attendee.get('accomodation')
        attendee_rec.save()
        return "success"


@frappe.whitelist(allow_guest=True)
def get_training_list_web():
    trainings = frappe.get_all('PRULIA Training',
                               fields=['name', 'training_name', 'description', 'start_date_time', 'end_date_time', 'venue',
                                       'training_status', 'position_restriction', 'training_image', 'show_open_for_registration',
                                       'display_accomodation_option', 'display_shirt_option', 'fees', 'early_fees'],
                               filters=[('PRULIA Training', "end_date_time", ">=", now_datetime().date()),
                                        ('PRULIA Training', "training_status", "!=", "Draft")],
                               order_by='start_date_time desc')
    global_defaults = frappe.get_doc("Global Defaults")

    if frappe.session.user != 'Guest':
        member = mobile_member_login()
        for training in trainings:
            template = Template(training.description)
            training.description = template.render(member=member)

            registration = frappe.get_all('PRULIA Trainee', filters={'member': member.name, 'parent': training.name},
                                          fields=['name', 'shirt_size', 'meal_option', 'accomodation'])
            if registration:
                training.register = True
                training.trainee_name = registration[0].name
                training.shirt_size = registration[0].shirt_size
                training.meal_option = registration[0].meal_option
                training.accomodation = registration[0].accomodation
            else:
                training.register = False
            if (training.position_restriction and training.position_restriction == member.position):
                training.can_register = True
            if global_defaults.default_currency:
                training.currency = global_defaults.default_currency
            elif training.position_restriction == None:
                training.can_register = True
            else:
                training.can_register = False
        else:
            for training in trainings:
                training.register = False
                if global_defaults.default_currency:
                    training.currency = global_defaults.default_currency

    return trainings
