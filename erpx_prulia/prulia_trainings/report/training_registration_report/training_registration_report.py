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
		_("Training ID") + ":Link/PRULIA Training:120",
		_("Training Name") + ":Data:200",
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
	return frappe.db.sql("""select trainee.parent as "TrainingID", training.training_name as "TrainingName", member.prudential_id as "PrudentialID",
	        trainee.reg_datetime as "RegistrationDate", member.full_name as "MemberName", trainee.agency_no as "AgencyCode",
	        training.fees as "Price", trainee.fees as "PaidFees", trainee.meal_option as "MealOption", trainee.shirt_size as "ShirtSize"
			from
			`tabPRULIA Trainee` trainee
			left join `tabPRULIA Training` training on trainee.parent = training.name
			left join `tabPRULIA Member` member on trainee.member = member.name
			where trainee.parent is not null %s""" % conditions, as_list=1)

def get_conditions(filters):
	conditions = ""
	if filters.get("Training"):
		conditions += "and trainee.parent = '%s'" % filters["Training"]

	if filters.get("Member"):
		conditions += "and trainee.member = '%s'" % filters["Member"]

	if filters.get("Member Name"):
		conditions += "and member.full_name LIKE '%{}%'".format(filters["Member Name"])

	if filters.get("Prudential ID"):
		conditions += "and member.prudential_id LIKE '%{}%'".format(filters["Prudential ID"])

	if filters.get("Agency Code"):
		conditions += "and trainee.agency_no LIKE '%{}%'".format(filters["Agency Code"])

	if filters.get("Price"):
		conditions += "and training.fees = '{}'".format(filters["Price"])

	if filters.get("Fees Paid"):
		conditions += "and trainee.fees = '{}'".format(filters["Fees Paid"])

	if filters.get("Registration Date"):
		conditions += "and trainee.reg_datetime LIKE '%{}%'".format(filters["Registration Date"])

	if filters.get("Meal Option"):
		conditions += "and trainee.meal_option = '%s'" % filters["Meal Option"]

	if filters.get("Shirt Size"):
		conditions += "and trainee.shirt_size = '%s'" % filters["Shirt Size"]

	return conditions
