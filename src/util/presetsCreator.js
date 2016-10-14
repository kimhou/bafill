/**
 * @module presetsCreator
 * @desc
 * @author Created by kimhou on 16/10/9
 */
import logger from '../util/logger'
import {loadModule} from '../util'

const defaultNodeTransferPreset = {
	presets: [
		'react',
		[
			"env",
			{
				"targets": {
					"node": 6.3
				}
			}
		]
	],
	plugins: ['transform-object-rest-spread']
}

export function createNodeTransferPresets(opts) {
	let presets = combinePlugins(defaultNodeTransferPreset.presets, opts.presets),
		plugins = combinePlugins(defaultNodeTransferPreset.plugins, opts.plugins);
	return {presets, plugins};
}

function combinePlugins(first = [], sec = []) {
	let added = {}, rst = [];
	sec.forEach((item)=> {
		let pn = getPluginName(item);
		rst.push(item);
		added[pn] = true;
	});
	first.forEach(item=> {
		let pn = getPluginName(item);
		!added[pn] && rst.push(item);
	});
}

function isSamePlugin(p1, p2) {
	if (p1 === p2) {
		return true;
	}
	return getPluginName(p1) === getPluginName(p2);
}

function getPluginName(plugin = '') {
	let rst = plugin;
	if (plugin instanceof Array && plugin.length) {
		rst = plugin[0];
	}
	rst = rst.split(/\/|\\/ig);
	rst = rst && rst.length && rst[rst.length - 1];
	rst = rst && rst.replace(/(babel-preset|babel-plugin)/ig, '');
	return rst;
}