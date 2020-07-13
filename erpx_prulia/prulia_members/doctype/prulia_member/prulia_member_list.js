// Copyright (c) 2017, Alpha Harald Management and contributors
// For license information, please see license.txt

// render
frappe.listview_settings['PRULIA Member'] = {
	get_indicator: function(doc) {
		if(doc.user_status === "Resigned"){
			return [__("Inactive"), "red", "user_status,=,Resigned"]
		} else if(doc.user_status === "Terminated"){
			return [__("Inactive"), "red", "user_status,=,Terminated"]
		} else if(doc.user_status === "Retired"){
			return [__("Inactive"), "blue", "user_status,=,Retired"]
		} else if(doc.user_status === "Deceased"){
			return [__("Inactive"), "red", "user_status,=,Deceased"]
		} else if(doc.user_status === "Active"){
			return [__("Active"), "green", "user_status,=,Active"]
		} else if(doc.user_status === "Pending Approval"){
			return [__("Pending"), "orange", "user_status,=,Pending Approval"]
		} else {
			return ["", "", "user_status,=,"+doc.user_status]
		}
	},
	onload: function(listview) {
		console.log(listview)
		//handle addition of email groups
		listview.page.add_inner_button(__('Send Email'), function () {
		    var dialog,
                $email_group,
                $emails,
                emails = getChecked();

		    if (emails && emails.length) {
		        dialog = new frappe.ui.Dialog({
                    fields: [
                        {'fieldname': 'email_group', 'fieldtype': 'Data', reqd: 1},
                        {'fieldname': 'emails', 'fieldtype': 'Long Text', reqd: 1}
                    ],
                    primary_action: function () {
                        var email_group = dialog.get_value('email_group');

                        if (emails.length && email_group) {
                            createEmailGroup(email_group).then(function (ret) {
                                var tasks = [];

                                emails.forEach(function (email) {
                                    tasks.push(addEmailGroup(ret.name, email));
                                });

                                return Promise.all(tasks).then(function () {
                                    // frappe.show_alert('Selected members added to Email Group ' + email_group);
                                    dialog.hide();
                                    frappe.new_doc('Newsletter').then(function () {
                                        var row = cur_frm.add_child('email_group');

                                        row.email_group = ret.name;
                                        row.total_subscribers = emails.length;

                                        refresh_field('email_group');
                                    });
                                });
                            });
                        }
                    }
                });
		        $email_group = dialog.fields_dict.email_group.$wrapper;
                $email_group.find('label').html('Email Group');

		        $emails = dialog.fields_dict.emails.$wrapper;
		        $emails.find('label').html('Emails');
		        $emails.find('textarea').attr('disabled', true);
		        console.log(emails);
		        dialog.set_value('emails', emails.join(', '));

                dialog.show();
            }
            else { frappe.show_alert('No members selected'); }

            function getChecked() {
		        var emails = [];

		        // if (listview.$checks) {
		        // 	listview.$checks.each(function (){
				// 		var $item = $(this),
				// 			name = $item.data('name');
				//
				// 		Object.keys(listview.data).forEach(function (key) {
				// 			if (listview.data[key].name == name) { emails.push(listview.data[key].owner); }
				// 		});
				// 	});
				// }

				listview.get_checked_items().forEach(function (user) {
					emails.push(user.owner);
				});

		        return emails;
            }

            function createEmailGroup(title) {
		        return new Promise(function (resolve) {
                    frappe.call({
                        method: 'frappe.client.insert',
                        args: {
                            doc: {
                                doctype: 'Email Group',
                                title: title
                            }
                        },
                        callback: function (data) {
                            resolve(data && data.message);
                        }
                    })
                });
            }

            function addEmailGroup(email_group, email) {
		        return new Promise(function (resolve) {
                    frappe.call({
                        method: 'frappe.client.insert',
                        args: {
                            doc: {
                                doctype: 'Email Group Member',
                                email_group: email_group,
                                email: email
                            }
                        },
                        callback: function (data) {
                            resolve(data && data.message);
                        }
                    })
                });
            }
        });
	}
};