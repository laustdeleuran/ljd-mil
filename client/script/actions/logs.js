'use strict';

/**
 * @overview logs action types
 *
 * @description
 * Defines application Redux actions - see http://rackt.org/redux/docs/basics/Actions.html
 *
 * @author ljd
 */

export const REQUEST_ADD_LOG = 'REQUEST_ADD_VEHICLES';
export const RECEIVE_ADD_LOG = 'RECEIVE_ADD_VEHICLES';
export const ERROR_ADD_LOG = 'ERROR_ADD_VEHICLES';

export const REQUEST_LOGS = 'REQUEST_LOGS';
export const ERROR_LOGS = 'ERROR_LOGS';
export const RECEIVE_LOGS = 'RECEIVE_LOGS';
export const INVALIDATE_LOGS = 'INVALIDATE_LOGS';

/**
 * @method
 * @description
 * Request add log
 */
function requestAddLog() {
	return {
		type: REQUEST_ADD_LOG
	};
}

/**
 * @method
 * @description
 * Request add log
 */
function receiveAddLog() {
	return {
		type: RECEIVE_ADD_LOG
	};
}

/**
 * @method
 * @description
 * Log add fetch error
 */
function errorAddLog(error) {
	return {
		type: ERROR_ADD_LOG,
		receivedAt: Date.now(),
		error
	};
}

/**
 * @method
 * @param {object} vehicle - Vehicle object data
 * @description
 * Add log
 */
export function addLog(log) {
	return dispatch => {
		dispatch(requestAddLog());
		return fetch('/api/logs', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(log)
		})
			.then(() => dispatch(receiveAddLog()), error => dispatch(errorAddLog(error)))
			.then(() => dispatch(invalidateLogs(log._vehicle)))
			.then(() => dispatch(fetchLogsIfNeeded(log._vehicle)));
	};
}

/**
 * @method
 * @description
 * Request logs
 */
function requestLogs(vehicle) {
	return {
		type: REQUEST_LOGS,
		vehicle
	};
}

/**
 * @method
 * @description
 * Invalidate logs
 */
function invalidateLogs(vehicle) {
	return {
		type: INVALIDATE_LOGS,
		vehicle
	};
}

/**
 * @method
 * @description
 * logs fetch error
 */
function errorLogs(error) {
	return {
		type: ERROR_LOGS,
		receivedAt: Date.now(),
		error
	};
}

/**
 * @method
 * @description
 * Receive logs
 */
function receiveLogs(vehicle, logs) {
	return {
		type: RECEIVE_LOGS,
		receivedAt: Date.now(),
		vehicle,
		logs
	};
}

/**
 * @method
 * @description
 * Fetch logs
 */
function fetchLogs(vehicle) {
	return dispatch => {
		dispatch(requestLogs(vehicle));
		return fetch('/api/logs/?_vehicle=' + vehicle)
			.then(response => response.json(), error => dispatch(errorLogs(error)))
			.then(json => dispatch(receiveLogs(vehicle, json)));
	};
}

/**
 * @method
 *
 * @param {object} state - State object
 *
 * @description
 * Check if whether or not we need to fetch logs
 */
export function shouldFetchLogs(state, vehicle) {
	state = state.logsByVehicle[vehicle];
	if (!state || !state.logs) {
		return true;
	} else if (state.isFetching) {
		return false;
	} else {
		return state.didInvalidate;
	}
}

/**
 * @method
 * @description
 * Fetch all logs if needed
 */
export function fetchLogsIfNeeded(vehicle) {
	return (dispatch, getState) => {
		if (shouldFetchLogs(getState(), vehicle)) {
			// Dispatch a thunk from thunk!
			return dispatch(fetchLogs(vehicle));
		} else {
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve();
		}
	};
}