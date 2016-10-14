#!/usr/bin/env node
'use strict';

require('babel-core');

var _logger = require('./util/logger');

var _logger2 = _interopRequireDefault(_logger);

var _index = require('./util/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let pathExists = require("path-exists");
/* eslint max-len: 0 */

let commander = require("commander");
let util = require("babel-core").util;
let uniq = require("lodash/uniq");
let each = require("lodash/each");
let glob = require("glob");
const options = require("babel-core").options;

_logger2.default.debug('start');
//

if (commander.extensions) {
	commander.extensions = util.arrayify(commander.extensions);
}

//

let errors = [];

let filenames = commander.args.reduce(function (globbed, input) {
	let files = glob.sync(input);
	if (!files.length) files = [input];
	return globbed.concat(files);
}, []);

filenames = uniq(filenames);

each(filenames, function (filename) {
	if (!pathExists.sync(filename)) {
		errors.push(filename + " doesn't exist");
	}
});

if (commander.outDir && !filenames.length) {
	errors.push("filenames required for --out-dir");
}

if (commander.outFile && commander.outDir) {
	errors.push("cannot have --out-file and --out-dir");
}

if (commander.watch) {
	if (!commander.outFile && !commander.outDir) {
		errors.push("--watch requires --out-file or --out-dir");
	}

	if (!filenames.length) {
		errors.push("--watch requires filenames");
	}
}

if (commander.skipInitialBuild && !commander.watch) {
	errors.push("--skip-initial-build requires --watch");
}

if (errors.length) {
	_logger2.default.error(errors.join(". "));
	process.exit(2);
}

//

let opts = exports.opts = {};

each(options, function (opt, key) {
	if (commander[key] !== undefined && commander[key] !== opt.default) {
		opts[key] = commander[key];
	}
});

opts.ignore = util.arrayify(opts.ignore, util.regexify);

if (opts.only) {
	opts.only = util.arrayify(opts.only, util.regexify);
}

if (commander.config) {
	let config = (0, _index.loadModule)(commander.config);
	if (config) {
		_logger2.default.debug('config loaded', JSON.stringify(config));
		each(config, (item, key) => {
			if (opts[key] === undefined) {
				opts[key] = config[key];
			}
		});
	} else {
		_logger2.default.error('config load failed!');
	}
}

let fn;

if (commander.outDir) {
	_logger2.default.debug('use dir');
	fn = require("./util/babel/dir");
} else {
	_logger2.default.debug('use file');
	fn = require("./util/babel/file");
}

_logger2.default.debug();

fn(commander, filenames, exports.opts);