function loadCountdown() {
    $('#countdown').countdown({
	date: eventcountdown,
	render: render,
    });
}

$(document).ready(function() {
    if (typeof eventcountdown != 'undefined') {
	if (typeof $('#countdown').countdown == 'undefined') {
	    $.getScript($('script[src$="jquery.countdown.min.js"]').attr('src'), loadCountdown);
	} else {
	    loadCountdown();
	}
    }
});
