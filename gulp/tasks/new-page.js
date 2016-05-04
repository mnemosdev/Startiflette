var gulp		= require( 'gulp' );

var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );
var helpers		= require( '../utils/helpers' );

var gutil		= require( 'gulp-util' );
var inquirer	= require( 'inquirer' );
var fs			= require( 'fs' );

var config		= require( '../../' + paths.env.dev + paths.configs.config.configFile );



gulp.task( 'new-page', function() {
	
	var DEFAULT_NAME		= 'new page';
	var SHORT_DEFAULT_NAME	= 'n pa';
	
	setTimeout( showDialogue.bind( this, DEFAULT_NAME, SHORT_DEFAULT_NAME ), 0 );
	
} );



function showDialogue( DEFAULT_NAME, SHORT_DEFAULT_NAME ) {
	inquirer.prompt(
		[
			{
				type:		'input',
				name:		'pageName',
				message:	gutil.colors.green( 'Name of the new page:' ),
				default:	DEFAULT_NAME
			},
			{
				type:		'input',
				name:		'shortPageName',
				message:	gutil.colors.green( 'Short name of the new page:' ),
				default:	SHORT_DEFAULT_NAME
			},
			{
				type:		'confirm',
				name:		'createNewPage',
				message:	gutil.colors.green( 'Create new page?' )
			}
		], function( answers ) {
			
			if ( !answers.createNewPage )
				return;
			
			var currentJsAppName			= helpers.getJsAppName();
			
			var fileNameLowerCase			= answers.pageName.toLowerCase();
			var fileNameUpperCase			= answers.pageName.toUpperCase();
			var fileNameCapitalize			= helpers.upperCaseFirstLetter( answers.pageName );
			var fileNameTitleCase			= helpers.titleCase( answers.pageName );
			var fileNameTitleCaseNoSpace	= fileNameTitleCase.replace( / /g, '' );
			var dashedFileName				= fileNameLowerCase.replace( / /g, '-' );
			var shortName					= answers.shortPageName != SHORT_DEFAULT_NAME ? answers.shortPageName : answers.pageName;
			var shortNameTitleCase			= helpers.titleCase( shortName );
			var shortNameTitleCaseNoSpace	= shortNameTitleCase.replace( / /g, '' );
			
			var cssFileName			= '_' + dashedFileName + '.scss';
			var phpFileName			= dashedFileName + '.php';
			var jsFileName			= fileNameTitleCaseNoSpace + '.js';
			
			var cssClassName		= helpers.lowerCaseFirstLetter( shortNameTitleCaseNoSpace );
			var phpContentClassName	= fileNameTitleCaseNoSpace + 'Content';
			var phpContentVarName	= '$' + helpers.lowerCaseFirstLetter( shortNameTitleCaseNoSpace );
			var jsFileName			= fileNameTitleCaseNoSpace + '.js';
			var jsClassName			= fileNameTitleCaseNoSpace;
			
			
			// css
			createFile( '_page-name.scss',
						paths.env.dev + paths.assets.css.app[ options.device ].pages + cssFileName,
						[ 'PAGE NAME', 'pageClassName' ],
						[ fileNameUpperCase, cssClassName ] );
			
			// php view
			createFile( 'page-name-view.php',
						paths.env.dev + paths.server.views[ options.device ].pages + phpFileName,
						[ 'Page name', 'pageClassName', 'Page name' ],
						[ fileNameCapitalize, cssClassName, fileNameCapitalize ] );
			
			// php content
			createFile( 'page-name-content.php',
						paths.env.dev + paths.server.contents + 'LANG/pages/' + phpFileName,
						[ 'PageNameContent', '$page', 'Page name' ],
						[ phpContentClassName, phpContentVarName, fileNameCapitalize ] );
			
			// js
			createFile( 'PageName.js',
						paths.env.dev + paths.assets.js.app[ options.device ].views.pages + jsFileName,
						[ 'STF', 'PageName' ],
						[ currentJsAppName, jsClassName ] );
		}
	);
}


function createFile( file, destFilePath, aStringToReplace, aNewString ) {
	var data	= fs.readFileSync( paths.env.base + file, 'utf8' );
	var stringToReplace, newString;
	
	for ( var i = 0; i < aStringToReplace.length; i++ ) {
		stringToReplace	= aStringToReplace[i];
		newString		= aNewString[i];
		
		data			= data.replace( new RegExp( '\\' + stringToReplace, 'g' ), newString );
	}
	
	
	if ( file == 'page-name-content.php' ) { // necessary to create a file for each language
		var lang, destFilePathTemp, dataTemp;
		
		for ( var i = 0; i < config.ALL_LANG.length; i++ ) {
			lang = config.ALL_LANG[i];
			
			destFilePathTemp	= destFilePath.replace( 'LANG', lang );
			dataTemp			= data.replace( '/ LANG', ' / ' + lang );
			
			if ( !fs.existsSync( destFilePathTemp ) )
				fs.writeFileSync( destFilePathTemp, dataTemp, 'utf8' );
			else {
				console.log( gutil.colors.red( 'WARNING!: ' + destFilePathTemp + ' file wasn\'t created because it already exists.' ) );
			}
		}
	}
	
	else if ( !fs.existsSync( destFilePath ) ) // create file
		fs.writeFileSync( destFilePath, data, 'utf8' );
	
	else // if file already exists
		console.log( gutil.colors.red( 'WARNING!: ' + destFilePath + ' file wasn\'t created because it already exists.' ) );
	
}