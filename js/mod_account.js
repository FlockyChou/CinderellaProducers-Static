$(document).ready(function() {
    cuteformclear();
    cuteform($('#id_accept_friend_requests'), {
	'html': {
	    '1': '<img src="' + empty_image + '" class="empty-image">',
	    '2': '<i class="flaticon-checked"></i> ' + gettext('Yes'),
	    '3': '<i class="flaticon-delete"></i> ' + gettext('No'),
	},
    });
    if (typeof starters != 'undefined') {
	cuteform($('#id_starter_id'), {
	    'images': starters,
	});
    }
    if (typeof centers != 'undefined') {
	cuteform($('#id_center'), {
	    'images': centers,
	    'modal': 'true',
	});
    }
    if (typeof oss != 'undefined') {
	cuteform($('#id_i_os'), {
	    'html': oss,
	});
    }
    if (typeof play_withs != 'undefined') {
	cuteform($('#id_i_play_with'), {
	    'html': play_withs,
	});
    }
});
