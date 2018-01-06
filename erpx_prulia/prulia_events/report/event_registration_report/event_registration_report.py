# Copyright (c) 2013, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt

def execute(filters=None):
	if not filters: filters = {}

	columns = get_columns()
	data = get_employees(filters)

	return columns, data

def get_columns():
	return [
		_("Event ID") + ":Link/PRULIA Event:120", _("Event Name") + ":Data:200", _("Prudential ID")+ ":Link/PRULIA Member:100",
		_("Member Name") + ":Data:120", _("Meal Option") + ":Data:120",
		_("Shirt Size") + ":Data:120"
	]

def get_employees(filters):
	conditions = get_conditions(filters)


	return frappe.db.sql("""select event.name
			from
			`tabPRULIA Event` event
			where
			""", as_list=1)

	# return frappe.db.sql("""select event.name as "Event ID", event.event_name as "Event Name", member.prudential_id as "Prudential ID",
	# 		member.full_name as "Member Name", event.shirt_size as "Shirt Size", event.meal_option as "Meal Option"
	# 		from
	# 		`tabPRULIA Event` event,`tabPRULIA Member` member
	# 		where
	# 		event.member = member.name %s""" ,conditions, as_list=1)

def get_conditions(filters):
	conditions = ""
	# if filters.get("month"):
	# 	month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
	# 		"Dec"].index(filters["month"]) + 1
	# 	conditions += " and month(date_of_birth) = '%s'" % month

	# if filters.get("company"): conditions += " and company = '%s'" % \
	# 	filters["company"].replace("'", "\\'")

	return conditions
