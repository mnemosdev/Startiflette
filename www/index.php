<?php



/* -------- Init -------- */
include_once('init.php');



/* -------- Texts -------- */
include_once(SITE_ROOT.'includes/contents/texts-'.LG.'.php');



/* -------- Load JSON -------- */
include_once(SITE_ROOT.'includes/func/load-json.php');



/* -------- Get page name -------- */
$pageName = '';
$subPageName = '';
$partName = '';
$subPartName = '';

if(isset($_GET['page'])) $pageName = $_GET['page'];
if(isset($_GET['subPage'])) $subPageName = $_GET['subPage'];
if(isset($_GET['part'])) $partName = $_GET['part'];
if(isset($_GET['subPart'])) $subPartName = $_GET['subPart'];

if(!$pageName) {
	if(LG == 'fr') $pageName = 'accueil';
	else if(LG == 'en') $pageName = 'home';
}



/* -------- Titles/metas of the page -------- */
$titlePage = '';
$descPage = '';

$titlePage = $pages[$pageName]['title'];
$descPage = $pages[$pageName]['desc'];
$file = $pages[$pageName]['file'];

if($file == 'project') {
	$url = $pageName.'/'.$subPageName.'/'.$partName;
	
	for($i=0; $i<count($projects); $i++) {
		$project = $projects[$i];
		
		if($project['url'] == $url) {
			$titlePage = $project['name'].' - '.$pages[$pageName]['title'];
			$descPage = $project['name'].' - '.$pages[$pageName]['title'];
			
			break;
		}
	}
}



/* -------- Show page -------- */
if(MOBILE && !TABLET) { // mobile
	include_once(SITE_ROOT.'includes/partials/header-mobile.php');
	include_once(SITE_ROOT.'pages/mobile/'.$file.'.php');
	include_once(SITE_ROOT.'includes/partials/footer-mobile.php');
} else { // desktop & tablette
	include_once(SITE_ROOT.'includes/partials/header.php');
	include_once(SITE_ROOT.'pages/desktop/'.$file.'.php');
	include_once(SITE_ROOT.'includes/partials/footer.php');
}



?>