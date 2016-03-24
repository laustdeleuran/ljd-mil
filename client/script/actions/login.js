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
			let promise = new Promise(function(resolve, reject) {
				window.FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						resolve(response.authResponse);
					}
					else {
						window.FB.login(function (response) {
							if (response.status === 'connected') {
								// the user is logged in and has authenticated your
								// app, and response.authResponse supplies
								// the user's ID, a valid access token, a signed
								// request, and the time the access token 
								// and signed request each expire
								resolve(response.authResponse);
							} else if (response.status === 'not_authorized') {
								// the user is logged in to Facebook, 
								// but has not authenticated your app
								reject('You must authenticate this appplication.');
							} else {
								// the user isn't logged in to Facebook.
								reject('You\'re not logged in to Facebook.');
							}
						});
					}
				});
			});
			
			promise.then(authResponse => dispatch(receiveLogin(authResponse)), error => dispatch(errorLogin(error)));

			return promise;
			
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
 * Logout and destory all sessions
 */
export function logout() {
	return (dispatch) => {
		if (window.FB) {
			window.FB.logout(function () {
				dispatch(destroyLogin());
			});
		} else {
			dispatch(destroyLogin());
		}
	};
}
