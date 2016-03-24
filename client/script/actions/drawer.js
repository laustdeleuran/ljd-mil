'use strict';

/**
 * @overview Drawer action types
 *
 * @description
 * Defines drawer Redux actions - see http://rackt.org/redux/docs/basics/Actions.html
 *
 * @author ljd
 */

export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

/**
 * @method
 * @description
 * Toggles the drawer
 */
export function toggleDrawer() {
	return {
		type: TOGGLE_DRAWER
	};
}

/**
 * @method
 * @description
 * Closes the drawer
 */
export function closeDrawer() {
	return {
		type: CLOSE_DRAWER
	};
}
