<?php

/*
  Template Name: Contact
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;

 Timber::render( 'pages/contact.twig', $context ); 