'use strict';

/**
 * @overview login action types
 *
 * @description
 * Defines login/logout Redux actions - see http://rackt.org/redux/docs/basics/Actions.html
 *
 * @author ljd
 */


export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const ERROR_LOGIN = 'ERROR_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const DESTROY_LOGIN = 'INVALIDATE_LOGIN';



/**
 * @method
 * @description
 * Request login session
 */
function requestLogin() {
	return {
		type: REQUEST_LOGIN
	};
}



/**
 * @method
 * @description
 * Destroy login session
 */
export function destroyLogin() {
	return {
		type: DESTROY_LOGIN
	};
}

/**
 * @method
 * @description
 * Login session fetch error
 */
function errorLogin(error) {
	return {
		type: ERROR_LOGIN,
		receivedAt: Date.now(),
		error
	};
}

/**
 * @method
 * @description
 * Receive login session
 */
function receiveLogin(session) {
	return {
		type: RECEIVE_LOGIN,
		receivedAt: Date.now(),
		session
	};
}

/**
 * @method
 * @description
 * Fetch login session
 */
function fetchLogin() {
	return dispatch => {
		dispatch(requestLogin());
		if (window.FB) {

			// First get facebook data
			let getFacebookUser = new Promise(function(resolve, reject) {
				var getUserData = function(authResponse) {
					window.FB.api('/me', {
						locale: 'en_US',
						fields: 'name, email'
					}, function(response) {
						if (!response || response.error) {
							reject('Error calling FB.api()' + response.error);
						} else {
							resolve({
								authResponse,
								name: response.name,
								email: response.email
							});
						}
					});
				};

				window.FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						getUserData(response.authResponse);
					} else {
						window.FB.login(function(response) {
							if (response.status === 'connected') {
								// the user is logged in and has authenticated your
								// app, and response.authResponse supplies
								// the user's ID, a valid access token, a signed
								// request, and the time the access token 
								// and signed request each expire
								getUserData(response.authResponse);
							} else if (response.status === 'not_authorized') {
								// the user is logged in to Facebook, 
								// but has not authenticated your app
								reject('You must authenticate this appplication.');
							} else {
								// the user isn't logged in to Facebook.
								reject('You\'re not logged in to Facebook.');
							}
						}, {
							scope: 'public_profile,email'
						});
					}
				});
			});

			let getLocalUser = session => new Promise(function(resolve, reject) {
				// Create new user 
				var create = () => fetch('/api/users', {
					method: 'POST',
					headers: new Headers({
						'Content-Type': 'application/json'
					}),
					body: JSON.stringify(session)
				})
					.then(response => response.json(), reject)
					.then(user => resolve(Object.assign({}, user, session)), reject);

				// Update existing new user 
				var update = (data) => fetch('/api/users/' + data._id, {
					method: 'PUT',
					headers: new Headers({
						'Content-Type': 'application/json'
					}),
					body: JSON.stringify(session)
				})
					.then(response => response.json(), reject)
					.then(user => resolve(Object.assign({}, user, session)), reject);

				fetch('/api/users/?email=' + session.email, {
					method: 'GET',
					headers: new Headers({
						'Content-Type': 'application/json'
					})
				})
					.then(response => response.json(), reject)
					.then(data => data && data[0] ? update(data[0]) : create(), reject);
			});

			return getFacebookUser
				.then(session => getLocalUser(session), error => dispatch(errorLogin(error)))
				.then(session => dispatch(receiveLogin(session)), error => dispatch(errorLogin(error)));

		} else {
			return dispatch(errorLogin('No FB API available.'));
		}
	};
}



/**
 * @method
 *
 * @param {object} state - State object
 *
 * @description
 * Check if whether or not we need to fetch login session
 */
export function shouldFetchLogin(state) {
	state = state.login;
	if (!state || !state.session) {
		return true;
	} else if (state.isFetching) {
		return false;
	} else {
		return true;
	}
}



/**
 * @method
 * @description
 * Fetch all login session if needed
 */
export function fetchLoginIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchLogin(getState())) {
			// Dispatch a thunk from thunk!
			return dispatch(fetchLogin());
		} else {
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve();
		}
	};
}




/**
 * @method
 * @description
 * Logout and destroy all sessions
 */
export function logout() {
	return (dispatch) => {
		if (window.FB) {
			window.FB.logout(function() {
				dispatch(destroyLogin());
			});
		} else {
			dispatch(destroyLogin());
		}
	};
}
