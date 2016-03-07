'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

/**
 * @method
 * @description
 * Minify and copy images. Usually it's best to remember to optimize images by hand first, both in Photoshop (or similar) to do lossful compression, and after that through a lossless compressor such as [ImageOptim](https://imageoptim.com/).
 */
gulp.task('img', function() {
	return gulp.src(plugins.flatten(config.paths.client.imgFiles), {
		base: config.paths.client.src
	})
		.pipe(isProduction ? plugins.imagemin({
			optimizationLevel: 5,
			progressive: true
		}) : plugins.util.noop())
		.pipe(gulp.dest(config.paths.client.dist))
		.pipe(plugins.if(plugins.browserSync.active, plugins.browserSync.stream()));
});