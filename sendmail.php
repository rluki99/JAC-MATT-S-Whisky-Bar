<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
// require '../PHPMailer/src/Exception.php';
// require '../PHPMailer/src/PHPMailer.php';
// require '../PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'somekindofemail@gmail.com';
    $mail->Password = 'somekindofrandomgooglegeneratedpassword';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('somekindofemail@gmail.com', 'Formularz kontaktowy');
    $mail->addAddress('somekindofemail@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = 'Nowa wiadomosc z formularza kontaktowego - Whisky Bar (' . $_POST['mail'] . ')';
    $mail->Body = 'Imię: ' . $_POST['imie'] . '<br>' .
                  'E-mail: ' . $_POST['mail'] . '<br>' .
                  'Telefon: ' . $_POST['telefon'] . '<br>' .
                  'Termin imprezy: ' . $_POST['data'] . '<br>' .
                  'Miejsce imprezy: ' . $_POST['miejsce'] . '<br>' .
                  'Informacje o przyjęciu: ' . $_POST['dodatkowe'];

    $mail->send();
    header("Location: success");
} catch (Exception $e) {
    echo 'Wiadomość nie mogła zostać wysłana. Mailer Error: ', $mail->ErrorInfo;
}
?>