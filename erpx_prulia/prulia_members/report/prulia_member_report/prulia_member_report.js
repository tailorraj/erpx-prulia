// Copyright (c) 2016, Alpha Herald Management and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["PRULIA Member Report"] = {
	"filters": [
		{
			"fieldname":"Prudential ID",
			"label": __("Member"),
			"fieldtype": "Link",
			"options": "PRULIA Member"
		},{
			"fieldname":"User Status",
			"label": __("User Status"),
			"fieldtype": "Select",
			"options": " \nActive\nTerminated\nRetired\nResigned\nDeceased\nPending Approval"
		},{
			"fieldname":"Position",
			"label": __("Position"),
			"fieldtype": "Link",
			"options": "PRULIA Position"
		},{
			"fieldname":"Branch",
			"label": __("Branch"),
			"fieldtype": "Link",
			"options": "PRULIA Branch"
		},{
			"fieldname":"Region",
			"label": __("Region"),
			"fieldtype": "Link",
			"options": "PRULIA Region"
		},{
			"fieldname":"Gender",
			"label": __("Gender"),
			"fieldtype": "Link",
			"options": "Gender"
		},{
			"fieldname":"Race",
			"label": __("Race"),
			"fieldtype": "Select",
			"options": " \nMalay\nChinese\nIndian\nOthers"
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
