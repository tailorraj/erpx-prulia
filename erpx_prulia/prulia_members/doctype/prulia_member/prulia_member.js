// Copyright (c) 2017, Alpha Harald Management and contributors
// For license information, please see license.txt

frappe.ui.form.on('PRULIA Member', {
	refresh: function(frm) {
		console.log(frm);
		frappe.dynamic_link = {doc: frm.doc, fieldname: 'name', doctype: 'Member'};
		frm.add_fetch("branch", "region", "region");

		// $(cur_frm.fields_dict.prudential_id_display.wrapper).html('<div class="frappe-control input-max-width" data-fieldtype="Data" data-fieldname="registration_status"><div class="form-group"><div class="clearfix">'+
		// '<label class="control-label" style="padding-right: 0px;">Prudential ID</label></div><div class="control-input-wrapper"><div class="control-input" style="display: none;">'+
		// '</div><div class="control-value like-disabled-input bold" style="">'+frm.doc.prudential_id+'</div><p class="help-box small text-muted hidden-xs"></p></div></div></div>')

		if(frappe.boot.user.roles.indexOf("PRULIA Member Administrator") < 0){
			frm.toggle_enable('user_status', false);
		}

		// cur_frm.toggle_display("remarks", frappe.boot.user.roles.indexOf("PRULIA Member Administrator") > 0);
		// cur_frm.toggle_display("resigned_method", frappe.boot.user.roles.indexOf("PRULIA Member Administrator") > 0 && doc.resigned_year > 0);
	}
});

cur_frm.fields_dict["branch"].get_query = function(doc, dt, dn) {
	return {
		filters: {
			"region": ["=", doc.region]
		}
	}
}