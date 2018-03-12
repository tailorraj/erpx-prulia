from __future__ import unicode_literals
import frappe
from frappe.desk.page.setup_wizard.setup_wizard import add_all_roles_to

def execute():
	if not frappe.db.exists("Role", "PRULIA News Administrator"):
		r = frappe.get_doc(dict(doctype= "Role", role_name=role, desk_access=1))
		r.flags.ignore_mandatory = r.flags.ignore_permissions = True
		r.insert()

	add_all_roles_to("Administrator")
	frappe.db.commit()