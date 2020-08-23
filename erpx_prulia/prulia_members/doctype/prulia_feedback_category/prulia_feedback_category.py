# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PRULIAFeedbackCategory(Document):
	pass

@frappe.whitelist()
def get_categories():
	cats = frappe.get_all('PRULIA Feedback Category', fields=['name', 'category'])

	return cats