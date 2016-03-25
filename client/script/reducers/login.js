'use strict';

import { 
	DESTROY_LOGIN, 
	REQUEST_LOGIN, 
	RECEIVE_LOGIN } from '../actions/login';

/**
 * @method
 * @description
 * Fetch login session - see http://rackt.org/redux/docs/basics/Reducers.html
 */
export default function login(state = {
	isFetching: false,
	didInvalidate: false
}, action) {
	switch (action.type) {
		case DESTROY_LOGIN:
			return {
				...state,
				session: undefined
			};
		case REQUEST_LOGIN:
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case RECEIVE_LOGIN:
			return {
				...state,
				isFetching: false,
				didInvalidate: false,
				session: action.session,
				lastUpdated: action.receivedAt
			};
		default:
			return state;
	}
}