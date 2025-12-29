<?php

// Falls kein POST: abbrechen
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    exit();
}

// Felder prüfen
if (
    empty($_POST['name']) ||
    empty($_POST['subject']) ||
    empty($_POST['message']) ||
    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
    http_response_code(400); // Bad Request
    exit("Invalid input");
}

// Werte bereinigen
$name     = strip_tags(trim($_POST['name']));
$email    = strip_tags(trim($_POST['email']));
$m_subject= strip_tags(trim($_POST['subject']));
$message  = strip_tags(trim($_POST['message']));

// >>> HIER DEINE ZIEL-ADRESSE EINTRAGEN <<<
$to = "kontakt@deine-domain.de";  // z.B. kontakt@georgia-koenig.de

// >>> HIER EINEN GÜLTIGEN ABSENDER EINTRAGEN (muss zu deiner Domain gehören!) <<<
$fromEmail = "webseite@deine-domain.de"; // z.B. webseite@georgia-koenig.de

$subject = "$m_subject: $name";

$body  = "Du hast eine neue Nachricht über das Kontaktformular erhalten.\n\n";
$body .= "Name:    $name\n";
$body .= "E-Mail:  $email\n";
$body .= "Betreff: $m_subject\n\n";
$body .= "Nachricht:\n$message\n";

$headers  = "From: Georgia König <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Versenden
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo "OK";
} else {
    http_response_code(500);
    echo "MAIL_ERROR";
}
?>
