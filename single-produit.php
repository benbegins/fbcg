<?php
$context = Timber::context();
$timber_post = new Timber\Post();

$context['post'] = $timber_post;

// Page Nos produits
$args = array(
    'post_type' => 'page',
    'meta_key' => '_wp_page_template',
    'meta_value' => 'template-pages/nos-produits.php'
);
$products_page = get_pages($args)[0];
$context['products_page'] = get_permalink($products_page->ID);

// Page documentations
$args = array(
    'post_type' => 'page',
    'meta_key' => '_wp_page_template',
    'meta_value' => 'template-pages/documentations.php'
);
$documentations_page = get_pages($args)[0];
$context['documentations_page'] = get_permalink($documentations_page->ID);

$context['logo_blue'] = true;

Timber::render( 'pages/single-product.twig', $context );