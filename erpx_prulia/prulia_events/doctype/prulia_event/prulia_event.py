# -*- coding: utf-8 -*-
# Copyright (c) 2018, Alpha Harald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json, datetime
from frappe.model.document import Document
from frappe.utils import now_datetime

class PRULIAEvent(Document):
	pass


@frappe.whitelist()
def add_attendance(member, member_name, event, meal, shirt):
	event = frappe.get_doc("PRULIA Event", event)
	event.flags.ignore_permissions = True
	event.append("attendee", {
		"member": member,
		"member_name" : member_name,
		"shirt_size": shirt,
		"meal_option" : meal
	})
	event.save()
	frappe.msgprint("Your attendance is confirmed")

@frappe.whitelist()
def check_registration(member, event):
	event = frappe.get_doc("PRULIA Event", event)
	validate = frappe._dict()
	if event.open_for_registration == 1:
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
	events = frappe.get_all('PRULIA Event', fields=['name', 'event_name', 'description', 'start_date_time', 'end_date_time', 'venue', 'open_for_registration', 'position_restriction', 'event_image'], 
		filters=[('PRULIA Event', "start_date_time", ">=", now_datetime().date())],
		order_by='start_date_time desc')
	member = frappe.get_doc("PRULIA Member", member_name);

	event_result = []
	for event in events:
		if (event.position_restriction and event.position_restriction != member.position) :
			continue 

		registration = frappe.get_all('PRULIA Attendee', filters={'member': member_name, 'parent': event.name}, fields=['name', 'shirt_size', 'meal_option'])
		if registration:
			event.register = True
			event.attendee_name = registration[0].name
			event.shirt_size = registration[0].shirt_size
			event.meal_option = registration[0].meal_option
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
		attendee_rec.save()
		return "success"

