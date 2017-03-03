#! /usr/bin/env node

'use strict';

const program = require('commander');
const ncp = require('copy-paste');

const lunsj = require('./lunsj');

program
  .version('0.0.1')
  .option('-a, --allergi', 'Include allergenes')
  .option('-c, --clip', 'Copy results to clipboard')
  .option('-d, --day [day]', 'Choose which day of the week to get [today]', 'today')
  .option('-t, --title [title]', 'Set main title for output', 'LUNSJ!!!')
  .parse(process.argv);

var options = {
	allergi: program.allergi ? 'allergi' : null,
	day: program.day,
	title: program.title
};

lunsj(options).then(function (result) {
	if (program.clip) {
		ncp.copy(result);
	}
	else console.log(result);
});