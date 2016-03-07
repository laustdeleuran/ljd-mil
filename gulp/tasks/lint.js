'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

/**
 * @function
 * @description
 * Lint JS files and output errors
 */
gulp.task('lint', function() {
	return gulp.src(plugins.flatten(config.paths.client.jsLintFiles))
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError())
		.on('error', plugins.notify.onError({
			title: '<%= error.name %>',
			message: '<%= error.message %>'
		}));
});