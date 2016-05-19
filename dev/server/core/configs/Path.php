<?php



class Path
{
	
	protected static $instance;
	
	static $URL			= null;
	static $FILE		= null;
	static $JS_FILES	= null;
	
	private $deviceDir	= null;
	
	private $params		= null;
	
	
	protected function __construct()
	{
		$this->config = Config::getInstance();
		
		$this->setDeviceDir();
		$this->setPaths();
		$this->setJsFilesUrl();
		
		$this->setParams();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setDeviceDir()
	{
		if ( !Device::$HAS_MOBILE_VERSION )
			$this->deviceDir = 'desktop/';
		else if ( Device::$HAS_MOBILE_VERSION && ( Device::$IS_DESKTOP || Device::$IS_TABLET ) )
			$this->deviceDir = 'desktop/';
		else if ( Device::$HAS_MOBILE_VERSION && Device::$DEVICE == 'mobile' )
			$this->deviceDir = 'mobile/';
	}
	
	
	private function setPaths()
	{
		// url paths
		self::$URL			= new stdClass();
		
		self::$URL->base		= Config::$ENVS->{ Config::$ENV }->base_url;
		self::$URL->assets		= self::$URL->base		. 'assets/';
		self::$URL->css			= self::$URL->assets	. 'css/';
		self::$URL->favicons	= self::$URL->assets	. 'favicons/';
		self::$URL->files		= self::$URL->assets	. 'files/';
		self::$URL->img			= self::$URL->assets	. 'img/';
		self::$URL->js			= self::$URL->assets	. 'js/';
		self::$URL->json		= self::$URL->assets	. 'json/';
		self::$URL->sounds		= self::$URL->assets	. 'sounds/';
		self::$URL->svg			= self::$URL->assets	. 'svg/';
		self::$URL->svgSprite	= self::$URL->svg		. '_sprite/';
		self::$URL->videos		= self::$URL->assets	. 'videos/';
		self::$URL->configs		= self::$URL->base		. 'configs/';
		self::$URL->server		= self::$URL->base		. 'server/';
		
		
		// file paths
		self::$FILE					= new stdClass();
		
		self::$FILE->assets			= 'assets/';
		self::$FILE->css			= self::$FILE->assets	. 'css/';
		self::$FILE->favicons		= self::$FILE->assets	. 'favicons/';
		self::$FILE->files			= self::$FILE->assets	. 'files/';
		self::$FILE->img			= self::$FILE->assets	. 'img/';
		self::$FILE->js				= self::$FILE->assets	. 'js/';
		self::$FILE->json			= self::$FILE->assets	. 'json/';
		self::$FILE->sounds			= self::$FILE->assets	. 'sounds/';
		self::$FILE->svg			= self::$FILE->assets	. 'svg/';
		self::$FILE->svgSprite		= self::$FILE->svg		. '_sprite/';
		self::$FILE->videos			= self::$FILE->assets	. 'videos/';
		self::$FILE->configs		= 'configs/';
		self::$FILE->jsFilesFile	= self::$FILE->configs	. 'config/js-files.json';
		self::$FILE->routes			= self::$FILE->configs	. 'routes/';
		self::$FILE->server			= 'server/';
		self::$FILE->shared			= self::$FILE->server	. 'shared/';
		self::$FILE->contents		= self::$FILE->server	. 'contents/';
		self::$FILE->contentsShared	= self::$FILE->contents	. 'shared/';
		self::$FILE->views			= self::$FILE->server	. 'views/';
		self::$FILE->viewsPages		= self::$FILE->views	. $this->deviceDir . 'pages/';
		self::$FILE->viewsPartials	= self::$FILE->views	. $this->deviceDir . 'partials/';
		self::$FILE->viewsStatics	= self::$FILE->views	. $this->deviceDir . 'statics/';
		self::$FILE->viewsAlt		= self::$FILE->views	. 'alt/';
		self::$FILE->viewsShared	= self::$FILE->views	. 'shared/';
	}
	
	
	private function setJsFilesUrl()
	{
		self::$JS_FILES	= array();
		$jsFiles		= $this->config->getJsFilesFile();
		
		foreach ( $jsFiles as $fileId => $fileInfos ) { // parse JsFiles infos
			$listFiles	= '';
			
			/* dev */
			if ( Config::$ENV != 'preprod-local' || Config::$ENV != 'preprod' || Config::$ENV != 'prod' ) {
				$files = $jsFiles->$fileId->files;
				
				foreach ( $files as $filePath ) { // parse files list
					if ( is_array( $filePath ) ) {
						$listFiles .= '<!--[if lt IE 9]><script src="' . self::$URL->js . $filePath[1] . '"></script><![endif]-->' . "\n";
						$listFiles .= '<!--[if (gte IE 9) | !(IE)]><!--><script src="' . self::$URL->js . $filePath[0] . '"></script><!--<![endif]-->' . "\n";
					}
					else
						$listFiles .= '<script src="' . self::$URL->js . $filePath . '"></script>' . "\n";
				}
			}
			
			/* preprod-local, preprod or prod */
			else {
				$fileName	= $jsFiles->$fileId->name;
				$fileDest	= $jsFiles->$fileId->dest;
				
				if ( is_array( $fileName ) ) {
						$listFiles .= '<!--[if lt IE 9]><script src="' . self::$URL->js . $fileName[1] . '"></script><![endif]-->' . "\n";
						$listFiles .= '<!--[if (gte IE 9) | !(IE)]><!--><script src="' . self::$URL->js . $fileName[0] . '"></script><!--<![endif]-->' . "\n";
					}
					else
						$listFiles .= '<script src="' . self::$URL->js . $fileDest . $fileName . '"></script>' . "\n";
			}
			
			self::$JS_FILES[ $fileId ] = $listFiles;
		}
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->URL		= self::$URL;
		$this->params->FILE		= self::$FILE;
		$this->params->JS_FILES	= self::$JS_FILES;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>