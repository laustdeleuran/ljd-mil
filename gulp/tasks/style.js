'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

/**
 * @function
 * @description
 * Compile SASS stylesheets to CSS
 */
gulp.task('style', function() {
	return gulp.src(plugins.flatten(config.paths.client.styleFiles), {
		base: config.paths.client.src
	})
		.pipe(plugins.sass({
			outputStyle: isProduction ? 'compressed' : 'expanded',
			errLogToConsole: true
		}).on('error', plugins.sass.logError))
		.pipe(plugins.rename(function(path) {
			path.basename += '.' + config.pkg.version;
		}))
		.pipe(gulp.dest(config.paths.client.dist))
		.pipe(plugins.if(plugins.browserSync.active, plugins.browserSync.stream()));
});