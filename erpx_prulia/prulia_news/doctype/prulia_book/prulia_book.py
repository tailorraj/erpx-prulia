# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class PRULIABook(Document):
    pass


@frappe.whitelist(allow_guest=True)
def get_books_list():
    books = frappe.get_all('PRULIA Book',
                           fields=['name', 'title', 'link', 'content', 'book_image'],
                           filters=[('PRULIA Book', "publish_book", "=", 1)])
    return books
