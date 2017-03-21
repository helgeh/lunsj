#! /usr/bin/env node

'use strict';

const program = require('commander');
const ncp = require('copy-paste');
const chalk = require('chalk');

const lunsj = require('./lunsj');

var selectedDay = 'today';

program
  .version('0.1.0')
  .option('-a, --allergi', 'Include allergenes')
  .option('-c, --clip', 'Copy results to clipboard')
  .option('-t, --title [title]', 'Set main title for output')
  .arguments('[day]')
  .action(function (day) {
  	if (day)
  		selectedDay = day;
  })
  .description('Specify [day] or leave empty to get menu for current day (today)')
  .parse(process.argv);

var options = {
	allergi: program.allergi ? 'allergi' : null,
	day: selectedDay,
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