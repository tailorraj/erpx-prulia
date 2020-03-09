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
	}
};