# Copyright (c) 2016, Alpha Harald Management and contributors
# For license information, please see license.txt


from __future__ import unicode_literals
import frappe

def boot_session(bootinfo):

	member = frappe.db.sql_list("""select * from `tabPRULIA Member` where
			user_id=%s and user_status='Active' """, (frappe.session.user))

	if member:
		bootinfo.prulia_member = member
	else:
		bootinfo.prulia_member = frappe.session.user