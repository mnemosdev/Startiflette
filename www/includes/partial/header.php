<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
	
	<title><?php echo $titrePage; ?></title>
	<meta name="description" content="<?php echo $descPage; ?>" />
	<meta name="keywords" content="" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Gaston Bouchayer" />
	<meta name="designer" content="Gaston Bouchayer" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	
	<!-- Facebook -->
	<meta property="og:title" content="" />
	<meta property="og:site_name" content="" />
	<meta property="og:description" content="" />
	<meta property="og:url" content="<?php echo URL_SITE; ?>" />
	<meta property="og:image" content="<?php echo URL_SITE; ?>/img/logos/partage.png" />
	<meta property="og:type" content="website" />
	<!-- Google Plus -->
	<meta itemprop="name" content="" />
	<meta itemprop="description" content="" />
	<meta itemprop="image" content="<?php echo RACINE_WEB; ?>img/logos/partage.png" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="" />
	<meta name="twitter:description" content="" />
	<meta name="twitter:site" content="@LilGast8" />
	<meta name="twitter:creator" content="@LilGast8" />
	<meta name="twitter:url" content="<?php echo RACINE_WEB; ?>" />
	<meta name="twitter:image" content="<?php echo RACINE_WEB; ?>/img/divers/twitter.jpg" />
	
	<link rel="shortcut icon" href="<?php echo RACINE_WEB; ?>img/logos/favicons/favicon.ico" />
	<link rel="apple-touch-icon" sizes="57x57" href="<?php echo RACINE_WEB; ?>img/logos/favicons/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo RACINE_WEB; ?>img/logos/favicons/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo RACINE_WEB; ?>img/logos/favicons/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="<?php echo RACINE_WEB; ?>img/logos/favicons/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="<?php echo RACINE_WEB; ?>img/logos/favicons/apple-touch-icon-60x60.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="<?php echo RACINE_WEB; ?>img/logos/favicons/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="<?php echo RACINE_WEB; ?>img/logos/favicons/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="<?php echo RACINE_WEB; ?>img/logos/favicons/apple-touch-icon-152x152.png" />
	<link rel="icon" type="image/png" href="<?php echo RACINE_WEB; ?>img/logos/favicons/favicon-196x196.png" sizes="196x196" />
	<link rel="icon" type="image/png" href="<?php echo RACINE_WEB; ?>img/logos/favicons/favicon-160x160.png" sizes="160x160" />
	<link rel="icon" type="image/png" href="<?php echo RACINE_WEB; ?>img/logos/favicons/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/png" href="<?php echo RACINE_WEB; ?>img/logos/favicons/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="<?php echo RACINE_WEB; ?>img/logos/favicons/favicon-16x16.png" sizes="16x16" />
	<meta name="msapplication-TileColor" content="#ffffff" />
	<meta name="msapplication-TileImage" content="<?php echo RACINE_WEB; ?>img/logos/favicons/mstile-144x144.png" />
	<meta name="msapplication-square70x70logo" content="<?php echo RACINE_WEB; ?>img/logos/favicons/mstile-70x70.png" />
	<meta name="msapplication-square144x144logo" content="<?php echo RACINE_WEB; ?>img/logos/favicons/mstile-144x144.png" />
	<meta name="msapplication-square150x150logo" content="<?php echo RACINE_WEB; ?>img/logos/favicons/mstile-150x150.png" />
	<meta name="msapplication-square310x310logo" content="<?php echo RACINE_WEB; ?>img/logos/favicons/mstile-310x310.png" />
	<meta name="msapplication-wide310x150logo" content="<?php echo RACINE_WEB; ?>img/logos/favicons/mstile-310x150.png" />
	
	<link media="screen" rel="stylesheet" type="text/css" href="<?php echo RACINE_WEB; ?>assets/css/styles.min.css" />
	
	<!--[if lt IE 9]><script src="<?php echo RACINE_WEB; ?>js/lib/html5shiv.js"></script><![endif]-->
	
	<?php if(!LOCALHOST && PROD) { ?>
	<!-- Google Analytics -->
	<script>
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-XXXX-XX']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
	<?php } ?>
</head>


<!--[if lt IE 7]> <body class="ie6 lt-ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 7]> <body class="ie7 lt-ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 8]> <body class="ie8 lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]> <body class="ie9 lt-ie10"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <body> <!--<![endif]-->



<!-- Main container -->
<div id="main-container">
	
	<!-- Loader -->
	<div id="loader">
		
	</div>
	
	<!-- Header -->
	<header id="header">
		
	</header>
	
	<!-- Page container -->
	<div id="page-container">
		