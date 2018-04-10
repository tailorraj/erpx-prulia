# -*- coding: utf-8 -*-
# Copyright (c) 2018, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PRULIABanner(Document):
	pass
	# def run_post_save_methods(self):
	# 	if(self.published == 1):
	# 		banners = []
	# 		banners = frappe.get_all('PRULIA Banner', fields=['name', 'published'], 
	# 					filters=[('PRULIA Banner', "published", "=", 1), ('PRULIA Banner', "name", "!=", self.name)],
	# 					order_by='name')
	# 		if banners != None:
	# 			for banner in banners:
	# 				banner_rec = frappe.get_doc("PRULIA Banner", banner.name);
	# 				banner_rec.published = 0;
	# 				banner_rec.save();

@frappe.whitelist()
def get_banner():
	banners = frappe.get_all('PRULIA Banner', fields=['name', 'banner_name','image','published', 'type', 'link', 'content'], 
						filters=[('PRULIA Banner', "published", "=", 1)],
						order_by='name')
	return banners
