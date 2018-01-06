# Copyright (c) 2013, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt

def execute(filters=None):
	if not filters: filters = {}

	columns = get_columns()
	data = get_members(filters)

	return columns, data

def get_columns():
	return [
		_("NRIC Number") + ":Data:120", _("Member Name") + ":Data:200", _("Prudential ID")+ ":Link/PRULIA Member:100",
		_("QL Code") + ":Data:120", _("Branch") + "::Link/PRULIA Branch:120", _("Region") + "::Link/PRULIA Region:120",
		_("Handphone No") + ":Data:120", _("Office No") + ":Data:120", _("Fax No") + ":Data:120", _("Assiatant Name") + ":Data:120",
		_("Email") + ":Data:220", _("Gender") + ":Data:120", _("Race") + ":Data:80", _("Position") + ":Data:80", _("Promotion Year") + ":Data:120",
		_("User status") + ":Data:80", _("Mailing Address") + ":Data:400", _("Membership Fee") + ":Data:80", _("Resign Year") + ":Data:80",
		_("Resign Method") + ":Data:120", _("Rejoined") + ":Data:120", _("PWP Change Branch") + ":Data:120", _("2017 Deduction") + ":Data:120", _("Remarks") + ":Data:120",
		_("Meal Option") + ":Data:120", _("Shirt Size") + ":Data:120"
	]

def get_members(filters):
	conditions = get_conditions(filters)
	return frappe.db.sql("""select nric_number,full_name, prudential_id, ql_code, branch, region, cell_number, office_number, fax_number, assistant_name, email, gender, race,
			position, promo_year, user_status, mailing_address, membership_fee, resign_year, resign_method, rejoined, pwp_change_branch, 2017_deduction, remarks, meal_option, shirt_size
			from `tabPRULIA Member`
			where name is not null %s""" % conditions, as_list=1)

def get_conditions(filters):
	conditions = ""
	if filters.get("Prudential ID"):
		conditions += "and prudential_id = '%s'" % filters["Prudential ID"]

	if filters.get("Branch"):
		conditions += "and branch = '%s'" % filters["Branch"]

	if filters.get("Region"):
		conditions += "and region = '%s'" % filters["Region"]

	if filters.get("Gender"):
		conditions += "and gender = '%s'" % filters["Gender"]

	if filters.get("Race"):
		conditions += "and race = '%s'" % filters["Race"]

	if filters.get("Position"):
		conditions += "and position = '%s'" % filters["Position"]

	if filters.get("User Status"):
		conditions += "and user_status = '%s'" % filters["User Status"]

	if filters.get("Meal Option"):
		conditions += "and meal_option = '%s'" % filters["Meal Option"]

	if filters.get("Shirt Size"):
		conditions += "and shirt_size = '%s'" % filters["Shirt Size"]
	return conditions

