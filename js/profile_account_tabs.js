
function reloadOwnedCardsAfterModal() {
    if (is_authenticated) {
	$('#freeModal').on('hidden.bs.modal', function () {
	    if (ownedcards_to_reload.length > 0) {
		$.get('/ajax/ownedcards/?ids=' + ownedcards_to_reload.join(',') + '&page_size=' + ownedcards_to_reload.length, function(data) {
		    var html = $(data);
		    // Remove all that weren't returned
		    $.each(ownedcards_to_reload, function(_, id) {
			if (html.find('[data-ownedcard-id="' + id + '"]').length == 0) {
			    $('[data-ownedcard-id="' + id + '"]').after('<br><br><span class="text-muted">' + gettext('Deleted') + '</span><br><br>');
			    $('[data-ownedcard-id="' + id + '"]').remove();
			}
		    });
		    html.find('.ownedcard').each(function() {
			var newOwnedcardItem = $(this);
			var ownedcardItem = $('.profile-account #' + newOwnedcardItem.prop('id'));
			if (ownedcardItem.length > 0) {
			    // Replace existing
			    ownedcardItem.html(newOwnedcardItem.html());
			} else {
			    // Add at the end
			    var account_id = newOwnedcardItem.data('ownedcard-account-id');
			    var newElement = $('<div class="col-sm-3"></div>');
			    newElement.html(newOwnedcardItem);
			    $('#account' + account_id + 'Cards .row').last().append(newElement);
			}
		    });
		    ownedcards_to_reload = [];
		    updateOwnedCards();
		});
	    }
	})
    }
}

function loadAbout(pane, account) {
    pane.html('<i class="flaticon-loading"></i>');
    $.get('/ajax/account_about/' + account.data('account-id') + '/', function(data) {
	pane.html(data);
	loadToolTips();
	ajaxModals();
    });
}

function loadCards(pane, account) {
    pane.html('<i class="flaticon-loading"></i>');
    var account_id = account.data('account-id');
    $.get('/ajax/ownedcards/?account=' + account_id + '&ajax_modal_only&back_to_profile&reverse_order=on', function(data) {
	if (data.trim() == '') {
	    pane.html('<div class="padding20"><div class="alert alert-warning">' + gettext('No result.') + '</div></div>');
	} else {
	    pane.html(data);
	    updateOwnedCards();
	}
    });
}

function onTabChanged(target_name, pane) {
    if (pane.text() == '') {
	var account = pane.closest('.profile-account');
	if (target_name.match(/Cards$/)) {
	    loadCards(pane, account);
	} else if (target_name.match(/About$/)) {
	    loadAbout(pane, account);
	}
    }
}

// function levelUpButtons() {
//     $('.form-level-up').submit(function(e) {
// 	e.preventDefault();
// 	var form = $(this);
// 	form.ajaxSubmit({
// 	    success: function(data) {
// 		var account = form.closest('.profile-account');
// 		account.find('.level .level-value').text(data['level']);
// 		account.find('.ranking-global .value').text(data['leaderboard']);
// 	    },
// 	    error: genericAjaxError,
// 	});
// 	return false;
//     });
// }

$(document).ready(function() {
    $('.profile-account .tab-pane.active').each(function() {
	onTabChanged($(this).prop('id'), $(this));
    });
    $('.profile-account .nav-tabs > li a').on('show.bs.tab', function(e) {
	var target_name = $(e.target).attr('href');
	var pane = $(target_name);
	onTabChanged(target_name, pane);
    });
    reloadOwnedCardsAfterModal();
    //levelUpButtons();
});
