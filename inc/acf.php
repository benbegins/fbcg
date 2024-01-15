<?php

add_filter( 'acf/fields/post_object/query/name=product_document', 'bemy_doc_selection_choices', 10, 3 );

function bemy_doc_selection_choices($args, $field, $post_id) {
//    get object with taxonomy 'type-de-document' = 'aluminium'
    $args['tax_query'] = array(
        array(
            'taxonomy' => 'type-de-document',
            'field' => 'slug',
            'terms' => 'brochure'
        )
    );
    return $args;
}