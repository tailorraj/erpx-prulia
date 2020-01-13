# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime
from erpx_prulia.prulia_members.doctype.prulia_member.prulia_member import mobile_member_login

class PRULIATraining(Document):
	pass

@frappe.whitelist()
def add_attendance(member, member_name, training, meal, shirt, accomodation):
	member_data = frappe.get_doc("PRULIA Member", member)
	training = frappe.get_doc("PRULIA Training", training)
	training.flags.ignore_permissions = True
	training.append("trainee", {
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
		"fees": training.early_fees if training.early_fees else training.fees
	})
	training.save()
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
							filters=[('PRULIA Training', "start_date_time", ">=", now_datetime().date()),
									 ('PRULIA Training', "training_status", "!=", "Draft")],
							order_by='start_date_time desc')
	member = frappe.get_doc("PRULIA Member", member_name)

	training_result = []
	for training in trainings:
		if (training.position_restriction and training.position_restriction != member.position):
			continue

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
		training_result.append(training)
	return training_result


@frappe.whitelist()
def update_training_trainee(data):
	trainee = json.loads(data)
	trainee_rec = frappe.get_doc("PRULIA Trainee", trainee.get('trainee_name'))
	if trainee_rec:
		trainee_rec.flags.ignore_permissions = True
		trainee_rec.meal_option = trainee.get('meal_option')
		trainee_rec.shirt_size = trainee.get('shirt_size')
		trainee_rec.accomodation = trainee.get('accomodation')
		trainee_rec.save()
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

	if frappe.session.user != 'Guest':
		member = mobile_member_login()
		for training in trainings:
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
			elif training.position_restriction == None:
				training.can_register = True
			else:
				training.can_register = False
	else:
		for training in trainings:
			training.register = False

	return trainings
