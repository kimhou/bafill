/**
 * @module logger
 * @desc
 * @author Created by kimhou on 16/10/8
 */
import commander from 'commander'

var debug = commander.debug;
var quiet = commander.quiet;
var chalk = require('chalk');

export default {
	success: function () {
		!quiet && console.log(chalk.green(formatArgument(arguments).join(' ')))
	},
	error: function () {
		!quiet && console.log(chalk.red(formatArgument(arguments).join(' ')))
	},
	info: function () {
		!quiet && console.log(chalk.cyan(formatArgument(arguments).join(' ')))
	},
	debug: function () {
		!quiet && debug && console.log(chalk.yellow(formatArgument(arguments).join(' ')))
	},
	warn: function () {
		!quiet && console.log(chalk.blue(formatArgument(arguments).join(' ')))
	},
	log: function () {
		!quiet && console.log(formatArgument(arguments).join(' '));
	}
};

function formatArgument(args) {
	var rst = [];
	for (var key in args) {
		rst.push(args[key]);
	}
	return rst;
}