<?php

/*
  Template Name: Contact
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;

 $context['logo_blue'] = true;

 Timber::render( 'pages/contact.twig', $context ); 