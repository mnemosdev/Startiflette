var gulp		= require('gulp');

var paths		= require('../utils/paths');

var plumber		= require('gulp-plumber');



gulp.task( 'image-move', ['clean'], function() {
	
	gulp.src( paths.src.imgFiles )
		.pipe( plumber() )
		.pipe( gulp.dest( paths.assets.img ) );
	
});