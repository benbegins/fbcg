<?php

$context          = Timber::context();
$context['post'] = new Timber\Post();

// About page
$args = array(
    'post_type' => 'page',
    'meta_key' => '_wp_page_template',
    'meta_value' => 'template-pages/a-propos.php'
);
$about_page = get_pages($args)[0];
$context['about_page'] = get_permalink($about_page->ID);

// Page Nos produits
$args = array(
    'post_type' => 'page',
    'meta_key' => '_wp_page_template',
    'meta_value' => 'template-pages/nos-produits.php'
);
$products_page = get_pages($args)[0];
$context['products_page'] = get_permalink($products_page->ID);

Timber::render( 'pages/accueil.twig', $context );