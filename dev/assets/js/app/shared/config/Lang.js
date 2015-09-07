

APP.Lang = ( function( window ) {
	
	
	function Lang() {
		
	}
	
	
	Lang.prototype.init = function() {
		_setGlobalInfos.call( this );
		_setCurrentLang.call( this );
		_setLangLinks.call( this );
		
		APP.Path.setCurrentPageUrl();
	};
	
	
	var _setGlobalInfos = function() {
		// all lang
		this.ALL_LANG = APP.Config.ALL_LANG;
		
		// default lang
		this.DEFAULT_LANG = this.ALL_LANG[0];
		
		// multi-lang
		if ( this.ALL_LANG.length == 1 )
			this.MULTI_LANG = false;
		else
			this.MULTI_LANG = true;
	};
	
	
	var _setCurrentLang = function() {
		if ( !this.MULTI_LANG || APP.Path.PAGE_URL.params.length === 0 )
			this.LANG = this.DEFAULT_LANG;
		else
			this.LANG = APP.Path.PAGE_URL.aParams[0];
	};
	
	
	var _setLangLinks = function() {
		this.LANG_LINK_ROOT	= this.LANG == this.DEFAULT_LANG ? '' : this.LANG;
		this.LANG_LINK		= this.MULTI_LANG ? this.LANG + '/' : '';
	};
	
	
	return new Lang();
	
	
} ) (window);
