'use strict';
/* global process */

// Get all our plugins
import plugins from './gulp/utils/plugins';

// Set production
global.isProduction = process.env.NODE_ENV === 'production' || !!plugins.util.env.production;

// Get this show on the road
import './gulp';