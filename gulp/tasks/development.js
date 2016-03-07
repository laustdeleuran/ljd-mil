'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';

/**
 * @method
 * @description
 * Combine common tasks for development. When developing you can continuously build files using just: `gulp development`. Usually this is also set as the default task, so you can just run `gulp`.
 */
gulp.task('development', plugins.sequence(['style', 'js', 'img', 'html', 'copy'], 'server', 'watch'));