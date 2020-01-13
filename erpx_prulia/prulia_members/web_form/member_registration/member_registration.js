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
					return true;
				}
				else { return 'Invalid value for NRIC number' }
            },
			cell_number: function (val) {
				if (/60\d{9,}/.test(val)) {
					return true;
				}
				else { return 'Invalid value for Mobile number' }
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
				$input.closest('.form-group').addClass('has-error');
			}
		}
    });

	loadScript('https://unpkg.com/imask').then(function () {
		var $nric_input = $('input[name="nric_number"]'),
			$cell_number = $('input[name="cell_number"]');

		IMask($nric_input[0], {
			mask: '000000-00-0000'
		});

		IMask($cell_number[0], {
			mask: '{6\\0}00 000 00000'
		});
	});
});

function loadScript(url){
    var script = document.createElement("script")
    script.type = "text/javascript";

    return new Promise(function (resolve) {
        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    resolve();
                }
            };
        } else {  //Others
            script.onload = resolve;
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    });
}