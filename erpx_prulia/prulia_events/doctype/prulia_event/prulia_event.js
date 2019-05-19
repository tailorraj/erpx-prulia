// Copyright (c) 2018, Alpha Harald Management and contributors
// For license information, please see license.txt

frappe.ui.form.on('PRULIA Event', {
	refresh: function(frm) {
		var me = this;
		var tempFrm = frm;
		if(!frm.doc.__islocal && typeof(frappe.boot.prulia_member) !== undefined) {
			// custom buttons
			// frappe.call({
			// 	    method:"erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.check_registration",
			// 	    args: {
			// 			"member": frappe.boot.prulia_member.name,
			// 			"event": frm.doc.name
			// 		},
			// 	    callback: function(r) { 
			// 	        if(r.message.register === true){
			// 	        	frm.add_custom_button(__('Register Attendance'), function(){
			// 					frappe.call({
			// 					    method:"frappe.client.get_value",
			// 					    args: {
			// 					        doctype:"PRULIA Member",
			// 					        filters: {
			// 					            name:frappe.boot.prulia_member.name
			// 					        },
			// 					        fieldname:["meal_option", "shirt_size"]
			// 					    }, 
			// 					    callback: function(r) { 
								        
			// 							frappe.prompt(
			// 								[{fieldname:"meal", label:"Meal Options", fieldtype:"Select", options:["Non-Vegetarian","Vegetarian"], reqd: 1, default: r.message.meal_option},
			// 								{fieldname:"shirt", label:"Shirt Size", fieldtype:"Select", options:["XS","S","M","L","XL","XXL","XXXL"], reqd: 1, default: r.message.shirt_size}
			// 								], function(data){
			// 									frappe.call({
			// 										method: "erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.add_attendance",
			// 										args: {
			// 											"member": frappe.boot.prulia_member.name,
			// 											"member_name": frappe.boot.prulia_member.full_name,
			// 											"event": frm.doc.name,
			// 											"meal": data.meal,
			// 											"shirt": data.shirt
			// 										},
			// 										callback: function(r){
			// 											tempFrm.reload_doc()
			// 										}
			// 									})
			// 							},__('Register Attendance'))
			// 					    }
			// 					})
			// 				})
			// 	        } else if (r.message.cancel === true){
			// 	        	frm.add_custom_button(__('Cancel Attendance'), function(){
			// 	        		frappe.confirm(
			// 						__('Do you confirm cancel your attendance?'),
			// 					    function(){
			// 					        frappe.call({
			// 								method: "erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.del_attendance",
			// 								args: {
			// 									"member": frappe.boot.prulia_member.name,
			// 									"event": frm.doc.name
			// 								},
			// 								callback: function(r){
			// 									tempFrm.reload_doc()
			// 								}
			// 							})
			// 					    }
			// 					)
			// 	        	})
			// 	        }
			// 	        if(r.message.cancel == true){
			// 	        	$(cur_frm.fields_dict.registration_status.wrapper).html(cur_frm.cscript.get_input_field("Attendance Status", "Attendance registered"));
			// 	        } else {
			// 	        	$(cur_frm.fields_dict.registration_status.wrapper).html(cur_frm.cscript.get_input_field("Attendance Status", "No Attendance register"));
			// 	        }
						
			// 	    }
			// 	})
			
			

			// frm.add_custom_button(__('Accounts Receivable'), function() {
			// 	frappe.set_route('query-report', 'Accounts Receivable', {member:frm.doc.name});
			// });
		} 
	},
	


});

cur_frm.add_fetch('member','full_name','member_name');
cur_frm.add_fetch('member','nric_number','nric_number');
cur_frm.add_fetch('member','email','email');
cur_frm.add_fetch('member','region','region');
cur_frm.add_fetch('member','branch','branch');
cur_frm.add_fetch('member','shirt_size','shirt_size');
cur_frm.add_fetch('member','meal_option','meal_option');
cur_frm.add_fetch('member','agency_no','agency_no');

cur_frm.cscript.get_input_field = function(label, text){
		return '<div class="frappe-control input-max-width" data-fieldtype="Data" data-fieldname="registration_status"><div class="form-group"><div class="clearfix">'+
		'<label class="control-label" style="padding-right: 0px;">'+label+'</label></div><div class="control-input-wrapper"><div class="control-input" style="display: none;">'+
		'</div><div class="control-value like-disabled-input bold" style="">'+text+'</div><p class="help-box small text-muted hidden-xs"></p></div></div></div>'
	}
