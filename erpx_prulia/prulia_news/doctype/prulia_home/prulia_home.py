# -*- coding: utf-8 -*-
# Copyright (c) 2018, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PRULIAHome(Document):
	pass

@frappe.whitelist(allow_guest=True)
def get_home():
	home_entries = frappe.get_single("PRULIA Home")
	return home_entries
