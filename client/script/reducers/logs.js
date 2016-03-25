'use strict';

import { 
	INVALIDATE_LOGS, 
	REQUEST_LOGS, 
	RECEIVE_LOGS } from '../actions/logs';

function logs(state = {
	isFetching: false,
	didInvalidate: false
}, action) {
	switch (action.type) {
		case INVALIDATE_LOGS:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case REQUEST_LOGS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case RECEIVE_LOGS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				logs: action.logs,
				lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}

/**
 * @method
 * @description
 * Fetch logs - see http://rackt.org/redux/docs/basics/Reducers.html
 */
export default function logsByVehicle(state = {
}, action) {
	switch (action.type) {
		case INVALIDATE_LOGS:
		case REQUEST_LOGS:
		case RECEIVE_LOGS:
			return Object.assign({}, state, {
				[action.vehicle]: logs(state[action.vehicle], action)
			});
		default:
			return state;
	}
}