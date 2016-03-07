'use strict';

import gulp from 'gulp';

// In NPM it is setup with: gulp clean && gulp build --production
gulp.task('build', ['style', 'js', 'img', 'html', 'copy']);