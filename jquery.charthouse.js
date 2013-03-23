(function($) {

var D3_URL = 'http://d3js.org/d3.v3.min.js';

$.extract_spec = function(obj, prefix) {
	if ($.isPlainObject(obj)) {
		var spec = [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				spec = spec.concat($.extract_spec(
					obj[key],
					(prefix ? (prefix + '.' + key) : key)
				));
			}
		}
		return spec;
	} else if ($.isArray(obj)) {
		if (obj.length > 0) {
			return $.extract_spec(obj[0], prefix + '[]');
		} else {
			return [{
				'name': prefix + '[]',
				'type': 'array',
			}];
		}
	} else {
		return [{
			'name': prefix,
			'type': ($.isNumeric(obj) ? 'number' : 'string'),
		}];
	}
};

$.fn.charthouse = function(options) {
	var opts = $.extend({
		x_title: 'title x',
		y_title: 'title y',
		data_groups: [
			{
				url: '/',
				x_field: 'x',
				y_field: 'y',
			},
		],
	}, options);
	console.log(opts);

	// Load D3.js if not loaded, yet.
	window.d3 || $('<script/>').attr('src', D3_URL).appendTo('body');
};

})(jQuery);
