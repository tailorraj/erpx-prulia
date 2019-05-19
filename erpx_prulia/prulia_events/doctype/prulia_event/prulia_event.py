# -*- coding: utf-8 -*-
# Copyright (c) 2018, Alpha Harald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json, datetime
from frappe.model.document import Document
from frappe.utils import now_datetime
from erpx_prulia.prulia_members.doctype.prulia_member.prulia_member import mobile_member_login

class PRULIAEvent(Document):
	pass


@frappe.whitelist()
def add_attendance(member, member_name, event, meal, shirt, accomodation):
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
		"meal_option" : meal,
		"accomodation": accomodation,
		"agency_no": member_data.agency_no
	})
	event.save()
	frappe.msgprint("Your attendance is confirmed")

@frappe.whitelist()
def check_registration(member, event):
	event = frappe.get_doc("PRULIA Event", event)
	validate = frappe._dict()
	if event.event_status == "Open For Registration":
		validate.register = True
		validate.cancel = False

		for attendee in event.attendee:
			if(attendee.member == member):
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
			if(attendee.member == member):
				event.remove(attendee)
				event.save()
				check_exist = True
				frappe.msgprint("Your attendance is cancelled")
	if not check_exist:
		throw (_("Record not found"))
	
@frappe.whitelist()
def get_event_list(member_name):
	events = frappe.get_all('PRULIA Event', fields=['name', 'event_name', 'description', 'start_date_time', 'end_date_time', 'venue', 'event_status', 'position_restriction', 'event_image', 'show_open_for_registration', 'display_accomodation_option', 'display_shirt_option'], 
		filters=[('PRULIA Event', "start_date_time", ">=", now_datetime().date()), ('PRULIA Event', "event_status", "!=", "Draft")],
		order_by='start_date_time desc')
	member = frappe.get_doc("PRULIA Member", member_name)

	event_result = []
	for event in events:
		if (event.position_restriction and event.position_restriction != member.position) :
			continue 

		registration = frappe.get_all('PRULIA Attendee', filters={'member': member_name, 'parent': event.name}, fields=['name', 'shirt_size', 'meal_option', 'accomodation'])
		if registration:
			event.register = True
			event.attendee_name = registration[0].name
			event.shirt_size = registration[0].shirt_size
			event.meal_option = registration[0].meal_option
			event.accomodation = registration[0].accomodation
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
		attendee_rec.save()
		return "success"

@frappe.whitelist(allow_guest=True)
def get_event_list_web():
	events = frappe.get_all('PRULIA Event', fields=['name', 'event_name', 'description', 'start_date_time', 'end_date_time', 'venue', 'event_status', 'position_restriction', 'event_image', 'show_open_for_registration', 'display_accomodation_option', 'display_shirt_option'], 
		filters=[('PRULIA Event', "start_date_time", ">=", now_datetime().date()), ('PRULIA Event', "event_status", "!=", "Draft")],
		order_by='start_date_time desc')

	if frappe.session.user != 'Guest': 
		member = mobile_member_login()
		for event in events:
			registration = frappe.get_all('PRULIA Attendee', filters={'member': member.name, 'parent': event.name}, fields=['name', 'shirt_size', 'meal_option', 'accomodation'])
			if registration:
				event.register = True
				event.attendee_name = registration[0].name
				event.shirt_size = registration[0].shirt_size
				event.meal_option = registration[0].meal_option
				event.accomodation = registration[0].accomodation
			else:
				event.register = False
			if (event.position_restriction and event.position_restriction == member.position) :
				event.can_register = True
			elif event.position_restriction == None:
				event.can_register = True
			else:
				event.can_register = False
	else: 
		for event in events:
			event.register = False

	return events

