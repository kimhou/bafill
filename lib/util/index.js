'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isFile = isFile;
exports.isDirectory = isDirectory;
exports.loadModule = loadModule;
exports.transform = transform;
exports.compile = compile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _babelCore = require('babel-core');

var _babelCore2 = _interopRequireDefault(_babelCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFile(dir) {
	if (!dir) {
		return false;
	}
	return _fs2.default.statSync(dir).isFile();
} /**
   * @module index
   * @desc
   * @author Created by kimhou on 16/10/8
   */
function isDirectory(dir) {
	if (!dir) {
		return false;
	}
	return _fs2.default.statSync(dir).isDirectory();
}

function loadModule(mod) {
	if (!isFile(mod)) {
		_logger2.default.error('file not exit!' + mod);
		return;
	}
	let modPath, module;
	if (mod[0] == '/' || mod[1] == ':') {
		modPath = mod;
	} else {
		modPath = _path2.default.join(process.cwd(), mod);
	}
	_logger2.default.debug('start load module ', mod);
	if (!isFile(modPath)) {
		_logger2.default.error('config file not exit, check config: ', modPath);
		return;
	}
	try {
		let module = require(modPath);
		return module;
	} catch (e) {
		_logger2.default.error('module load error', modPath, e.message);
		return;
	}
}

function transform(filename, code, opts) {
	opts = _.defaults(opts || {}, index.opts);
	opts.filename = filename;

	let result = _babelCore2.default.transform(code, opts);
	result.filename = filename;
	result.actual = code;
	return result;
}

function compile(filename, opts) {
	try {
		let code = _fs2.default.readFileSync(filename, "utf8");
		return transform(filename, code, opts);
	} catch (err) {
		if (_commander2.default.watch) {
			_logger2.default.error(toErrorStack(err));
			return { ignored: true };
		} else {
			throw err;
		}
	}
}

function toErrorStack(err) {
	if (err._babel && err instanceof SyntaxError) {
		return `${ err.name }: ${ err.message }\n${ err.codeFrame }`;
	} else {
		return err.stack;
	}
}

process.on("uncaughtException", function (err) {
	console.error(toErrorStack(err));
	process.exit(1);
});