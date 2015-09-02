

APP.Views = APP.Views || {};
APP.Views.Static = APP.Views.Static || {};


APP.Views.Static.MainLoader = (function(window) {
	
	
	function MainLoader() {
		APP.View.call(this);
	}
	
	
	MainLoader.prototype = Object.create(APP.View.prototype);
	MainLoader.prototype.constructor = MainLoader;
	
	
	MainLoader.prototype.initEl = function() {
		this.$.loader	= $(document.getElementById('loader'));
		this.$.progress	= this.$.loader.find('.loader-progress');
	};
	
	
	MainLoader.prototype.bindEvents = function() {
		
	};
	
	
	MainLoader.prototype.unbindEvents = function() {
		
	};
	
	
	MainLoader.prototype.resize = function() {
		
	};
	
	
	MainLoader.prototype.progressLoader = function(percentage) {
		var progress = percentage - 100 + '%';
		
		this.$.progress[0].style[ APP.Config.TRANSFORM ] = 'translate(' + progress + ', 0%)';
	};
	
	
	MainLoader.prototype.hidePreloader = function() {
		// hide preloader if need
		// play intro if need and at the end of it dispatch APP.RoutesManager.currentView.E.SHOWN
		
		this.tl.hidePreloader = new TimelineLite();
		this.tl.hidePreloader.to( this.$.progress, 1, {x:'100%', ease:Quart.easeIn, onComplete:function(){
			this.killTimeline('hidePreloader');
			
			APP.RoutesManager.currentView.dispatch(APP.RoutesManager.currentView.E.SHOWN); // dispatch event to enable page change
		}.bind(this)} );
		
		
		// if don't need to hide preloader just dispath APP.RoutesManager.currentView.E.SHOWN
		// APP.RoutesManager.currentView.dispatch(APP.RoutesManager.currentView.E.SHOWN); // dispatch event to enable page change
	};
	
	
	MainLoader.prototype.hide = function() {
		this.tw.hideLoader = TweenLite.to(this.$.loader, 0.8, {opacity:0, display:'none', ease:Quart.easeOut});
		
		// if(APP.RoutesManager.prevView == null) // if need a different behavior in the first load.
	};
	
	
	MainLoader.prototype.show = function() {
		this.tw.showLoader = TweenLite.to(this.$.loader, 0.8, {opacity:1, display:'block', ease:Quart.easeOut});
	};
	
	
	return new MainLoader();
	
	
})(window);
