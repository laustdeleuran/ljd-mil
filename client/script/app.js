'use strict';

/**
 * @overview Application initialization
 *
 * @description
 * Initializes the application with routing and redux setup. Loosely based on https://github.com/rackt/redux-simple-router#tutorial and https://github.com/davezuko/react-redux-starter-kit
 *
 * @author ljd
 */



// Get libs
import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';



// Get routing libs
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware, routerActions } from 'react-router-redux';



// Get redux middleware
import thunkMiddleware from 'redux-thunk';

import createLogger from 'redux-logger';
const loggerMiddleware = createLogger(); // neat middleware that logs actions

const middleware = applyMiddleware(routerMiddleware(browserHistory), thunkMiddleware, loggerMiddleware);



// Load reducers
import drawer from './reducers/drawer';
import login from './reducers/login';

const reducers = combineReducers(Object.assign({}, {
	drawer,
	login,
	routing: routerReducer
}));



// Set up authentication - https://github.com/mjrussell/redux-auth-wrapper
import { UserAuthWrapper } from 'redux-auth-wrapper';
const UserIsAuthenticated = UserAuthWrapper({
	failureRedirectPath: '/',
	authSelector: state => state.login.session, // how to get the user state
	redirectAction: routerActions.replace, // the redux action to dispatch for redirect
	wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});


// Create an enhanced history that syncs navigation events with the store
const store = createStore(
	reducers,
	middleware
);

window.store = store;
window.reducers = reducers;
window.middleware = middleware;


// Set up middleware

// Sync dispatched route actions to the history
const history = syncHistoryWithStore(browserHistory, store);


// Get app components
import CoreLayout from './components/layouts/core';

import ListView from './components/views/list';
import LogView from './components/views/log';
import AnalysisView from './components/views/analysis';
import LoginView from './components/views/login';




ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={CoreLayout}>
				<IndexRoute component={LoginView} />
				<Route path="list" component={UserIsAuthenticated(ListView)}>
					<Route path="log" component={LogView} />
					<Route path="analysis" component={AnalysisView} />
				</Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('mil')
);