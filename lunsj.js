'use strict';

const _ = require('lodash');
const getDishes = require('./getDishes');

/**
 * @param options {day: 'day of week', allergi: 'allergi', title: 'Title'}
 */
exports = module.exports = function (options) {
	options = options || {};
	var allergi = options.allergi || false;
	return getDishes(options).then(function (data) {
		var output = options.title || `LUNSJ ${data.day.toLocaleUpperCase()}!`;
		output = `*${output}*`;
		_.each(data.dishes, function(dishes, key) {
			output += `\r\n\r\n*${key}*`;
			_.each(dishes, function(dish) {
				output += '\r\n' + getVal('', dish.name, ': ') + dish.price;
				if (allergi && allergi === 'allergi') {
					output += '\r\nAllergener: ' + dish.allergenes.join(', ') + '\r\n';
				}
			});
		});
		return output;
	}, function (e) {
		console.log('error', e);
		return e;
	});
};

function getVal(pre, str, post) {
	return str ? pre + str + post : '';
}