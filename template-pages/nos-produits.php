<?php

/*
  Template Name: Nos produits
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;

 Timber::render( 'pages/nos-produits.twig', $context ); 