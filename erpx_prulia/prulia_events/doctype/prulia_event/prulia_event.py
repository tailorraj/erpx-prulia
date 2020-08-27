# -*- coding: utf-8 -*-
# Copyright (c) 2018, Alpha Harald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json, datetime, requests
from frappe.model.document import Document
from frappe.utils import now_datetime, get_url
from frappe import _, throw
from erpx_prulia.prulia_members.doctype.prulia_member.prulia_member import mobile_member_login
from erpx_prulia.prulia_integrations.doctype.senangpay_settings.senangpay_settings import get_payment_link
from erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training import remove_unpaid_trainees


class PRULIAEvent(Document):
    def validate(self):
        status = 'open For Registration'
        if not self.is_new():
            old_doc = frappe.get_doc("PRULIA Event", self.name)
            if self.event_status == 'Publish':
                status = 'published'
            if old_doc.event_status != self.event_status and (
                    self.event_status == 'Publish' or self.event_status == 'Open For Registration'):

                # set image
                big_image = (self.event_image or '')
                if big_image:
                    big_image = get_url() + self.event_image
                else:
                    throw(_('Please provide an image'))

                # set tags to restrict to QL only
                filters = []
                if self.position_restriction == 'QL':
                    filters = [
                        {'field': 'tag', 'key': 'position', 'relation': '=', 'value': self.position_restriction}
                    ]

                push_noti('A new event {} is now {}'.format(self.event_name, status), big_image, filters)
            else:
                pass


def push_noti(content, image, filters=[]):
    url = "https://onesignal.com/api/v1/notifications"
    one_signal_api_key = frappe.local.conf.get('one_signal_api_key')
    one_signal_app_id = frappe.local.conf.get('one_signal_app_id')

    if len(filters) > 0:
        payload = {
            "app_id": one_signal_app_id,
            "filters": filters,
            "contents": {"en": content},
            "big_picture": image,
            "ios_attachments": {"image": image},
            "ios_badgeType": "Increase",
            "ios_badgeCount": 1
        }
    else:
        payload = {
            "app_id": one_signal_app_id,
            "included_segments": ["All"],
            "contents": {"en": content},
            "big_picture": image,
            "ios_attachments": {"image": image},
            "ios_badgeType": "Increase",
            "ios_badgeCount": 1
        }

    headers = {
        'content-type': "application/json",
        'authorization': "Basic {}".format(one_signal_api_key),
        'cache-control': "no-cache"
    }

    requests.request("POST", url, data=json.dumps(payload), headers=headers)


@frappe.whitelist()
def add_attendance(data):
    ret = json.loads(data)
    member = ret.get('member')
    member_name = ret.get('member_name')
    event = ret.get('event')
    meal = ret.get('meal')
    shirt = ret.get('shirt')
    accomodation = ret.get('accomodation')
    pref_lang = ret.get('pref_lang')

    member_data = frappe.get_doc("PRULIA Member", member)
    event = frappe.get_doc("PRULIA Event", event)
    event.flags.ignore_permissions = True
    event.append("attendee", {
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
        "fees": event.early_fees if event.early_fees else event.fees,
        "pref_lang": pref_lang
    })
    
    event.save()
    attendee_dt = frappe.get_doc("PRULIA Attendee", {"parent": event.name, "member": member})

    link = get_payment_link(event.description, event.fees, attendee_dt.name, member_name, member_data.email, member_data.cell_number)
    return {"payment_link": link}

@frappe.whitelist()
def update_payment_status(data):
    ret = json.loads(data)
    order_id = ret.get('order_id')
    msg = ret.get('msg')
    if msg == "Payment_was_successful":
        if frappe.db.exists("PRULIA Attendee", order_id):
            p_att = frappe.get_doc("PRULIA Attendee", order_id)
            p_att.paid = 1
            p_att.save()
        elif frappe.db.exists("PRULIA Trainee", order_id):
            p_att = frappe.get_doc("PRULIA Trainee", order_id)
            p_att.paid = 1
            p_att.save()
    else:
        if frappe.db.exists("PRULIA Attendee", order_id):
            p_att = frappe.get_doc("PRULIA Attendee", order_id)
            p_att.delete()
        elif frappe.db.exists("PRULIA Trainee", order_id):
            p_att = frappe.get_doc("PRULIA Trainee", order_id)
            p_att.delete()
    frappe.db.commit()
    # remove unpaids
    remove_unpaid_trainees()
    return "success"

