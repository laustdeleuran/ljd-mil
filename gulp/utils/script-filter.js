'use strict';

import path from 'path';

/**
 * @function
 * @description
 * Filters out non .js files. Prevents accidental inclusion of possible hidden files
 *
 * @return {array} - List of file names
 */
export default function scriptFilter(name) {
	return /(\.(js)$)/i.test(path.extname(name));
}