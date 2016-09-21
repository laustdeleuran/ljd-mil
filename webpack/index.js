'use strict';

// Get data from package.json
import getPackageJson from './utils/get-package-json';



// Constants

// Package data
export const PKG_JSON = getPackageJson();

// Base directories
export const DIR_CLIENT_SRC = './client';
export const DIR_CLIENT_DIST = './dist';

// Dev server settings
export const PORT_SERVER = 8888;
export const PORT_BROWSER = 3000;
export const URL_SERVER = 'local.phosphenefx.com';

// JS
export const JS_ENTRY = DIR_CLIENT_SRC + '/script/app.js'

// JS linting
export const JS_LINT = [
	DIR_CLIENT_DIST + '/script/**/*.js',
	'webpack/**/*.js'
];

// SCSS
export const SCSS_ENTRY = DIR_CLIENT_DIST + 'style/**/*.{scss,sass,css}';

// HTML
export const HTML_FILES = [
	DIR_CLIENT_DIST + '/**/*.{html,php}',
	'!' + DIR_CLIENT_DIST + '/script/**/*.html'
];

// Images
export const IMG_FILES = [
	DIR_CLIENT_DIST + '/screenshot.png',
	DIR_CLIENT_DIST + '/media/**/*.{png,jpeg,jpg,gif,svg}'
];

// Static files
export const STATIC_FILES = [
	DIR_CLIENT_DIST + '/media/**/*.mp4',
	DIR_CLIENT_DIST + '/media/**/*.ico',
	DIR_CLIENT_DIST + '/media/fonts/**/*.*'
];

// Version files
export const VERSION_FILES = {
	json: [
		'package.json'
	]
};



// Build webpack config
const config = {
	entry: JS_ENTRY,
	output: {
		filename: 'app.' + PKG_JSON.version + '.js',
		path: DIR_CLIENT_DIST + '/script'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/, 
				loader: 'eslint', 
				exclude: /node_modules/,
				enforce: 'pre'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{ 
				test: /\.scss$/, 
				loaders: ['style', 'css', 'sass']
			}
		]
	}
};

export default config;