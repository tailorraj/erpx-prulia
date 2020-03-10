frappe.ready(function() {
    var $msg = $('#msg\\.prulia'),
        $event = $('select[data-label="Event"]'),
        $event_name = $('input[data-fieldname="event_name"]'),
        $action = $('.btn-form-submit'),
        $scan = $action.eq(0),
        event_id = frappe.utils.get_query_params()['event'];

    $('head').append('<meta name="apple-mobile-web-app-capable" content="yes">');

    //check event
    if (event_id) {
        startScan(event_id);
    }
    else {
        $msg.text('Select an event below!');

        $event.on('change', function () {
            return frappe.call({
                method: 'frappe.client.get_value',
                freeze: true,
                args: {
                    doctype: 'PRULIA Event',
                    filters: {
                        name: $event.val()
                    },
                    fieldname: ['event_name']
                },
                callback: function (e) {
                    var data;

                    if (e.message) {
                        data = e.message;
                        $event_name.val(data.event_name);
                        event_id = $event.val();
                    }
                    else {
                        $event_name.val('');
                        event_id = undefined;
                    }
                    startScan(event_id);
                }
            });
        });
    }

    function startScan(event_id) {
        if (!event_id) {
            $scan.hide();
            return;
        }

        //check permission
        frappe.has_permission('PRULIA Event', event_id, 'write', function (perm) {

            $msg.empty();
            if (perm && perm.message && perm.message.has_permission) {
                //load scanning library when clicked
                $scan.show().text('Scan').off('click').one('click', function (e) {
                    Promise.all([
                        loadScript('https://webrtc.github.io/adapter/adapter-latest.js'),
                        loadScript('/lib/instascan.min.js'),
                        loadScript('/lib/toastr.min.js'),
                        loadStyle('/lib/toastr.css')
                    ]).then(function () {
                        var $video = $('#preview\\.prulia'),
                            scanner;

                        $action.hide();

                        //toast message options
                        toastr.options = {
                            "progressBar": true,
                            "preventDuplicates": true,
                            "newestOnTop": true,
                            "positionClass": "toast-bottom-right",
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": "1000",
                            "onclick": null,
                        };

                        //init scanner
                        Instascan.Camera.getCameras().then(function (cameras) {
                            var camera;

                            if (cameras.length >= 1) {
                                camera = getBackCamera(cameras);
                                $video.attr('playsinline','').show();

                                scanner = new Instascan.Scanner({
                                    video: $video[0],
                                    mirror: false,
                                    continuous: true,
                                    scanPeriod: 10
                                });

                                scanner.addListener('scan', function (content) {
                                    var split;

                                    if (content) {
                                        split = content.split('/');
                                        if (split.length === 3 && split[0] === event_id) {
                                            registerAttendance(content);
                                            // scanner.stop();
                                            // $video.hide();
                                            // $msg.show().html('<div><b>Agent ID: </b>' + split[1] +'</div>' +
                                            //     '<br/><button type="submit" class="btn btn-primary" ' +
                                            //     'onclick="registerAttendance(\'' + content + '\')">Register</button>');
                                            //
                                            // $action.text('Rescan').show().one('click', function () {
                                            //     $video.show();
                                            //     $action.hide();
                                            //     $msg.hide();
                                            //     scanner.start(camera);
                                            // });
                                        }
                                        else {
                                            toastr.error('Invalid QR code');
                                        }
                                    }
                                    else {
                                        toastr.error('Invalid QR code');
                                    }
                                });

                                scanner.start(camera);
                            }
                            else {
                                $msg.text('No camera found');
                            }
                        }).catch(function (reason) {
                            $msg.text('No camera found');
                        });
                    });
                });
            }
            else {
                $msg.text('You are not allowed to scan');
            }
        });
    }
});

$('.btn-form-submit').hide();

function registerAttendance(content) {
    var split = content.split('/'),
        event_id = split[0],
        agent_id = split[1];

    frappe.call({
        method: 'frappe.client.get',
        freeze: true,
        args: {
            doctype: 'PRULIA Event',
            name: event_id
        },
        callback: function (e) {
            var attendee;

            if (e && e.message) {
                //get current attendee
                (e.message.attendee || []).forEach(function (el) {
                    if (el.member === agent_id) {
                        attendee = el;
                    }
                });

                if (attendee) {
                    if (attendee.attendance === 'Yes') { //if attendee has registered
                        toastr.warning('Agent ' + attendee.member_name + ' has already registered attendance', 'Attendance registered');
                    }
                    else { //registering attendee
                        frappe.call({
                            method:"frappe.client.get_list",
                            args: {
                                doctype:"PRULIA Member",
                                fields: ['name'],
                                filters: {
                                    user_id: frappe.session.user
                                },
                            },
                            callback: function(r) {
                                var docs = r.message,
                                    scanner;

                                if (docs && docs.length) {
                                    scanner = docs[0].name;

                                    //save in scanning history
                                    return frappe.call({
                                        method: 'frappe.client.insert',
                                        freeze: true,
                                        args: {
                                            doc: {
                                                doctype: 'PRULIA Event Scans',
                                                event: event_id,
                                                attendee: agent_id,
                                                scanner: scanner
                                            }
                                        },
                                        callback: function (e) {
                                            if (e.message) {
                                                //set attendance in event
                                                return frappe.call({
                                                    method: 'frappe.client.set_value',
                                                    freeze: true,
                                                    args: {
                                                        doctype: 'PRULIA Attendee',
                                                        name: attendee.name,
                                                        fieldname: {
                                                            attendance: 'Yes',
                                                        }
                                                    },
                                                    callback: function (e) {
                                                        if (e.message) {
                                                            toastr.success(
                                                                'Agent ' + attendee.member_name + ' has registered attendance',
                                                                'Registration success'
                                                            );
                                                        }
                                                        else {
                                                            toastr.error('Please try again', 'Registration failed');
                                                        }
                                                    }
                                                });
                                            }
                                            else {
                                                toastr.error('Please try again', 'Registration failed');
                                            }
                                        }
                                    });
                                }
                                else { toastr.error('Access denied', 'You are not allowed to scan'); }
                            }
                        })


                    }
                }
                else { //Agent not found in attendee list
                    toastr.error('Agent ' + agent_id + ' not found or not yet registered', 'Registration failed');
                }
            }
            else { //event not found
                toastr.error('Event not found', 'Registration failed');
            }
        }
    })
}

function getBackCamera(cameras) {
    var camera;

    cameras.forEach(function (el) {
        if (el && (el.name.indexOf('back') > -1 || el.name.indexOf('Back') > -1)) { camera = el; }
    })
    if (!camera) { camera = cameras[0]; }


    return camera;
}

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

function loadStyle(url){
    var style = document.createElement("link");

    style.type = "text/css";

    return new Promise(function (resolve) {
        if (style.readyState){  //IE
            style.onreadystatechange = function(){
                if (style.readyState == "loaded" || style.readyState == "complete"){
                    style.onreadystatechange = null;
                    resolve();
                }
            };
        } else {  //Others
            style.onload = resolve;
        }

        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', url);
        document.getElementsByTagName("head")[0].appendChild(style);
    });
}
