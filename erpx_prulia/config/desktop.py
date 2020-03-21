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
			"label": _("PRULIA Events")
		},{
			"module_name": "PRULIA Event",
			"color": "orange",
			"icon": "octicon octicon-bookmark",
			"_doctype": "PRULIA Event",
			"type": "list",
			"link": "List/PRULIA Event",
			"label": _("PRULIA Event")
		},{
			"module_name": "PRULIA Events",
			"color": "orange",
			"icon": "fa fa-qrcode",
			"type": "page",
			"link": "/event-registration",
			"label": _("PRULIA Event Scan")
		},{
			"module_name": "PRULIA Trainings",
			"color": "tomato",
			"icon": "octicon octicon-calendar",
			"type": "module",
			"label": _("PRULIA Trainings"),
			"hidden": 1
		},{
			"module_name": "PRULIA Training",
			"color": "tomato",
			"icon": "octicon octicon-bookmark",
			"_doctype": "PRULIA Training",
			"type": "list",
			"link": "List/PRULIA Training",
			"label": _("PRULIA Training")
		},{
			"module_name": "PRULIA News",
			"color": "red",
			"icon": "octicon octicon-rss",
			"type": "module",
			"label": _("PRULIA News")
		},
					
	]
