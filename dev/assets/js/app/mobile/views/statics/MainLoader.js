

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.MainLoader = ( function( window ) {
	'use strict';
	
	
	function MainLoader() {
		STF.AbstractMainLoader.call( this );
		
		this.E = {
			PROGRESS:	'progress',
			FILE_LOAD:	'fileLoad',
			COMPLETE:	'complete',
			SHOWN:		'shown',
			HIDDEN:		'hidden'
		};
	}
	
	
	MainLoader.prototype				= Object.create( STF.AbstractMainLoader.prototype );
	MainLoader.prototype.constructor	= MainLoader;
	
	
	/*MainLoader.prototype.init = function() {
		STF.AbstractMainLoader.prototype.init.call( this );
	};*/
	
	
	MainLoader.prototype.initDOM = function() {
		this.$loader = $( document.getElementById( 'main-loader' ) );
	};
	
	
	MainLoader.prototype.initTl = function() {
		
	};
	
	
	MainLoader.prototype.onProgress = function( percentage ) {
		console.log( percentage );
	};
	
	
	MainLoader.prototype.hideInit = function() {
		this.$loader[0].style.display = 'none';
		this.dispatch( this.E.HIDDEN );
	};
	
	
	MainLoader.prototype.show = function() {
		this.$loader[0].style.display = 'block';
		this.$loader[0].offsetHeight; // jshint ignore:line
		
		_onShowComplete.call( this );
	};
	
	
	MainLoader.prototype.hide = function() {
		_onHideComplete.call( this );
	};
	
	
	var _onHideInitComplete = function() {
		this.killTimeline( 'hideInit' );
		
		removeClass( this.$loader[0], 'init' );
		this.$loader[0].style.display = 'none';
		
		this.dispatch( this.E.HIDDEN );
	};
	
	
	var _onShowComplete = function() {
		this.dispatch( this.E.SHOWN );
	};
	
	
	var _onHideComplete = function() {
		// LOADING_MODE == 'byPageStatic' && LOADING_MODE == 'byPageDynamic'
		this.$loader[0].style.display = 'none';
		
		this.dispatch( this.E.HIDDEN );
	};
	
	
	return new MainLoader();
	
	
} ) ( window );

