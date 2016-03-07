'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';

// Server
gulp.task('server', function() {
	plugins.nodemon({
		script: 'server',
		ignore: [
			'client/',
			'dist/',
			'*.*'
		],
		port: config.serverPort,
		env: {
			'NODE_ENV': 'development'
		}
	});
});