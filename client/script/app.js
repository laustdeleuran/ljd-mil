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
import vehicles from './reducers/vehicles';

const reducers = combineReducers(Object.assign({}, {
	drawer,
	login,
	vehicles,
	routing: routerReducer
}));



// Set up authentication - https://github.com/mjrussell/redux-auth-wrapper
import { UserAuthWrapper } from 'redux-auth-wrapper';
const UserIsAuthenticated = UserAuthWrapper({
	failureRedirectPath: '/login',
	authSelector: state => state.login.session, // how to get the user state
	redirectAction: routerActions.replace, // the redux action to dispatch for redirect
	wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});


// Create an enhanced history that syncs navigation events with the store
const store = createStore(
	reducers,
	middleware
);


// Set up middleware

// Sync dispatched route actions to the history
const history = syncHistoryWithStore(browserHistory, store);


// Get app components
import CoreLayout from './components/layouts/core';
import LoginLayout from './components/layouts/login';

import LoginModule from './components/modules/login';

import VehicleModule from './components/modules/vehicle';
import VehicleListModule from './components/modules/vehicle-list';

import LogListModule from './components/modules/log-list';

import AnalysisModule from './components/modules/analysis';





ReactDOM.render(
	<Provider store={ store }>
		<Router history={ history }>
			<Route path="/login" component={ LoginLayout }>
				<IndexRoute component={ LoginModule } />
			</Route>
			<Route path="/" component={ UserIsAuthenticated(CoreLayout) }>
				<IndexRoute component={ VehicleListModule } />
				<Route path="vehicles/:id" component={ VehicleModule }>
					<IndexRoute component={ LogListModule } />
					<Route path="/analysis" component={ AnalysisModule } />
				</Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('mil')
);