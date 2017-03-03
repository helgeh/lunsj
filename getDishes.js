'use strict';

const cheerio = require('cheerio');
const request = require('request');

const menyUrl = 'http://posthuset.eurest.no/dagens-meny/';

const weekdays = [
	"søndag",
	"mandag",
	"tirsdag",
	"onsdag",
	"torsdag",
	"fredag",
	"lørdag"
];

function getToday() {
	let d = new Date();
	let n = weekdays[d.getDay()];
	return n;
}

function parseDagensMeny(options) {
	options = options || {};
	if (weekdays.indexOf(options.day) < 0 || options.day === 'today') {
		options.day = getToday();
	}
	return new Promise(function(resolve, reject) {
		request(menyUrl, function(err, response, body) {
			if (err) reject(err);
			if (response.statusCode !== 200) {
				reject('Invalid status code: ' + response.statusCode);
			}

			let $ = cheerio.load(body);
			let selector = '#' + options.day + ' ul.dish-list';
			let dishes = {};

			$(selector).each(function(i, item) {
				let t = $(item);
				let type = t.find('h2').text();
				if (!dishes[type]) dishes[type] = [];
				dishes[type] = getDishes(t);
			});

			function getDishes(node) {
				let result = [];
				node.children('li').each(function () {
					let dishName = $('.dish-name', this).text();
					let price = $('.dish-price', this).text().replace(/\s\s+/g, ' ').trim();
					let allergenes = $('.dish-allergenes > li', this).map(function(ind, li) {
						return $(this).text();
					}).get();
					result.push({name: dishName, price: price, allergenes: allergenes});
				});
				return result;
			}

			resolve(dishes);

		});
	});
}

exports = module.exports = parseDagensMeny;