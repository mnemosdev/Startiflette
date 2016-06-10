

STF.Views			= STF.Views || {};
STF.Views.Statics	= STF.Views.Statics || {};


STF.Views.Statics.Header = ( function( window ) {
	'use strict';
	
	
	function Header() {
		STF.AbstractView.call( this );
	}
	
	
	Header.prototype				= Object.create( STF.AbstractView.prototype );
	Header.prototype.constructor	= Header;
	
	
	Header.prototype.initDOM = function() {
		this.$header		= $( document.getElementById( 'header' ) );
		this.$headerLgLink	= this.$header.find( '.header-lang-link' );
		this.$menu			= $( document.getElementById( 'menu' ) );
		this.$menuLink		= this.$menu.find( '.menu-link' );
	};
	
	
	Header.prototype.bindEvents = function() {
		this.$menuLink.on( 'click', $.proxy( this.changeUrl, this ) );
	};
	
	
	Header.prototype.updateMenuLinks = function( pageId ) {
		var $linkToInactivate	= this.$menuLink.filter( '.active' );
		var $linkToActivate		= this.$menuLink.filter( '[ data-link-id="' + pageId + '" ]' );
		
		if ( $linkToInactivate.length > 0 )
			removeClass( $linkToInactivate[0], 'active' );
		if ( $linkToActivate.length )
			addClass( $linkToActivate[0], 'active' );
	};
	
	
	return new Header();
	
	
} ) ( window );

