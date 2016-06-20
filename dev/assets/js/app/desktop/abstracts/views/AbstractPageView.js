

STF.AbstractPageView = ( function( window ) {
	'use strict';
	
	
	function AbstractPageView() {
		STF.AbstractView.call( this );
	}
	
	
	AbstractPageView.prototype				= Object.create( STF.AbstractView.prototype );
	AbstractPageView.prototype.constructor	= AbstractPageView;
	
	
	AbstractPageView.prototype.initDOM = function() {
		// console.log( 'AbstractPageView.initDOM() — ', this.constructor.name );
		
		this.$page = $( document.getElementById( 'page' ) );
	};
	
	
	AbstractPageView.prototype.initEl = function() {
		// console.log( 'AbstractPageView.initEl() — ', this.constructor.name );
		
		this.lazyloader = new STF.LazyLoader( this.$page, 'img-lazyload', 1 );
	};
	
	
	AbstractPageView.prototype.initTl = function() {
		/* Show page */
		this.tl.showPage = new TimelineLite( {
			paused:		true,
			onComplete:	_onPageShown.bind( this )
		} );
		this.tl.showPage.to( this.$page, 0.8, { opacity:1, ease:Quad.easeOut } );
		
		/* Hide page */
		this.tl.hidePage = new TimelineLite( {
			paused:		true,
			onComplete:	_onPageHidden.bind( this )
		} );
		this.tl.hidePage.to( this.$page, 0.8, { opacity:0, ease:Quad.easeOut } );
	};
	
	
	AbstractPageView.prototype.show = function() {
		// if ( STF.PagesController.isFirstLoad )
		// 	this.tl.showPage.progress(1);
			
		// else
			this.tl.showPage.play(0);
	};
	
	
	AbstractPageView.prototype.hide = function() {
		this.tl.hidePage.play(0);
	};
	
	
	var _onPageShown = function() {
		this.dispatch( this.E.SHOWN );
	};
	
	
	var _onPageHidden = function() {
		this.dispatch( this.E.HIDDEN );
	};
	
	
	return AbstractPageView;
	
	
} ) ( window );

