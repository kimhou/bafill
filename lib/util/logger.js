'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _debug = _commander2.default.debug; /**
                                         * @module logger
                                         * @desc
                                         * @author Created by kimhou on 16/10/8
                                         */

var quiet = _commander2.default.quiet;
var chalk = require('chalk');

exports.default = {
	success: function success() {
		!quiet && console.log(chalk.green(formatArgument(arguments).join(' ')));
	},
	error: function error() {
		!quiet && console.log(chalk.red(formatArgument(arguments).join(' ')));
	},
	info: function info() {
		!quiet && console.log(chalk.cyan(formatArgument(arguments).join(' ')));
	},
	debug: function debug() {
		!quiet && _debug && console.log(chalk.yellow(formatArgument(arguments).join(' ')));
	},
	warn: function warn() {
		!quiet && console.log(chalk.blue(formatArgument(arguments).join(' ')));
	},
	log: function log() {
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