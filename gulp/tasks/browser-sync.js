'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

/**
 * @method
 * @description
 * Basic BrowserSync configuration. Let's us depend on this task in other tasks. 
 */
gulp.task('browserSync', function() {
	plugins.browserSync.init({
		baseDir: config.paths.client.dist,
		port: config.browserPort,
		ui: {
			port: config.UIPort
		},
		proxy: 'http://' + config.serverUrl + ':' + config.serverPort
	});
});