$(document).ready(function() {
    if (typeof eventcountdown != 'undefined') {
	$('#countdown').countdown({
	    date: eventcountdown,
	    render: render,
	});
    }
});
