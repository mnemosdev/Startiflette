

APP.Models = APP.Models || {};


APP.Models.Json = (function(window) {
	
	
	function Json() {
		APP.EventDispatcher.call(this);
		
		this.E = {
			INIT : 'init'
		};
		
		this.aJson = [
			{
				id	: 'pages',
				src	: APP.Config.ASSETS + 'json/pages.json'
			},
			{
				id	: 'projects',
				src	: APP.Config.ASSETS + 'json/projects.json'
			}
		];
		
		this.data = {};
	}
	
	
	Json.prototype = Object.create(APP.EventDispatcher.prototype);
	Json.prototype.constructor = Json;
	
	
	Json.prototype.init = function() {
		this.jsonLoader = new APP.Loader(true, false);
		
		this.jsonLoader.buildEvt(this.jsonLoader.E.FILE_LOAD, _onFileLoad.bind(this));
		this.jsonLoader.buildEvt(this.jsonLoader.E.COMPLETE, _onComplete.bind(this));
		
		this.jsonLoader.startLoad(this.aJson);
	};
	
	var _onFileLoad = function(e) {
		
		if(e.item.id == 'pages')
			this.data[e.item.id] = e.result;
		
		else {
			this.data.subPages = this.data.subPages || {};
			this.data.subPages[e.item.id] = e.result;
		}
	};
	
	
	var _onComplete = function(e) {
		this.jsonLoader.destroyEvt(this.jsonLoader.E.FILE_LOAD, _onFileLoad.bind(this));
		this.jsonLoader.destroyEvt(this.jsonLoader.E.COMPLETE, _onComplete.bind(this));
		
		this.jsonLoader.destroy();
		this.jsonLoader = null;
		
		// this.dispatch(this.E.INIT); // if no images to load just dispatch this.E.INIT
		_loadImages.call(this);
	};
	
	
	var _loadImages = function() {
		APP.Models.Assets.buildEvt(APP.Models.Assets.E.INIT, _imgLoaded.bind(this));
		APP.Models.Assets.init();
	};
	
	
	var _imgLoaded = function() {
		APP.Models.Assets.destroyEvt(APP.Models.Assets.E.INIT, _imgLoaded.bind(this));
		
		this.dispatch(this.E.INIT);
	};
	
	
	return new Json();
	
	
})(window);

