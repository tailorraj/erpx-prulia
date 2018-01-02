# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "PRULIA Members",
			"color": "red",
			"icon": "octicon octicon-organization",
			"type": "module",
			"label": _("PRULIA Members"),
			"hidden": 1
		},{
			"module_name": "PRULIA Member",
			"color": "red",
			"icon": "octicon octicon-person",
			"_doctype": "PRULIA Member",
			"type": "list",
			"link": "List/PRULIA Member",
			"label": _("PRULIA Member")
		},{
			"module_name": "PRULIA Events",
			"color": "orange",
			"icon": "octicon octicon-calendar",
			"type": "module",
			"label": _("PRULIA Events"),
			"hidden": 1
		},{
			"module_name": "PRULIA Event",
			"color": "orange",
			"icon": "octicon octicon-bookmark",
			"_doctype": "PRULIA Event",
			"type": "list",
			"link": "List/PRULIA Event",
			"label": _("PRULIA Event")
		}
					
	]
