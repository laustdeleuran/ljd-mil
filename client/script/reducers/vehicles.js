'use strict';

import { 
	INVALIDATE_VEHICLES, 
	REQUEST_VEHICLES, 
	RECEIVE_VEHICLES, 
	REQUEST_ADD_VEHICLES, 
	RECEIVE_ADD_VEHICLES  } from '../actions/vehicles';

/**
 * @method
 * @description
 * Fetch vehicles - see http://rackt.org/redux/docs/basics/Reducers.html
 */
export default function vehicles(state = {
	isFetching: false,
	didInvalidate: false
}, action) {
	switch (action.type) {
		case INVALIDATE_VEHICLES:
			return {
				...state,
				didInvalidate: true
			};
		case REQUEST_VEHICLES:
		case REQUEST_ADD_VEHICLES:
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case RECEIVE_VEHICLES:
		case RECEIVE_ADD_VEHICLES:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				list: action.list,
				lastUpdated: action.receivedAt
			};
		default:
			return state;
	}
}