<?php
$context = Timber::context();
$context['post'] = new Timber\Term();

$args = array(
    'post_type' => 'produit',
    'tax_query' => array(
        array(
            'taxonomy' => 'type-de-produit',
            'field' => 'slug',
            'terms' => $context['post']->slug,
        ),
    ),
    'orderby' => 'ID',
    'order' => 'ASC',
);

$context['products_list'] = new Timber\PostQuery($args);

Timber::render( 'pages/type-de-produit.twig', $context );