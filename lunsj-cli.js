#! /usr/bin/env node

'use strict';

const program = require('commander');
const ncp = require('copy-paste');
const chalk = require('chalk');

const lunsj = require('./lunsj');

program
  .version('0.0.2')
  .option('-a, --allergi', 'Include allergenes')
  .option('-c, --clip', 'Copy results to clipboard')
  .option('-d, --day [day]', 'Choose which day of the week to get [today]', 'today')
  .option('-t, --title [title]', 'Set main title for output')
  .parse(process.argv);

var options = {
	allergi: program.allergi ? 'allergi' : null,
	day: program.day,
	title: program.title
};

lunsj(options).then(function (result) {
	if (program.clip) {
		ncp.copy(result);
		console.log('\n' + chalk.cyan('Menu copied to clipboard!'));
	}
	else console.log(
		chalk.blue('\n--------\n\n') +
		chalk.cyan(result) + '\n\n' +
		chalk.blue('--------\n')
	);
});