@frappe.whitelist()
def check_registration(member, event):
    event = frappe.get_doc("PRULIA Event", event)
    validate = frappe._dict()
    if event.event_status == "Open For Registration":
        validate.register = True
        validate.cancel = False

        for attendee in event.attendee:
            if (attendee.member == member):
                validate.register = False
                validate.cancel = True
                break

    else:
        validate.register = False
        validate.cancel = False

    return validate


@frappe.whitelist()
def del_attendance(member, event):
    event = frappe.get_doc("PRULIA Event", event)
    event.flags.ignore_permissions = True
    check_exist = False
    for attendee in event.attendee:
        if (attendee.member == member):
            event.remove(attendee)
            event.save()
            check_exist = True
            frappe.msgprint("Your attendance is cancelled")
    if not check_exist:
        throw(_("Record not found"))


@frappe.whitelist()
def get_event_list(member_name):
    events = frappe.get_all('PRULIA Event',
                            fields=['name', 'event_name', 'description', 'start_date_time', 'end_date_time', 'venue',
                                    'event_status', 'position_restriction', 'event_image', 'show_open_for_registration',
                                    'display_accomodation_option', 'display_shirt_option', 'fees', 'early_fees',
                                    'break_up_session'],
                            filters=[('PRULIA Event', "end_date_time", ">=", now_datetime().date()),
                                     ('PRULIA Event', "event_status", "!=", "Draft")],
                            order_by='start_date_time desc')
    member = frappe.get_doc("PRULIA Member", member_name)

    event_result = []
    for event in events:
        if event.position_restriction and event.position_restriction != member.position:
            continue

        registration = frappe.get_all('PRULIA Attendee', filters={'member': member_name, 'parent': event.name},
                                      fields=['name', 'shirt_size', 'meal_option', 'accomodation', 'attendance',
                                              'pref_lang'])
        if registration:
            event.register = True
            event.attendee_name = registration[0].name
            event.shirt_size = registration[0].shirt_size
            event.meal_option = registration[0].meal_option
            event.accomodation = registration[0].accomodation
            event.attendance = registration[0].attendance
            event.pref_lang = registration[0].pref_lang
        else:
            event.register = False
        event_result.append(event)
    return event_result


@frappe.whitelist()
def update_event_attendee(data):
    attendee = json.loads(data)
    attendee_rec = frappe.get_doc("PRULIA Attendee", attendee.get('attendee_name'))
    if attendee_rec:
        attendee_rec.flags.ignore_permissions = True
        attendee_rec.meal_option = attendee.get('meal_option')
        attendee_rec.shirt_size = attendee.get('shirt_size')
        attendee_rec.accomodation = attendee.get('accomodation')
        attendee_rec.pref_lang = attendee.get('pref_lang')
        attendee_rec.save()
        return "success"


@frappe.whitelist(allow_guest=True)
def get_event_list_web():
    events = frappe.get_all('PRULIA Event',
                            fields=['name', 'event_name', 'description', 'start_date_time', 'end_date_time', 'venue',
                                    'event_status', 'position_restriction', 'event_image', 'show_open_for_registration',
                                    'display_accomodation_option', 'display_shirt_option', 'fees', 'early_fees',
                                    'break_up_session'],
                            filters=[('PRULIA Event', "end_date_time", ">=", now_datetime().date()),
                                     ('PRULIA Event', "event_status", "!=", "Draft")],
                            order_by='start_date_time desc')

    if frappe.session.user != 'Guest':
        member = mobile_member_login()
        for event in events:
            if event.break_up_session == 1 and event.position_restriction is not None:
                event._lang = frappe.get_all('PRULIA Event Languages',
                                             filters={'position_restriction': event.position_restriction},
                                             fields=['language'])
            registration = frappe.get_all('PRULIA Attendee', filters={'member': member.name, 'parent': event.name},
                                          fields=['name', 'shirt_size', 'meal_option', 'accomodation', 'attendance',
                                                  'pref_lang'])
            if registration:
                event.register = True
                event.attendee_name = registration[0].name
                event.shirt_size = registration[0].shirt_size
                event.meal_option = registration[0].meal_option
                event.accomodation = registration[0].accomodation
                event.attendance = registration[0].attendance
                event.pref_lang = registration[0].pref_lang
            else:
                event.register = False
            if (event.position_restriction and event.position_restriction == member.position):
                event.can_register = True
            elif event.position_restriction == None:
                event.can_register = True
            else:
                event.can_register = False
    else:
        for event in events:
            event.register = False

    return events


@frappe.whitelist()
def get_lang(data):
    res = json.loads(data)
    position = res.get('position')

    if position is None:
        docs = frappe.get_all('PRULIA Event Languages', fields=['language'])
    else:
        docs = frappe.get_all('PRULIA Event Languages', filters={'position_restriction': position}, fields=['language'])

    return docs
