# Copyright (c) 2016, Alpha Harald Management and contributors
# For license information, please see license.txt


from __future__ import unicode_literals
import frappe

def boot_session(bootinfo):

	exist = frappe.db.sql("""select name from `tabPRULIA Member` where user_id = %s && user_status='Active'""", (frappe.session.user,))
	if exist:
		member = frappe.db.sql("""select * from `tabPRULIA Member` where user_id = %s && user_status='Active'""", (frappe.session.user,), as_dict=1)[0]
		if member:
			bootinfo.prulia_member = member