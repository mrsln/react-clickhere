'use strict';

var watchify   = require('watchify');
var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var gutil      = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign     = require('lodash.assign');
var reactify   = require('reactify');
var babelify   = require('babelify');
var browserSync = require('browser-sync');
var envify      = require('envify');

// add custom browserify options here
var customOpts = {
	entries: ['./examples/example1.js'],
	debug: true
};
var opts = assign({}, watchify.args, customOpts);

var b = watchify(browserify(opts))
	.transform(babelify.configure({
		stage: 0
	}))
	.transform(reactify)
	.transform(envify);

gulp.task('js', bundle);
gulp.task('default', ['js'], function () {
		browserSync({
				server: {
					baseDir: './examples',
				}
		});
});

b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
	process.env.NODE_ENV = 'development';
	return b.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('examples/bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.reload({stream: true, once: true}));
}
