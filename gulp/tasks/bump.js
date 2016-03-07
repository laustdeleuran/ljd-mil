'use strict';

import gulp from 'gulp';
import plugins from '../utils/plugins';
import config from '../config';
import getPackageJson from '../utils/get-package-json';

/**
 * @method
 * @description
 * Bump version number in all relevant files
 */
gulp.task('bump', function() {
	// Get package 
	var pkg = getPackageJson();

	// Increment version 
	var newVersion = plugins.semver.inc(pkg.version, plugins.util.env.bump ? plugins.util.env.bump : 'patch');

	// Update JSONs
	return gulp.src(plugins.flatten(config.paths.versionFiles), {
		base: './'
	})
		.pipe(plugins.bump({
			version: newVersion
		}))
		.pipe(gulp.dest('./'));
});