'use strict';

import gulp from 'gulp';
import config from '../config';

/**
 * @function
 * @description
 * Watch for files changes and build accordingly
 */
gulp.task('watch', ['browserSync'], function() {
	gulp.watch(config.paths.client.jsLintFiles, ['lint']);
	gulp.watch(config.paths.client.styleFiles, ['style']);
	gulp.watch(config.paths.client.imgFiles, ['img']);
	gulp.watch(config.paths.client.svgSpriteFiles, ['svg-sprite']);
	gulp.watch(config.paths.client.htmlFiles, ['html']);
	gulp.watch(config.paths.client.staticFiles, ['copy']);
});