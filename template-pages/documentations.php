<?php

/*
  Template Name: Documentations
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;

  $context['documents'] = Timber::get_posts( array(
      'post_type' => 'documentation',
      'posts_per_page' => -1,
      'order' => 'ASC',
      'orderby' => 'title',
  ) );

  $context['doc_type'] = Timber::get_terms( array(
      'taxonomy' => 'type-de-document',
      'hide_empty' => true,
  ) );

  $context['materials'] = Timber::get_terms( array(
      'taxonomy' => 'materiau',
      'hide_empty' => true,
  ) );

 Timber::render( 'pages/documentations.twig', $context ); 