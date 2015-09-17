

APP.Router = ( function( window ) {
	
	
	function Router() {
		APP.EventDispatcher.call( this );
		
		this.E = {
			INIT: 'init'
		};
		
		this.ROUTES				= {};
		this.PAGE_URL			= {};
		this.ALT_LANG_URL		= {};
		this.LINK				= {};
		
		// this.is404				= null;
		this.isHomepage			= null;
		
		this.navigateByClick	= null; // used to avoid to set page infos two times
	}
	
	
	Router.prototype				= Object.create( APP.EventDispatcher.prototype );
	Router.prototype.constructor	= Router;
	
	
	Router.prototype.init = function() {
		_loadRoutesFile.call( this );
	};
	
	
	var _loadRoutesFile = function() {
		this.jsonLoader	= new APP.Loader( false );
		
		this.jsonLoader.buildEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		var aJsonFiles	= [];
		var fileName, filePath;
		
		for ( var key in APP.Config.ROUTES_FILES ) {
			fileName = APP.Config.ROUTES_FILES[ key ];
			filePath = APP.Path.URL.routes + fileName + '.json';
			
			aJsonFiles.push( {
				id:		fileName,
				src:	filePath
			} );
		}
		
		this.jsonLoader.startLoad( aJsonFiles );
	};
	
	
	var _onComplete = function( data ) {
		_destroyJsonLoader.call( this );
		_setRoutes.call( this, data );
		
		this.dispatch( this.E.INIT );
	};
	
	
	var _destroyJsonLoader = function() {
		this.jsonLoader.destroyEvt( this.jsonLoader.E.COMPLETE, _onComplete.bind( this ) );
		
		this.jsonLoader.destroy();
		this.jsonLoader = null;
	};
	
	
	var _setRoutes = function( data ) {
		for ( var routesName in data )
			this.ROUTES[ routesName ] = data[ routesName ];
	};
	
	
	Router.prototype.setPageUrl = function( isInit, url )
	{
		this.PAGE_URL.full		= _getFullPageUrl.call( this, url );
		this.PAGE_URL.params	= _getParamsPageUrl.call( this );
		this.PAGE_URL.aParams	= this.PAGE_URL.params.split( '/' );
		
		if ( isInit ) { // init
			this.PAGE_URL.current	= null;
			this.PAGE_URL.aCurrent	= null;
		}
		else // page change
			this.setCurrentPageUrl();
		
		console.log( this.PAGE_URL );
	};
	
	
	var _getFullPageUrl = function( url ) {
		var fullPageUrl;
		
		if ( url === null ) // init
			fullPageUrl = History.getState().url;
		else // page change
			fullPageUrl = url;
		
		
		return fullPageUrl;
	};
	
	
	var _getParamsPageUrl = function() {
		var paramsPageUrl = this.PAGE_URL.full.replace( APP.Path.URL.base, '' );
		
		if ( paramsPageUrl.substr( 0, 1 ) == '/' ) // if slash is first character, remove it
			paramsPageUrl = paramsPageUrl.substr( 1 );
		
		if ( paramsPageUrl.substr( paramsPageUrl.length-1, 1 ) == '/' ) // if slash is last character, remove it
			paramsPageUrl = paramsPageUrl.substr( 0, paramsPageUrl.length-1 );
		
		paramsPageUrl = paramsPageUrl.split( '#' )[0]; // remove #hash
		paramsPageUrl = paramsPageUrl.split( '?' )[0]; // remove ?params
		
		
		return paramsPageUrl;
	};
	
	
	Router.prototype.setCurrentPageUrl = function() {
		this.PAGE_URL.current	= _getCurrentPageUrl.call( this );
		this.PAGE_URL.aCurrent	= this.PAGE_URL.current.split( '/' );
	};
	
	
	var _getCurrentPageUrl = function()
	{
		var currentPageUrl = this.PAGE_URL.params.replace( APP.Lang.LANG, '' );
		
		if ( currentPageUrl.substr( 0, 1 ) == '/' ) // if slash is first character, remove it
			currentPageUrl = currentPageUrl.substr( 1 );
		
		
		return currentPageUrl;
	};
	
	
	Router.prototype.initRouting = function() {
		_bindEvents.call( this );
		
		_setPageInfos.call( this );
		
		APP.PagesController.initPage();
	};
	
	
	var _bindEvents = function() {
		History.Adapter.bind( window, 'statechange', _onStateChange.bind( this ) );
	};
	
	
	var _setPageInfos = function() {
		var langExist	= _getLangExistence.call( this );
		var page		= _getPageInfos.call( this );
		
		if ( langExist && page.exist ) { // page exist
			_setIsHomepage.call( this, page.id );
			_setAltLangUrl.call( this, page.params );
		}
		else { // 404
			page.id		= 'error404';
			page.params	= this.ROUTES.static.error404;
		}
		
		APP.PagesController.setPageInfos( page.id, page.params.jsView, page.params[ APP.Lang.LANG ].title, page.params[ APP.Lang.LANG ].desc );
	};
	
	
	var _getLangExistence = function() {
		var langExist = true;
		
		if ( APP.Lang.ALL_LANG.indexOf( APP.Lang.LANG ) == -1 ) {
			APP.Lang.LANG = APP.Lang.DEFAULT_LANG;
			
			langExist = false;
		}
		
		
		return langExist;
	};
	
	
	var _getPageInfos = function() {
		var routesGroupName, routesGroup, pageId, pageParams;
		var page = {
			exist:	false,
			id:		null,
			params:	null
		};
		
		for ( routesGroupName in this.ROUTES ) { // parse all routes group
			routesGroup = this.ROUTES[ routesGroupName ];
			
			for ( pageId in routesGroup ) { // parse all pages
				pageParams = routesGroup[ pageId ];
				
				if ( pageParams[ APP.Lang.LANG ].url == this.PAGE_URL.current ) { // if url exist
					page.exist	= true;
					page.id		= pageId;
					page.params	= pageParams;
					
					break; // break second for
				}
			}
			
			if ( page.exist )
				break; // break first for
			
		}
		
		
		return page;
	};
	
	
	var _setIsHomepage = function( pageId )
	{
		this.isHomepage = pageId == 'home' ? true : false;
	};
	
	
	var _setAltLangUrl = function( pageParams )
	{
		var currentUrl, urlPart, altLangUrl;
		
		for ( var i in APP.Lang.ALL_LANG ) {
			var lang = APP.Lang.ALL_LANG[i];
			
			if ( lang !== APP.Lang.LANG ) {
				currentUrl = pageParams[ lang ].url;
				
				if ( this.isHomepage && lang == APP.Lang.DEFAULT_LANG )
					urlPart = '';
				
				else if ( this.isHomepage )
					urlPart = lang;
				
				else
					urlPart = lang + '/' + pageParams[ lang ].url;
				
				
				altLangUrl = APP.Path.URL.base + urlPart;
				
				this.ALT_LANG_URL[ lang ] = altLangUrl;
			}
			
		}
	};
	
	
	Router.prototype.checkUrlCorrespondence = function() {
		if ( this.PAGE_URL.full != _getFullPageUrl.call( this, null ) )
			_onStateChange.call( this );
	};
	
	
	Router.prototype.navigateTo = function( url ) {
		if ( APP.PagesController.isPageChange )
			return;
		
		if ( _isSameUrl.call( this, url ) )
			return;
		
		this.navigateByClick = true;
		
		_setInfos.call( this, url );
		
		History.pushState( null, APP.PagesController.page.title, url );
	};
	
	
	var _onStateChange = function() {
		if ( APP.PagesController.isPageChange )
			return;
		
		if ( this.navigateByClick ) // if navigate by click
			this.navigateByClick = false; // reset it
		
		else // if navigate by prev/next browser
			_setInfos.call( this, null );
		
		
		APP.PagesController.changePage( this.PAGE_URL.full );
	};
	
	
	var _isSameUrl = function( url ) {
		var fullPageUrl = this.PAGE_URL.full;
		
		if ( fullPageUrl.substr( fullPageUrl.length-1, 1 ) == '/' ) // if slash is last character, remove it
			fullPageUrl = fullPageUrl.substr( 0, fullPageUrl.length-1 );
		
		if ( url.substr( url.length-1, 1 ) == '/' ) // if slash is last character, remove it
			url = url.substr( 0, url.length-1 );
		
		
		return url == fullPageUrl;
	};
	
	
	var _setInfos = function( url ) {
		this.setPageUrl( false, url );
		
		_setPageInfos.call( this );
	};
	
	
	return new Router();
	
	
} ) ( window );

