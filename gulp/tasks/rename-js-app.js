var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );
var helpers		= require( '../utils/helpers' );

var gutil		= require( 'gulp-util' );
var inquirer	= require( 'inquirer' );
var recursive	= require( 'recursive-readdir' );
var fs			= require( 'fs' );



gulp.task( 'rename-js-app', function() {
	
	var currentJsAppName = helpers.getJsAppName();
	
	setTimeout( showDialogue.bind( this, currentJsAppName ), 0 );
	
} );



function showDialogue( currentJsAppName ) {
	inquirer.prompt(
		[
			{
				type:		'input',
				name:		'jsAppName',
				message:	gutil.colors.green( 'Named the JS app:' ),
				default:	currentJsAppName
			},
			{
				type:		'confirm',
				name:		'namedJsApp',
				message:	gutil.colors.green( 'Rename JS app?' )
			}
		], function( answers ) {
			
			if ( !answers.namedJsApp )
				return;
			
			var newJsAppName = answers.jsAppName.toUpperCase();
			
			recursive( paths.env.dev + paths.assets.js.app.dir, [ '.*' ], function ( err, filesList ) {
				
				var isInitFile;
				
				for ( var i = 0; i < filesList.length; i++ ) {
					isInitFile = filesList[i] == paths.env.dev + paths.assets.js.app.initFile ? true : false;
					
					renameApp( filesList[i], currentJsAppName, newJsAppName, isInitFile );
				}
				
			});
			
			console.log( gutil.colors.cyan( 'App renamed from ' ), gutil.colors.bold( gutil.colors.magenta( currentJsAppName ) ), gutil.colors.cyan( ' to ' ), gutil.colors.bold( gutil.colors.magenta( newJsAppName ) ) );
			
		}
	);
}


function renameApp( filePath, currentJsAppName, newJsAppName, isInitFile ) {
	var stringToReplace	= isInitFile ? currentJsAppName : currentJsAppName + '\\.';
	var newString		= isInitFile ? newJsAppName : newJsAppName + '.';
	
	var data			= fs.readFileSync( filePath, 'utf8' );
	data				= data.replace( new RegExp( '\\' + stringToReplace, 'g' ), newString );
	
	fs.writeFileSync( filePath, data, 'utf8' );
}