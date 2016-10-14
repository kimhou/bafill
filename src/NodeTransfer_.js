/**
 * @module BabelNode
 * @desc
 * @author Created by kimhou on 16/10/8
 */
import logger from './util/logger'
import {loadModule} from './util'
import commander from 'commander'
import {createNodeTransferPresets} from './util/presetsCreator'
let options    = require("babel-core").options;
let util       = require("babel-core").util;


export default class BabelNode {
	constructor() {
		logger.debug('start init NodeTransfer');
		this.initConfig();
		logger.debug('config inited', JSON.stringify(this.config));
		this.createBabelOptions();
		logger.debug('option inited', JSON.stringify(this.options));
		
		
	}

	initConfig() {
		const {args, out, watch, presets, plugins, target, config} = commander;
		if (config) {
			this.config = loadModule(config);
			if (!this.config) {
				throw new Error('load config error:', config);
			}
		}
		this.config = this.config || {};
		let src = args && args.length && args[0];
		if (src) {
			this.config.src = src;
		}
		this.config = {
			...this.config,
			out, watch, presets, plugins, target
		}
	}

	createBabelOptions() {
		let config = createNodeTransferPresets(this.config);
		this.options = {
			...this.config,
			...config
		}
	}
}