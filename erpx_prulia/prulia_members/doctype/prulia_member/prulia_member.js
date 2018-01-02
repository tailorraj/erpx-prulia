// Copyright (c) 2017, Alpha Harald Management and contributors
// For license information, please see license.txt

frappe.ui.form.on('PRULIA Member', {
	refresh: function(frm) {
		frappe.dynamic_link = {doc: frm.doc, fieldname: 'name', doctype: 'Member'};
		frm.add_fetch("branch", "region", "region");

		//Only Member Admin can update user status and access admin section
		if(frappe.boot.user.roles.indexOf("PRULIA Member Administrator") > 0){
			cur_frm.set_df_property("user_status", "read_only", false);
		}

		// cur_frm.toggle_display("remarks", frappe.boot.user.roles.indexOf("PRULIA Member Administrator") > 0);
		// cur_frm.toggle_display("resigned_method", frappe.boot.user.roles.indexOf("PRULIA Member Administrator") > 0 && doc.resigned_year > 0);
	},
	branch: function(frm){
		
	}
});

cur_frm.fields_dict["branch"].get_query = function(doc, dt, dn) {
	return {
		filters: {
			"region": ["=", doc.region]
		}
	}
}
