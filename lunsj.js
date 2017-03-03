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
		var output = options.title || 'LUNSJ!!!';
		_.each(data, function(dishes, key) {
			output += '\n\n*' + key + '*';
			_.each(dishes, function(dish) {
				output += '\n' + dish.name + ': ' + dish.price;
				if (allergi && allergi === 'allergi') {
					output += '\nAllergener: ' + dish.allergenes.join(', ') + '\n';
				}
			});
		});
		return output;
	}, function (e) {
		console.log('error', e);
		return e;
	});
};