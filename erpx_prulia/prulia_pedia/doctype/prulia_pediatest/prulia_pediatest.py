# -*- coding: utf-8 -*-
# Copyright (c) 2021, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PRULIAPediaTest(Document):
	pass


@frappe.whitelist()
def get_pedia_meta():
    meta = frappe.get_meta('PRULIA PediaTest')
    return meta


@frappe.whitelist()
def get_pedia_posts():
    #doc = frappe.get_all('PRULIA PediaTest', filters={'published': true}, fields=['name', 'description'])
    doc = frappe.db.get_values("PRULIA PediaTest",{'published': 1}, "*", as_dict=True)

    return doc


@frappe.whitelist()
def create_new_post(data):
    dat = json.loads(data)
    doc = frappe.new_doc("PRULIA PediaTest")
    doc.flags.ignore_permissions = True
    doc.flags.ignore_mandatory = True
    doc.title = dat.get('title')
    doc.published = dat.get('published')
    #doc.published_date = frappe.datetime.now_datetime()
    doc.prudential_id = dat.get('prudential_id')
    doc.full_name = dat.get('full_name')
    doc.email = dat.get('email')
    doc.am_um_assist = dat.get('am_um_assist')
    doc.am_um_name = dat.get('am_um_name')
    doc.apm_assist = dat.get('apm_assist')
    doc.apm_name = dat.get('apm_name')
    doc.pamb_assist = dat.get('pamb_assist')
    doc.pamb_name = dat.get('pamb_name')
    doc.qa_name = dat.get('qa_name')
    doc.agency_code = dat.get('agency_code')
    doc.region = dat.get('region')
    doc.category = dat.get('category')
    doc.other_cat = dat.get('other_cat')
    doc.policy_no = dat.get('policy_no')
    doc.assured_name = dat.get('assured_name')
    doc.product_name = dat.get('product_name')
    doc.medical_plan = dat.get('medical_plan')
    doc.med_claim_other = dat.get('med_claim_other')
    doc.reason_of_declined = dat.get('reason_of_declined')
    doc.save()

    return doc