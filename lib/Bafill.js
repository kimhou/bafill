'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _logger = require('./util/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module Bafill
 * @desc
 * @author Created by kimhou on 16/10/8
 */
class Bafill {
	constructor() {
		_logger2.default.debug('opened debug logger');
		_logger2.default.debug(process.argv);
	}

	build() {
		switch (_commander2.default.type) {
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
				_logger2.default.error('type error:', _commander2.default.type);
		}
	}
}
exports.default = Bafill;