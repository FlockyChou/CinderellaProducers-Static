$(document).ready(function() {
    multiCuteForms({
	'user_type': cuteformType,
	'center_type': cuteformType,
    });
    cuteform($('#id_favorite_character'), {
	'images': favorite_characters,
	'modal': 'true',
	'modal-text': 'true',
    });
    cuteform($('#id_starter_id'), {
	'images': starters,
    });
});
