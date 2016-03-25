'use strict';

/**
* @function
* @description
* Error formatter, adapted from AngularJS 1.5
*/
function formatError(arg) {
	if (arg instanceof Error) {
		if (arg.stack) {
			arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
				? 'Error: ' + arg.message + '\n' + arg.stack
				: arg.stack;
		} else if (arg.sourceURL) {
			arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
		}
	}
	return arg;
}

/**
* @function
* @description
* Console log wrapper, adapted from AngularJS 1.5
*/
function consoleLog(type) {
	/*eslint no-empty:0 */
	var logger = window.console || {},
		logFn = logger[type] || logger.log || function() {},
		hasApply = false;

	// Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
	// The reason behind this is that console.log has type "object" in IE8...
	try {
		hasApply = !!logFn.apply;
	} catch (e) {}

	if (hasApply) {
		return function() {
			var args = Array.prototype.slice.call(arguments);
			args.map(formatError);
			return logFn.apply(logger, args);
		};
	}

	// we are IE which either doesn't have window.console => this is noop and we do nothing,
	// or we are IE where console.log doesn't have apply so we log at least first 2 args
	return function(arg1, arg2) {
		logFn(arg1, arg2 == null ? '' : arg2);
	};
}


/**
* @function
* @description
* Logger service
*/
export const logger = {
	log: consoleLog('log'),
	info: consoleLog('info'),
	warn: consoleLog('warn'),
	error: consoleLog('error'),
	debug: consoleLog('debug')
};