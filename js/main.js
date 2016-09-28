
function cuteformType(value, _) {
    return static_url + 'img/color/' + value + '.png';
}

function loadToolTips() {
    $('[data-toggle="tooltip"]').tooltip();
}

function loadPopovers() {
    $('[data-toggle="popover"]').popover();
}

// Called by profile.js + ownedcards.js
function updateOwnedCards() {
    $('.ownedcard').each(function() {
	$(this).popover({
	    'container': 'body',
	    'trigger': 'click',
	    'title': $(this).data('card-title'),
	    'content': $(this).find('.hidden').html(),
	    'html': true,
	    'placement': 'bottom',
	});
    });
    $('.ownedcard').on('shown.bs.popover', function() {
	ajaxModals();
	$('.popover a').click(function(e) {
	    hidePopovers();
	    $('.ownedcard').popover('hide');
	});
    });
}

$(document).ready(function() {
    $('#freeModal').on('show.bs.modal', function() {
	$('main [data-toggle="tooltip"]').tooltip('hide');
	$('main [data-toggle="popover"]').popover('hide');
	$('main .ownedcard').popover('hide');
    });
    $('#freeModal').on('hide.bs.modal', function() {
	$('#freeModal .ownedcard').popover('hide');
    });
    // Dismiss owned cards popover on click anywhere else
    $('body').on('click', function (e) {
	if (!$(e.target).hasClass('ownedcard')
	    && !(e.target).closest('.ownedcard')
	    && $(e.target).parents('.popover.in').length === 0
	   ) {
	    $('.ownedcard').popover('hide');
	}
    });
});
