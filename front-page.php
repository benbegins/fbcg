<?php

$context          = Timber::context();
$context['post'] = new Timber\Post();

Timber::render( 'pages/accueil.twig', $context );