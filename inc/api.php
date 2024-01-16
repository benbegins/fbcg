<?php
// acf_to_rest_api : Enable the option show in rest
add_filter( 'acf/rest_api/field_settings/show_in_rest', '__return_true' );


add_action('rest_api_init', function () {
    register_rest_route( 'bemy/v1', '/contact', array(
        'methods' => 'POST',
        'args' => [
            'firstname' => [
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ],
            'lastname' => [
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ],
            'company' => [
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ],
            'email' => [
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ],
            'city' => [
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ],
            'zipcode' => [
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ],
            'phone' => [
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ],
            'message' => [
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return !empty( $param );
                }
            ],
        ],
        'callback' => 'bemy_contact_form',
    ));
});

function bemy_contact_form($request) {
    $data = $request->get_params();

    // Sanitize data
    $firstname = sanitize_text_field( $data['firstname'] );
    $lastname = sanitize_text_field( $data['lastname'] );
    $company = sanitize_text_field( $data['company'] );
    $email = sanitize_email( $data['email'] );
    $city = sanitize_text_field( $data['city'] );
    $zipcode = sanitize_text_field( $data['zipcode'] );
    $phone = sanitize_text_field( $data['phone'] );
    $message = sanitize_textarea_field( $data['message'] );

    // Get the email address from the options page
    $email_fbcg = get_field('contact_infos', 'options')['email'];

    $to = 'benoit.beghyn@gmail.com';
    // $to = $email_fbcg;
    
    $subject = 'Nouveau message de ' . $firstname . ' ' . $lastname . ' depuis le site FBCG';

    $headers = array(
        'From: ' . $firstname . ' ' . $lastname . ' <' . $email . '>',
        'Reply-To: ' . $firstname . ' ' . $lastname . ' <' . $email . '>',
        'Content-Type: text/html; charset=UTF-8'
    );

    $body = '<html><body>';
    $body .= '<h1>Nouveau message de ' . $firstname . ' ' . $lastname . ' depuis le site FBCG</h1>';
    $body .= '<p><strong>Nom :</strong> ' . $firstname . ' ' . $lastname . '</p>';
    $body .= '<p><strong>Société :</strong> ' . $company . '</p>';
    $body .= '<p><strong>Email :</strong> ' . $email . '</p>';
    $body .= '<p><strong>Ville :</strong> ' . $city . '</p>';
    $body .= '<p><strong>Code postal :</strong> ' . $zipcode . '</p>';
    $body .= '<p><strong>Téléphone :</strong> ' . $phone . '</p>';
    $body .= '<p><strong>Message :</strong> ' . $message . '</p>';
    $body .= '</body></html>';

    wp_mail( $to, $subject, $body, $headers );

    return new WP_REST_Response( array( 'success' => true, 'message' => 'Votre message a bien été envoyé.' ), 200 );

}