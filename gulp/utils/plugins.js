'use strict';

// Load all our plugins
export default require('gulp-load-plugins')({
	pattern: [
		'gulp-*', // Load all plugins with `gulp-` prefix. Nifty!
		'babelify',
		'browserify',
		'browser-sync',
		'del',
		'flatten',
		'hintify',
		'eslintify',
		'semver',
		'stringify',
		'vinyl-buffer',
		'vinyl-source-stream',
		'watchify'
	]
});