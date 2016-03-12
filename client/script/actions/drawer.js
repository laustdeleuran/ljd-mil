'use strict';

/**
 * @overview Drawer action types
 *
 * @description
 * Defines application Redux actions - see http://rackt.org/redux/docs/basics/Actions.html
 *
 * @author ljd
 */



/**
 * @method
 * @description
 * Toggles the drawer
 */
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

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
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

export function closeDrawer() {
	return {
		type: CLOSE_DRAWER
	};
}
