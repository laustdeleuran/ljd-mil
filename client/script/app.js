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


// Import dynamic routing
import Routes from './components/routes';


ReactDOM.render(
	<Provider store={store}>
		<Routes history={history} />
	</Provider>,
	document.getElementById('distortion')
);