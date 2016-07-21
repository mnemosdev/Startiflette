

STF.AbstractView = ( function( window ) {
	'use strict';
	
	
	function AbstractView() {
		STF.EventDispatcher.call( this );
		
		this.id		= getConstructorName( this ).toLowerCase();
		
		this.E		= {
			SHOW:	'show',
			SHOWN:	'shown',
			HIDE:	'hide',
			HIDDEN:	'hidden'
		};
		
		this.tw		= {};
		this.tl		= {};
		
		this.isInit	= false;
	}
	
	
	AbstractView.prototype				= Object.create( STF.EventDispatcher.prototype );
	AbstractView.prototype.constructor	= AbstractView;
	
	
	AbstractView.prototype.init = function() {
		this.initDOM();
		this.initEl();
		this.initTl();
		this.bindEvents();
		
		this.resize();
	};
	
	
	AbstractView.prototype.initDOM = function() {
		// console.log( 'AbstractView.initDOM() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.initEl = function() {
		// console.log( 'AbstractView.initEl() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.initTl = function() {
		// console.log( 'AbstractView.initTl() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.bindEvents = function() {
		// console.log( 'AbstractView.bindEvents() — ', this.constructor.name );
		
		STF.MainView.buildEvt( STF.MainView.E.RESIZE, this.resize.bind( this ), this.id );
	};
	
	
	AbstractView.prototype.unbindEvents = function() {
		// console.log( 'AbstractView.unbindEvents() — ', this.constructor.name );
		
		STF.MainView.destroyEvt( STF.MainView.E.RESIZE, this.resize.bind( this ), this.id );
	};
	
	
	AbstractView.prototype.initView = function() {
		// console.log( 'AbstractView.initView() — ', this.constructor.name );
		
		this.isInit = true;
	};
	
	
	AbstractView.prototype.show = function() {
		// console.log( 'AbstractView.show() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.hide = function() {
		// console.log( 'AbstractView.hide() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.resize = function() {
		// console.log( 'AbstractView.resize() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.raf = function() {
		// console.log( 'AbstractView.raf() — ', this.constructor.name );
	};
	
	
	AbstractView.prototype.destroy = function() {
		this.isInit = false;
		
		this.unbindEvents();
		
		this.destroyGSAP();
	};
	
	
	AbstractView.prototype.destroyGSAP = function() {
		/* tween */
		for ( var tween in this.tw )
			this.killTween( tween );
		
		/* timeline */
		for ( var timeline in this.tl )
			this.killTimeline( timeline );
		
		this.tl = {};
		this.tw = {};
	};
	
	
	AbstractView.prototype.killTween = function( twName ) {
		if ( !this.tw[ twName ] )
			return;
		
		this.tw[ twName ].kill();
		
		this.tw[ twName ] = null;
	};
	
	
	AbstractView.prototype.killTimeline = function( tlName ) {
		if ( !this.tl[ tlName ] )
			return;
		
		this.tl[ tlName ].stop();
		this.tl[ tlName ].clear();
		this.tl[ tlName ].kill();
		
		this.tl[ tlName ] = null;
	};
	
	
	/**
	 * Change the url
	 * @params {object or string} e: most of time is an object when it come from a click on a link,
	 *								 but if you need to force a specific url you can directly pass a string
	 */
	AbstractView.prototype.changeUrl = function( e ) {
		if ( WLB.Props.HAS_PUSHSTATE ) { // if pushstate supported
			var url;
			
			if ( typeof e == 'object' ) {
				e.preventDefault();
				
				url = e.currentTarget.href;
			}
			else if ( typeof e == 'string' )
				url = e;
			
			WLB.Router.updateUrl( url );
		}
	};
	
	
	AbstractView.prototype.updateSearch = function() {
		if ( STF.Config.ENV != 'prod' )
			console.error( 'You need to override the updateSearch() method from AbstractView in the current page view.' );
	};
	
	
	AbstractView.prototype.updateHash = function() {
		if ( STF.Config.ENV != 'prod' )
			console.error( 'You need to override the updateHash() method from AbstractView in the current page view.' );
	};
	
	
	return AbstractView;
	
	
} ) ( window );

