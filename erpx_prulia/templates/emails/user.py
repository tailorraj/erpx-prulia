"""replace standard frappe/frappe/blob/develop/frappe/core/doctype/user/user.py, add userid in args"""

def send_login_mail(self, subject, template, add_args, now=None):
		"""send mail with login details"""
		from frappe.utils.user import get_user_fullname
		from frappe.utils import get_url

		mail_titles = frappe.get_hooks().get("login_mail_title", [])
		title = frappe.db.get_default('company') or (mail_titles and mail_titles[0]) or ""

		full_name = get_user_fullname(frappe.session['user'])
		if full_name == "Guest":
			full_name = "Administrator"

		args = {
			'first_name': self.first_name or self.last_name or "user",
			'user': self.name,
			'userid': self.userid,
			'title': title,
			'login_url': get_url(),
			'user_fullname': full_name
		}

		args.update(add_args)

		sender = frappe.session.user not in STANDARD_USERS and get_formatted_email(frappe.session.user) or None

		frappe.sendmail(recipients=self.email, sender=sender, subject=subject,
			template=template, args=args, header=[subject, "green"],
			delayed=(not now) if now!=None else self.flags.delay_emails, retry=3)