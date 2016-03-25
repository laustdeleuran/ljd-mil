'use strict';

import { 
	TOGGLE_DRAWER, 
	CLOSE_DRAWER } from '../actions/drawer';
	
/**
 * @method
 * @description
 * Toggles drawer - see http://rackt.org/redux/docs/basics/Reducers.html
 * 
 * @author ljd
 */
export default function drawer(state = false, action) {
	switch (action.type) {
		case TOGGLE_DRAWER:
			return !state;
		case CLOSE_DRAWER:
			return false;
		default:
			return state;	
	}
}
