# -*- coding: utf-8 -*-
# Copyright (c) 2018, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe, json, datetime
from frappe.model.document import Document
from frappe.utils import now_datetime
# from datetime import datetime, monthdelta

class PRULIANewsletter(Document):
	pass


@frappe.whitelist()
def get_newsletter_list(member_name):
	# return 'here'
	newsletters = frappe.get_all('PRULIA Newsletter', fields=['name', 'title', 'type', 'link', 'content', 'publish_date', 'news_image'], 
		filters=[('PRULIA Newsletter', "publish_date", "<=", now_datetime().date()), ('PRULIA Newsletter', "publish_date", ">=", frappe.utils.data.add_months(datetime.date.today(), -3)), ('PRULIA Newsletter', "publish_news", "=", 1)],
		order_by='publish_date desc')
	member = frappe.get_doc("PRULIA Member", member_name);
	return newsletters
	# event_result = []
	# for event in events:
	# 	if (event.position_restriction and event.position_restriction != member.position) :
	# 		continue 

	# 	registration = frappe.get_all('PRULIA Attendee', filters={'member': member_name, 'parent': event.name}, fields=['name', 'shirt_size', 'meal_option'])
	# 	if registration:
	# 		event.register = True
	# 		event.attendee_name = registration[0].name
	# 		event.shirt_size = registration[0].shirt_size
	# 		event.meal_option = registration[0].meal_option
	# 	else:
	# 		event.register = False
	# 	event_result.append(event)
	# # 	event.start_date_time = getdate(event.start_date_time)
	# # 	event.end_date_time = getdate(event.end_date_time)
	# # for event in events:

	# return event_result


