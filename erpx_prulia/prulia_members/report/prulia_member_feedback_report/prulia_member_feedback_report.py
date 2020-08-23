# Copyright (c) 2013, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

def execute(filters=None):
	if not filters: filters = {}

	columns, data = get_columns(), get_data(filters)

	return columns, data

def get_columns():
	return [
		_('Category') + ':Data:120'
	]

def get_data(filters):
	return []