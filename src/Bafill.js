/**
 * @module Bafill
 * @desc
 * @author Created by kimhou on 16/10/8
 */
import commander from 'commander'
import logger from './util/logger'

export default class Bafill {
	constructor() {
		logger.debug('opened debug logger');
		logger.debug(process.argv);
	}

	build() {
		switch (commander.type) {
			case 'node':
				new require('./NodeTransfer');
				break;
			case 'react-node':
				require('./ReactNodeTransfer');
				break;
			case 'browser':
				new require('./BrowserTransfer');
				break;
			default:
				logger.error('type error:', commander.type);
		}
	}
}