function updateCards() {
    $('[data-toggle="tooltip"]').tooltip();
    handleClickInfo();
    handleClickAddCard();
    handleLevels();
}

function handleClickAddCard() {
    $('.card a[href="#addCard"]').unbind('click');
    $('.card a[href="#addCard"]').click(function(e) {
	e.preventDefault();
	var button = $(this);
	var card = button.closest('.card');
	var form = card.find('form');
	var loader = card.find('.addcard-loader');
	button.hide();
	loader.show();
	form.ajaxSubmit({
	    success: function(data) {
		loader.hide();
		button.show();
		card.replaceWith(data);
		updateCards();
	    },
	    error: genericAjaxError,
	});
	return false;
    });
}

function handleClickInfo() {
    $('.card [data-info-ajax]').unbind('click');
    $('.card [data-info-ajax]').click(function(e) {
	e.preventDefault();
	var button = $(this);
	var card = button.closest('.card');
	var loader = card.find('.info-loader');
	button.hide();
	loader.show();
	$.get(button.data('info-ajax'), function(data) {
	    loader.hide();
	    button.show();
	    $('[data-toggle="tooltip"]').tooltip('hide');
	    freeModal(card.data('card-title'), data);
	    updateCards();
	});
	return false;
    });
}

function changeStats(stats, level) {
    stats.find('[data-levels]').each(function() {
	var stat = $(this);
	var levels = stat.data('levels');
	if (typeof levels[level] != 'undefined') {
	    stat.find('.stat-value').text(levels[level]['value']);
	    stat.find('.progress-bar').css('width', levels[level]['percent'] + '%');
	}
    });
}

function handleLevels() {
    if ($('.changeLevel').length > 0) {
	$('.changeLevel').click(function(e) {
	    var button = $(this);
	    var stats = button.closest('.card-stats');
	    var level = button.find('.level').text();
	    if (level) {
		changeStats(stats, level);
	    }
	});
    }
    $('input[name="changeLevelNumber"]').bind("change paste keyup", function() {
	var level = $(this).val();
	var stats = $(this).closest('.card-stats');
	changeStats(stats, level);
    });
}
