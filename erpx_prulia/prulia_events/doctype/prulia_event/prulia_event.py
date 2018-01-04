# -*- coding: utf-8 -*-
# Copyright (c) 2018, Alpha Harald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PRULIAEvent(Document):
	pass


@frappe.whitelist()
def add_attendance(member, event, meal, shirt):
	event = frappe.get_doc("PRULIA Event", event)
	event.flags.ignore_permissions = True
	event.append("attendee", {
		"member": member,
		"event": event.name,
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
	
