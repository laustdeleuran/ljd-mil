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
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { syncHistory, routeReducer } from 'redux-simple-router';



// Get redux middleware
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';



// Load reducers
import drawer from './reducers/drawer';
import feeds from './reducers/feeds';
import postByCategory from './reducers/posts-by-category';
import pages from './reducers/pages';
import routes from './reducers/routes';

// Combine custom reducers with routing reducer
const reducer = combineReducers(Object.assign({}, {
	drawer,
	feeds,
	postByCategory,
	pages,
	routes,
	routing: routeReducer
}));



// Set up middleware

// Sync dispatched route actions to the history
const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);

const loggerMiddleware = createLogger(); // neat middleware that logs actions

const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware, loggerMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

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
				<IndexRoute component={ListView}>

				<Route path="list" component={ListView}>
					<Route path="log" component={LogView} />
					<Route path="analysis" component={AnalysisView} />
				</Route>
				</IndexRoute>
				<Route path="login" component={LoginView} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('mil')
);