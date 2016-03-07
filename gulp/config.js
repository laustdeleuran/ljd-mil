'use strict';

// Get data from package.json
import getPackageJson from './utils/get-package-json';

// Base constants
const clientSrcDir = 'src';
const clientDistDir = 'dist';
const clientJsMainFileName = 'app.js';

export default {
	// Server & BrowserSync settings
	serverPort: 2000,
	browserPort: 3000,
	UIPort: 3001,
	serverUrl: 'localhost',

	// Paths
	paths: {
		client: {
			src: clientSrcDir,
			dist: clientDistDir,
			styleFiles: [
				clientSrcDir + '/style/**/*.{scss,sass,css}'
			],
			jsMainFileName: clientJsMainFileName,
			jsAppConfig: clientSrcDir + '/script/config.js',
			jsMain: [
				clientSrcDir + '/script/' + clientJsMainFileName
			],
			jsLintFiles: [
				clientSrcDir + '/script/**/*.js',
				'gulp/**/*.js',
				'server/**/*.js'
			],
			imgFiles: [
				clientSrcDir + '/screenshot.png',
				clientSrcDir + '/images/**/*.{png,jpeg,jpg,gif,svg}'
			],
			svgSpriteFiles: [
				clientSrcDir + '/images/icons/**/*.svg'
			],
			htmlFiles: [
				clientSrcDir + '/**/*.{html,php}',
				'!' + clientSrcDir + '/script/**/*.html'
			],
			staticFiles: [
				clientSrcDir + '/admin/**/*.*',
				clientSrcDir + '/static/**/*.*',
				clientSrcDir + '/*.ico',
				clientSrcDir + '/.htaccess'
			]
		},
		versionFiles: [
			'package.json',
			clientSrcDir + '/data/config.json'
		]
	},

	// Package
	pkg: getPackageJson()
};