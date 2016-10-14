/**
 * @module index
 * @desc
 * @author Created by kimhou on 16/10/8
 */
import fs from 'fs'
import path from 'path'
import commander from 'commander'
import logger from './logger'
import babel from 'babel-core'

export function isFile(dir) {
	if (!dir) {
		return false;
	}
	return fs.statSync(dir).isFile();
}

export function isDirectory(dir) {
	if (!dir) {
		return false;
	}
	return fs.statSync(dir).isDirectory();
}

export function loadModule(mod) {
	if (!isFile(mod)) {
		logger.error('file not exit!' + mod);
		return;
	}
	let modPath, module;
	if (mod[0] == '/' || mod[1] == ':') {
		modPath = mod;
	} else {
		modPath = path.join(process.cwd(), mod);
	}
	logger.debug('start load module ', mod);
	if (!isFile(modPath)) {
		logger.error('config file not exit, check config: ', modPath);
		return;
	}
	try {
		let module = require(modPath);
		return module;
	} catch (e) {
		logger.error('module load error', modPath, e.message);
		return;
	}
}

export function transform(filename, code, opts) {
	opts = _.defaults(opts || {}, index.opts);
	opts.filename = filename;

	let result = babel.transform(code, opts);
	result.filename = filename;
	result.actual = code;
	return result;
}

export function compile(filename, opts) {
	try {
		let code = fs.readFileSync(filename, "utf8");
		return transform(filename, code, opts);
	} catch (err) {
		if (commander.watch) {
			logger.error(toErrorStack(err));
			return {ignored: true};
		} else {
			throw err;
		}
	}
}

function toErrorStack(err) {
	if (err._babel && err instanceof SyntaxError) {
		return `${err.name}: ${err.message}\n${err.codeFrame}`;
	} else {
		return err.stack;
	}
}

process.on("uncaughtException", function (err) {
	console.error(toErrorStack(err));
	process.exit(1);
});