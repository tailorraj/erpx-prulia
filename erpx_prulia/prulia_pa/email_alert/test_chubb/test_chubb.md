<h3>{{_("CHUBB PA Insurance Application")}}</h3>

<h4>Applicant Details</h4>
<ul>
<li>Prudential ID 	   : {{ doc.member }}
<li>PRULIA Member Name     : {{ doc.main_full_name }}
</ul>

<h4>Click the link to download the PRULIA member registration form :</h4>
{% set attachments = frappe.get_all('File', filters={'attached_to_doctype': 'PRULIA PA', 'attached_to_name': doc.application_form}, fields=['file_name', 'file_url']) %} 
<ul>
{% for attachment in attachments %}
  <li><a href="{{ attachment.file_url }}">{{ attachment.file_name }}</a></li>
{% endfor %}
</ul>
