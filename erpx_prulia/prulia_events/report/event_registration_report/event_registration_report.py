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
		_("Event ID") + ":Link/PRULIA Event:120",
		_("Event Name") + ":Data:200",
		_("Prudential ID") + ":Link/PRULIA Member:100",
		_("Registration Date") + ":Datetime:120",
        _("Member Name") + ":Data:120",
		_("Agency Code") + ":Data:80",
		_("Price") + ":Currency:100",
		_("Paid Fees") + ":Currency:100",
		_("Meal Option") + ":Data:120",
		_("Shirt Size") + ":Data:120"
	]

def get_registrations(filters):
	conditions = get_conditions(filters)
	return frappe.db.sql("""select attendee.parent as "EventID", event.event_name as "EventName", member.prudential_id as "PrudentialID",
	        attendee.reg_datetime as "RegistrationDate", member.full_name as "MemberName", attendee.agency_no as "AgencyCode",
	        event.fees as "Price", attendee.fees as "PaidFees", attendee.meal_option as "MealOption", attendee.shirt_size as "ShirtSize"
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

	if filters.get("Member Name"):
		conditions += "and member.full_name LIKE '%{}%'".format(filters["Member Name"])

	if filters.get("Prudential ID"):
		conditions += "and member.prudential_id LIKE '%{}%'".format(filters["Prudential ID"])

	if filters.get("Agency Code"):
		conditions += "and attendee.agency_no LIKE '%{}%'".format(filters["Agency Code"])

	if filters.get("Price"):
		conditions += "and event.fees = '{}'".format(filters["Price"])

	if filters.get("Fees Paid"):
		conditions += "and attendee.fees = '{}'".format(filters["Fees Paid"])

	if filters.get("Registration Date"):
		conditions += "and attendee.reg_datetime LIKE '%{}%'".format(filters["Registration Date"])

	if filters.get("Meal Option"):
		conditions += "and attendee.meal_option = '%s'" % filters["Meal Option"]

	if filters.get("Shirt Size"):
		conditions += "and attendee.shirt_size = '%s'" % filters["Shirt Size"]

	return conditions
