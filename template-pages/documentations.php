<?php

/*
  Template Name: Documentations
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;

 Timber::render( 'pages/documentations.twig', $context ); 