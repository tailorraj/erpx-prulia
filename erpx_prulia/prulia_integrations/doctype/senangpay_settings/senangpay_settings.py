# -*- coding: utf-8 -*-
# Copyright (c) 2020, Alpha Herald Management and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class SenangpaySettings(Document):
	pass

def create_sha256_signature(key, message):
    import hmac
    import hashlib
    message = message.encode()
    return hmac.new(str(key), str(message), hashlib.sha256).hexdigest()

def get_payment_link(detail, amount, order_id, name, email, phone):
    senangpay_settings = frappe.get_doc("Senangpay Settings")
    if not senangpay_settings.enable:
        frappe.throw("Please enable Senangpay Settings")
    secret_key = senangpay_settings.secret_key

    hash_string = str(secret_key)+str(detail)+str(amount)+str(order_id)
    hashed_value = create_sha256_signature(secret_key, hash_string)

    parameters = {
        "detail": detail,
        "amount": amount,
        "order_id": order_id,
        "hash": hashed_value,
        "name": name,
        "email": email,
        "phone": phone
    }
    import urllib
    
    link = str(senangpay_settings.base_url)+"?"+urllib.urlencode(parameters)
    return link