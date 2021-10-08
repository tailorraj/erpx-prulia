import frappe

@frappe.whitelist()
def check_cors(test_data):
    return test_data