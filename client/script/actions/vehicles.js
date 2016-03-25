'use strict';

/**
 * @overview vehicles action types
 *
 * @description
 * Defines application Redux actions - see http://rackt.org/redux/docs/basics/Actions.html
 *
 * @author ljd
 */

export const REQUEST_ADD_VEHICLE = 'REQUEST_ADD_VEHICLES';
export const RECEIVE_ADD_VEHICLE = 'RECEIVE_ADD_VEHICLES';
export const ERROR_ADD_VEHICLE = 'ERROR_ADD_VEHICLES';

export const REQUEST_VEHICLES = 'REQUEST_VEHICLES';
export const ERROR_VEHICLES = 'ERROR_VEHICLES';
export const RECEIVE_VEHICLES = 'RECEIVE_VEHICLES';
export const INVALIDATE_VEHICLES = 'INVALIDATE_VEHICLES';

/**
 * @method
 * @description
 * Request add vehicle
 */
function requestAddVehicle() {
	return {
		type: REQUEST_ADD_VEHICLE
	};
}

/**
 * @method
 * @description
 * Request add vehicle
 */
function receiveAddVehicle() {
	return {
		type: RECEIVE_ADD_VEHICLE
	};
}

/**
 * @method
 * @description
 * Vehicle add fetch error
 */
function errorAddVehicle(error) {
	return {
		type: ERROR_ADD_VEHICLE,
		receivedAt: Date.now(),
		error
	};
}

/**
 * @method
 * @description
 * Request vehicles
 */
function requestVehicles() {
	return {
		type: REQUEST_VEHICLES
	};
}

/**
 * @method
 * @description
 * Invalidate vehicles
 */
function invalidateVehicles() {
	return {
		type: INVALIDATE_VEHICLES
	};
}

/**
 * @method
 * @description
 * Vehicles fetch error
 */
function errorVehicles(error) {
	return {
		type: ERROR_VEHICLES,
		receivedAt: Date.now(),
		error
	};
}

/**
 * @method
 * @description
 * Receive vehicles
 */
function receiveVehicles(list) {
	return {
		type: RECEIVE_VEHICLES,
		receivedAt: Date.now(),
		list
	};
}

/**
 * @method
 * @param {object} state - State object
 * @description
 * Fetch vehicles
 */
function fetchVehicles(state) {
	return dispatch => {
		dispatch(requestVehicles());
		return fetch('/api/vehicles/?_user=' + (state.login.session && state.login.session._id))
			.then(response => response.json(), error => dispatch(errorVehicles(error)))
			.then(json => dispatch(receiveVehicles(json)));
	};
}

/**
 * @method
 * @param {object} vehicle - Vehicle object data
 * @description
 * Add vehicles
 */
export function addVehicle(vehicle) {
	return dispatch => {
		dispatch(requestAddVehicle());
		return fetch('/api/vehicles', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(vehicle)
		})
			.then(() => dispatch(receiveAddVehicle()), error => dispatch(errorAddVehicle(error)))
			.then(() => dispatch(invalidateVehicles()))
			.then(() => dispatch(fetchVehiclesIfNeeded()));
	};
}

/**
 * @method
 * @param {object} state - State object
 * @description
 * Check if whether or not we need to fetch vehicles
 */
export function shouldFetchVehicles(state) {
	state = state.vehicles;
	if (!state || !state.list) {
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
 * Fetch all vehicles if needed
 */
export function fetchVehiclesIfNeeded() {
	return (dispatch, getState) => {
		var state = getState();
		if (shouldFetchVehicles(state)) {
			// Dispatch a thunk from thunk!
			return dispatch(fetchVehicles(state));
		} else {
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve();
		}
	};
}