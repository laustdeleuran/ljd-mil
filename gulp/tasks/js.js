'use strict';

/**
 * @overview
 * Parses and compiles JS into one single file using Babel, Browserify and Uglify. 
 */

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

/**
 * @function
 * @description
 * Handle any errors thrown in processing, to minimize impact on Gulp streams. 
 *
 * @param {object} error
 */
function errorHandler(error) {
	if (!global.isProduction) {

		var args = Array.prototype.slice.call(arguments);

		// Send error to notification center with gulp-notify
		plugins.notify.onError({
			title: 'JS Compile Error',
			message: error && error.stack
		}).apply(this, args);

		// Keep gulp from hanging on this task
		this.emit('end');

	} else {
		// Log the error and stop the process to prevent broken code from building
		console.log(error);
		process.exit(1);
	}
}

/**
 * @function
 * @description
 * Compile and minify JS files using Browserify. In production everything is minified to a single bundle. Otherwise (in development) the JS is output with source maps.
 *
 * @param {bool} watch - Keep watching files and rebuild
 */
function buildScript(watch) {

	// Create bundler
	var bundler = plugins.browserify({
		cache: {},
		debug: !global.isProduction,
		entries: plugins.flatten(config.paths.client.jsMain),
		fullpaths: true,
		insertGlobals: true,
		packageCache: {},
		transform: [
			plugins.babelify,
			plugins.stringify({
				extensions: ['.html'],
				minify: global.isProduction
			})
		]
	});

	// Rebundle function
	function rebundle(sync) {
		let stream = bundler.bundle();

		plugins.util.log('Rebundling js...');

		return stream
			.on('error', errorHandler)
			// Transform streams to play nice with NPM
			.pipe(plugins.vinylSourceStream(config.paths.client.jsMainFileName))
			.pipe(plugins.vinylBuffer())
			// Prep file
			.pipe(global.isProduction ? plugins.uglify() : plugins.util.noop())
			.pipe(plugins.rename(function(path) {
				path.basename += '.' + config.pkg.version;
			}))
			.pipe(gulp.dest(config.paths.client.dist + '/script'))
			.pipe(sync ? plugins.if(plugins.browserSync.active, plugins.browserSync.stream()) : plugins.util.noop());
	}

	if (watch) {
		bundler = plugins.watchify(bundler);
		bundler.on('update', rebundle);
		bundler.on('log', plugins.util.log);
	}

	return rebundle();
}

// Set up task
gulp.task('js', ['lint'], function() {
	return buildScript(!global.isProduction);
});