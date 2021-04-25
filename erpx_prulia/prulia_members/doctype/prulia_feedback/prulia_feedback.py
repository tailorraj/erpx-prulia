# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import now_datetime

class PRULIAFeedback(Document):
	pass

@frappe.whitelist()
def submit_feedback(category, remark, member, member_name):
	doc = frappe.get_doc({
		'doctype': 'PRULIA Feedback',
		'category': category,
		'remark': remark,
		'member': member,
		'member_name': member_name,
		'submission_date': now_datetime()
	})
	doc.insert()

	return doc