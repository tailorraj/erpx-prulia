from __future__ import print_function, unicode_literals

import frappe
from frappe import _
from frappe.desk.page.setup_wizard.setup_wizard import add_all_roles_to

def after_install():
	add_prulia_roles()
	add_registration_complete_page()
	add_password_change_success_page()
	

def add_prulia_roles():
	roles = ["PRULIA Member", "PRULIA Member Administrator", "PRULIA Event Administrator"]

	for role in roles:
		if not frappe.db.exists("Role", role):
			r = frappe.get_doc(dict(doctype= "Role", role_name=role, desk_access=1))
			r.flags.ignore_mandatory = r.flags.ignore_permissions = True
			r.insert()

	add_all_roles_to("Administrator")
	frappe.db.commit()

def add_registration_complete_page():
	if not frappe.db.exists("Web Page","registration-complete"):
		webpage = frappe.get_doc(dict(doctype= "Web Page", title="Registration Complete", insert_code=1, javascript="if(typeof Cordova !== undefined){Window.close()}",
			show_title=1,main_section="Your Registration is complete, you may close this window", route="registration-complete",published=1))
		webpage.flags.ignore_mandatory = webpage.flags.ignore_permissions = True
		webpage.insert()

def add_password_change_success_page():
	if not frappe.db.exists("Web Page","password_changed"):
		webpage = frappe.get_doc(dict(doctype= "Web Page", title="Password Changed", insert_code=1,
			show_title=1,main_section="Your password have successfully changed, you may proceed to login thru PRULIA App", route="password_changed",published=1))
		webpage.flags.ignore_mandatory = webpage.flags.ignore_permissions = True
		webpage.insert()