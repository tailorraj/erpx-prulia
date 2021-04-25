import frappe
import json
import requests


def push_noti(content, image, filters=[]):
    url = "https://onesignal.com/api/v1/notifications"
    one_signal_api_key = frappe.local.conf.get('one_signal_api_key')
    one_signal_app_id = frappe.local.conf.get('one_signal_app_id')

    if len(filters) > 0:
        payload = {
            "app_id": one_signal_app_id,
            "filters": filters,
            "contents": {"en": content},
            "big_picture": image,
            "ios_attachments": {"image": image},
            "ios_badgeType": "Increase",
            "ios_badgeCount": 1
        }
    else:
        payload = {
            "app_id": one_signal_app_id,
            "included_segments": ["All"],
            "contents": {"en": content},
            "big_picture": image,
            "ios_attachments": {"image": image},
            "ios_badgeType": "Increase",
            "ios_badgeCount": 1
        }

    headers = {
        'content-type': "application/json",
        'authorization': "Basic {}".format(one_signal_api_key),
        'cache-control': "no-cache"
    }

    requests.request("POST", url, data=json.dumps(payload), headers=headers)
