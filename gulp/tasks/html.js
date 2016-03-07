'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

/**
 * @method
 * @description
 * Copy HTML files and update references to application version and production variable (mostly used for debugging purposes).
 */
gulp.task('html', function() {
	return gulp.src(plugins.flatten(config.paths.client.htmlFiles), {
		base: config.paths.client.src
	})
		.pipe(plugins.replace('%%APPVERSION%%', config.pkg.version))
		.pipe(plugins.replace('%%ISPRODUCTION%%', global.isProduction))
		.pipe(gulp.dest(config.paths.client.dist))
		.pipe(plugins.if(plugins.browserSync.active, plugins.browserSync.stream()));
});