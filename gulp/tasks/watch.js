var gulp		= require( 'gulp' );
var path		= require( 'path' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var livereload	= require( 'gulp-livereload' );



gulp.task( 'watch', function() {
	
	livereload.listen();
	
	
	/* Tasks management */
	gulp.watch( [
		paths.src.allFiles,
		'!' + paths.src.json.routes.concatAllFiles
	], function(e) {
		
		var ext, desktop, mobile, shared, config, routes;
		var taskname = null;
		
		options.filePath	= e.path;
		ext					= path.extname( options.filePath );
		
		desktop	= options.filePath.indexOf( 'desktop/' ) > -1 ? true : false;
		mobile	= options.filePath.indexOf( 'mobile/' ) > -1 ? true : false;
		shared	= options.filePath.indexOf( 'shared/' ) > -1 ? true : false;
		config	= options.filePath.indexOf( 'config/' ) > -1 ? true : false;
		routes	= options.filePath.indexOf( 'routes/' ) > -1 ? true : false;
		
		
		/* SASS */
		if ( ext == '.scss' ) {
			taskname		= 'sass';
			options.subtask	= 'default-sass';
			
			if ( desktop )
				options.cssSrcPath = [ paths.src.css.desktopFile ];
			else if ( mobile )
				options.cssSrcPath = [ paths.src.css.mobileFile ];
			else if ( shared )
				options.cssSrcPath = [ paths.src.css.desktopFile, paths.src.css.mobileFile ];
		}
		
		/* JS */
		else if ( ext == '.js' ) {
			taskname		= 'js';
			options.subtask	= 'default-js';
			
			if ( desktop )
				options.jsSrcPath = paths.src.js.app.desktopAllFiles;
			else if ( mobile )
				options.jsSrcPath = paths.src.js.app.mobileAllFiles;
			else if ( shared )
				options.jsSrcPath = paths.src.js.app.sharedAllFiles;
		}
		
		/* JSON */
		else if ( ext == '.json' ) {
			taskname		= 'json';
			options.subtask	= 'default-json';
			
			if ( config )
				options.jsonSrcPath = paths.src.json.config.allFiles;
			else if ( routes )
				options.jsonSrcPath = paths.src.json.routes.allFiles;
		}
		
		
		if ( taskname )
			gulp.start( taskname );
		
	} );
	
	
	/* Livereload */
	gulp.watch( [
		
		// SASS
		paths.assets.css.allFiles,
		
		// JS
		paths.src.js.allFiles,
		
		// JSON
		paths.src.json.allFiles,
		'!' + paths.src.json.routes.concatAllFiles,
		
		// PHP
		paths.php.indexFile,
		paths.php.allFiles
		
	] ).on( 'change', livereload.changed );
	
} );