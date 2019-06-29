frappe.ready(function() {
	var validation = {
			prudential_id: function (val) {
				if (String(val).length !== 7) {
					return 'Invalid value for Agent ID';
				}
				else { return true; }
            },
			nric_number: function (val) {
				if (/\d{6}-\d{2}-\d{4}/.test(val)) {
					return 'Invalid value for NRIC number'
				}
				else { return true; }
            },
			cell_number: function (val) {
				if (/60\d{9,}/.test(val)) {
					return 'Invalid value for Mobile number'
				}
				else { return true; }
            }
		};

	$('body').focusout(function (evt) {
		var $input = $(evt.target),
			field = $input.attr('name'),
			valid;

		if (validation[field]) {
			valid = validation[field]($input.val(), $input);
			if (valid !== true) {
				frappe.msgprint(valid);
				$input.val('');
				$input.closest('.form-group').addClass('has-error');
			}
		}
    });
})