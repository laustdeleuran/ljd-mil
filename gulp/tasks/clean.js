'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

/**
 * @method
 * @description
 * Cleans the destination build folder. Useful for making sure you production build works on it's own. 
 */
gulp.task('clean', function(cb) {
	return plugins.del([config.paths.client.dist], cb);
});