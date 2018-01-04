// Copyright (c) 2018, Alpha Harald Management and contributors
// For license information, please see license.txt

frappe.ui.form.on('PRULIA Event', {
	refresh: function(frm) {
		var me = this;
		var tempFrm = frm;
		if(!frm.doc.__islocal) {
			// custom buttons
			frappe.call({
				    method:"erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.check_registration",
				    args: {
						"member": frappe.boot.prulia_member.name,
						"event": frm.doc.name
					},
				    callback: function(r) { 
				        if(r.message.register === true){
				        	frm.add_custom_button(__('Register Attendance'), function(){
								frappe.call({
								    method:"frappe.client.get_value",
								    args: {
								        doctype:"PRULIA Member",
								        filters: {
								            name:frappe.boot.prulia_member.name
								        },
								        fieldname:["meal_option", "shirt_size"]
								    }, 
								    callback: function(r) { 
								        
										frappe.prompt(
											[{fieldname:"meal", label:"Meal Options", fieldtype:"Select", options:["Non-Vegetarian","Vegetarian"], reqd: 1, default: r.message.meal_option},
											{fieldname:"shirt", label:"Shirt Size", fieldtype:"Select", options:["XS","S","M","L","XL","XXL","XXXL"], reqd: 1, default: r.message.shirt_size}
											], function(data){
												frappe.call({
													method: "erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.add_attendance",
													args: {
														"member": frappe.boot.prulia_member.name,
														"event": frm.doc.name,
														"meal": data.meal,
														"shirt": data.shirt
													},
													callback: function(r){
														tempFrm.reload_doc()
													}
												})
										},__('Register Attendance'))
								    }
								})
							})
				        } else if (r.message.cancel === true){
				        	frm.add_custom_button(__('Cancel Attendance'), function(){
				        		frappe.confirm(
									__('Do you confirm cancel your attendance?'),
								    function(){
								        frappe.call({
											method: "erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.del_attendance",
											args: {
												"member": frappe.boot.prulia_member.name,
												"event": frm.doc.name
											},
											callback: function(r){
												tempFrm.reload_doc()
											}
										})
								    }
								)
				        	})
				        }
						
				    }
				})
		

			// frm.add_custom_button(__('Accounts Receivable'), function() {
			// 	frappe.set_route('query-report', 'Accounts Receivable', {member:frm.doc.name});
			// });
		} 
	}


});
