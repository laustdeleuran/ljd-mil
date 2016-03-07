'use strict';

const fs = require('fs');

/**
 * @function
 * @description
 * Get JSON data in `package.json` as JS object.
 *
 * @return {object}
 */
export default function getPackageJson() {
	return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}