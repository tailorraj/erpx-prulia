// Copyright (c) 2016, Alpha Herald Management and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Event Registration Report"] = {
	"filters": [
		{
			"fieldname":"Event",
			"label": __("Event"),
			"fieldtype": "Link",
			"options": "PRULIA Event"
		},{
			"fieldname":"Member",
			"label": __("Member"),
			"fieldtype": "Link",
			"options": "PRULIA Member"
		},{
			"fieldname":"Meal Option",
			"label": __("Meal Option"),
			"fieldtype": "Select",
			"options": " \nNon-Vegetarian\nVegetarian"
		},{
			"fieldname":"Shirt Size",
			"label": __("Shirt Size"),
			"fieldtype": "Select",
			"options": " \nXS\nS\nM\nL\nXL\nXXL\nXXXL"
		}
	]
}
