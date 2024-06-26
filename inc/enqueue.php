<?php

if ( ! function_exists( 'bemy_scripts' ) ) {
	function bemy_scripts() {

		wp_deregister_script( 'jquery' );

		// Style
		wp_enqueue_style( 'bemy-css', get_template_directory_uri() . '/dist/style.css', array(), wp_get_theme()->get( 'Version' ) );

		// Axios
		wp_enqueue_script( 'axios', "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", array(), false, true );
		
		// Main JS Script
		wp_enqueue_script( 'bemy-script', get_template_directory_uri() . '/dist/bemy.umd.js', array('axios'), wp_get_theme()->get( 'Version' ), true );

		// Remove gutenberg css
		wp_dequeue_style( 'wp-block-library' );

		// Remove wp-embed script
		wp_deregister_script( 'wp-embed' );

		// Google Fonts
		wp_enqueue_style( 'bemy-google-fonts', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;800&display=swap', false );

		// Google recapcha
		if ( is_page( 'contact' ) ) {
			wp_enqueue_script( 'bemy-google-recaptcha', 'https://www.google.com/recaptcha/api.js?render=6LcDsFEpAAAAALYFPI2wOtGraR1_VdGg199hCQIH', array(), false, true );
		}
	}
}
add_action( 'wp_enqueue_scripts', 'bemy_scripts' );



if ( ! function_exists( 'bemy_disable_emoji_feature' ) ) {
	function bemy_disable_emoji_feature() {

		// Prevent Emoji from loading on the front-end
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );

		// Remove from admin area also
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );

		// Remove from RSS feeds also
		remove_filter( 'the_content_feed', 'wp_staticize_emoji');
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji');

		// Remove from Embeds
		remove_filter( 'embed_head', 'print_emoji_detection_script' );

		// Remove from emails
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

		// Disable from TinyMCE editor. Currently disabled in block editor by default
		add_filter( 'tiny_mce_plugins', 'bemy_disable_emojis_tinymce' );

		/** Finally, prevent character conversion too
			 ** without this, emojis still work
			** if it is available on the user's device
		*/

		add_filter( 'option_use_smilies', '__return_false' );

	}
}

if ( ! function_exists( 'bemy_disable_emojis_tinymce' ) ) {

	function bemy_disable_emojis_tinymce( $plugins ) {
		if( is_array($plugins) ) {
			$plugins = array_diff( $plugins, array( 'wpemoji' ) );
		}
		return $plugins;
	}
}

add_action('init', 'bemy_disable_emoji_feature');



// Google Analytics & Google Tag Manager
if ( ! function_exists( 'bemy_google_analytics' ) ) {
	function bemy_google_analytics() {
		?>
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXR6G4QS0H"></script>
		<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-XXR6G4QS0H');
		</script>

		<!-- Google Tag Manager -->
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-WKFCF8R4');</script>
		<!-- End Google Tag Manager -->
		<?php
	}
}
add_action( 'wp_head', 'bemy_google_analytics' );

// Google Tag Manager (noscript)
if ( ! function_exists( 'bemy_google_tag_manager' ) ) {
	function bemy_google_tag_manager() {
		?>
		<!-- Google Tag Manager (noscript) -->
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKFCF8R4"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<!-- End Google Tag Manager (noscript) -->
		<?php
	}
}
add_action( 'wp_body_open', 'bemy_google_tag_manager' );