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
			"label": _("PRULIA Training List")
		},{
			"module_name": "PRULIA News",
			"color": "red",
			"icon": "octicon octicon-rss",
			"type": "module",
			"label": _("PRULIA News")
		},{
            "module_name": "PRULIA Book",
            "color": "red",
             "icon": "octicon octicon-book",
            "_doctype": "PRULIA Book",
            "type": "list",
            "link": "List/PRULIA Book",
            "label": _("PRULIA Book")
        },{
            "module_name": "PRULIA PA",
            "color": "red",
            "icon": "octicon octicon-checklist",
            "type": "module",
            "label": _("PRULIA PA"),
        },{
            "module_name": "PRULIA PA",
            "color": "red",
            "icon": "octicon octicon-checklist",
            "_doctype": "PRULIA PA",
            "type": "list",
            "link": "List/PRULIA PA",
            "label": _("PRULIA PA")
        },{
            "module_name": "PRULIA Pedia",
            "color": "red",
            "icon": "octicon octicon-comment-discussion",
            "type": "module",
            "label": _("PRULIA Pedia"),
        },{
	        "module_name": "PRULIA Pedia",
	        "color": "red",
            "icon": "octicon octicon-comment-discussion",
	        "_doctype": "PRULIA Pedia",
	        "type": "list",
	        "link": "List/PRULIA Pedia",
	        "label": _("PRULIA Pedia")
        },{
	        "module_name": "PRULIA Telco",
	        "color": "red",
	        "icon": "octicon octicon-device-mobile",
	        "type": "module",
	        "label": _("PRULIA Telco"),
	    },
	]
