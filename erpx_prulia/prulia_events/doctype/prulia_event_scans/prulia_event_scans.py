# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _, throw, get_doc, get_roles, get_all
from frappe.utils import now_datetime
from frappe.model.document import Document
import json

class PRULIAEventScans(Document):
	def validate(self):
		roles = get_roles(frappe.session.user)
		if 'PRULIA Event Administrator' in roles:
			event = get_doc('PRULIA Event', self.event)
			if event:

				if self.scanner:
					scanner = get_doc('PRULIA Member', self.scanner)
					if scanner:
						pass
					else:
						throw(_('Scanner not found'))
				else:
					throw(_('Scanner not found'))

				attendee = get_doc('PRULIA Member', self.attendee)
				if attendee:
					docs = get_all('PRULIA Event Scans', filters={ 'event': event, 'attendee': self.attendee }, fields=['name'], as_list=True)
					if len(docs) > 0:
						throw(_('Attendee has registered'))
					else:
						pass
				else:
					throw(_('Attendee not found'))
			else:
				throw(_('Event not found'))
		else:
			throw(_('Access denied'))

	def run_post_save_methods(self):
		self.scanned_time = now_datetime()
		event = get_doc('PRULIA Event', self.event)
		self.event_name = event.event_name
		if self.scanner:
			scanner = get_doc('PRULIA Member', self.scanner)
			self.scanner_name = scanner.full_name
		attendee = get_doc('PRULIA Member', self.attendee)
		self.attendee_name = attendee.full_name
		self.db_update()