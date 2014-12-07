var gulp = require('gulp');

var paths = require('../utils/paths');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');


gulp.task('js-hint', function() {
	
	gulp.src(paths.src.jsAppFiles)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(notify(function(file) {
			if(file.jshint.success) return false;
			var errors = file.jshint.results.map(function(data) {
				if(data.error) return '('+data.error.line+':'+data.error.character+') '+data.error.reason;
			}).join('\n');
			return file.relative+' ('+file.jshint.results.length+' errors)\n'+errors;
		}))
		.pipe(jshint.reporter('fail'));
	
});





// var gulp = require('gulp');

// var paths = require('../utils/paths');
// var plumber = require('gulp-plumber');
// var notify = require('gulp-notify');
// var jshint = require('gulp-jshint');


// module.exports = function(e) {
	
// 	console.log('Js---hint');
	
// 	return gulp.src(paths.src.jsAppDesktopFiles)
// 		.pipe(plumber())
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('jshint-stylish'))
// 		.pipe(notify(function(file) {
// 			if(file.jshint.success) return false;
// 			var errors = file.jshint.results.map(function(data) {
// 				if(data.error) return '('+data.error.line+':'+data.error.character+') '+data.error.reason;
// 			}).join('\n');
// 			return file.relative+' ('+file.jshint.results.length+' errors)\n'+errors;
// 		}))
// 		.pipe(jshint.reporter('fail'));
	
// }
