'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

/**
 * @method
 * @description
 * Copy static files.
 */
gulp.task('copy', function() {
	return gulp.src(plugins.flatten(config.paths.client.staticFiles), {
		base: config.paths.client.src
	})
		.pipe(gulp.dest(config.paths.client.dist))
		.pipe(plugins.if(plugins.browserSync.active, plugins.browserSync.stream()));
});