'use strict';

// Import gulp
import gulp from 'gulp';

// The script filter helps us search folders for .js files
import scriptFilter from './utils/script-filter';
import fs from 'fs';

const tasks = fs.readdirSync('./gulp/tasks/').filter(scriptFilter);

// Load every task in /tasks/
tasks.forEach(function(task) {
	require('./tasks/' + task);
});

// Set default task to development
gulp.task('default', ['development']);
