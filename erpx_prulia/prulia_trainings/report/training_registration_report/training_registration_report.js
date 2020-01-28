// Copyright (c) 2016, Alpha Herald Management and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Training Registration Report"] = {
	"filters": [
		{
			"fieldname":"Training",
			"label": __("Training"),
			"fieldtype": "Link",
			"options": "PRULIA Training"
		},{
			"fieldname":"Member",
			"label": __("Member"),
			"fieldtype": "Link",
			"options": "PRULIA Member"
		},{
            "fieldname":"Prudential ID",
            "label": __("Prudential ID"),
            "fieldtype": "Data"
        },{
            "fieldname":"Agency Code",
            "label": __("Agency Code"),
            "fieldtype": "Data"
        },{
            "fieldname":"Member Name",
            "label": __("Member Name"),
            "fieldtype": "Data"
        },{
            "fieldname":"Registration Date",
            "label": __("Registration Date"),
            "fieldtype": "Date"
        },{
            "fieldname":"Price",
            "label": __("Price"),
            "fieldtype": "Currency"
        },{
            "fieldname":"Fees Paid",
            "label": __("Fees Paid"),
            "fieldtype": "Currency"
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