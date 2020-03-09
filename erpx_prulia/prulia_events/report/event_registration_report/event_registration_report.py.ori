# Copyright (c) 2013, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt

def execute(filters=None):
	if not filters: filters = {}

	columns = get_columns()
	data = get_registrations(filters)

	return columns, data

def get_columns():
	return [
		_("Event ID") + ":Link/PRULIA Event:120", _("Event Name") + ":Data:200", _("Prudential ID")+ ":Link/PRULIA Member:100",
		_("Member Name") + ":Data:120", _("Meal Option") + ":Data:120",
		_("Shirt Size") + ":Data:120"
	]

def get_registrations(filters):
	conditions = get_conditions(filters)
	return frappe.db.sql("""select attendee.parent as "EventID", event.event_name as "EventName", member.prudential_id as "PrudentialID",
			member.full_name as "MemberName", attendee.meal_option as "MealOption", attendee.shirt_size as "ShirtSize"
			from
			`tabPRULIA Attendee` attendee
			left join `tabPRULIA Event` event on attendee.parent = event.name
			left join `tabPRULIA Member` member on attendee.member = member.name
			where attendee.parent is not null %s""" % conditions, as_list=1)

def get_conditions(filters):
	conditions = ""
	if filters.get("Event"):
		conditions += "and attendee.parent = '%s'" % filters["Event"]

	if filters.get("Member"):
		conditions += "and attendee.member = '%s'" % filters["Member"]

	if filters.get("Meal Option"):
		conditions += "and attendee.meal_option = '%s'" % filters["Meal Option"]

	if filters.get("Shirt Size"):
		conditions += "and attendee.shirt_size = '%s'" % filters["Shirt Size"]
	return conditions
