# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import throw, get_doc, get_roles
from frappe.utils import now_datetime
from frappe.model.document import Document
import json

class PRULIAEventScans(Document):
	def validate(self):
		roles = get_roles(frappe.session.user)
		if 'PRULIA Event Administrator' in roles:
			event = get_doc('PRULIA Event', self.event)-
			if event:
				scanner = get_doc('PRULIA Member', self.scanner)
				if scanner:
					attendee = get_doc('PRULIA Member', self.attendee)
					if attendee:
						registered = False
						for at in event.attendee:
							if at.member == attendee:
								registered = True
								break

						if registered:
							throw(_('Attendee has registered'))
					else:
						throw(_('Attendee not found'))
				else:
					throw(_('Scanner not found'))
			else:
				throw(_('Event not found'))
		else:
			throw(_('Access denied'))

	def run_post_save_methods(self):
		self.scanned_time = now_datetime()
		event = get_doc('PRULIA Event', self.event)
		self.event_name = event.event_name
		scanner = get_doc('PRULIA Member', self.scanner)
		self.scanner_name = scanner.full_name
		attendee = get_doc('PRULIA Member', self.attendee)
		self.attendee_name = attendee.full_name
		self.db_update()