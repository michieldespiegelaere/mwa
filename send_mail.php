<?php
include_once "HTMLkop.php";
include_once "showstuff.php";
showcontacthead();
$_SESSION['firstname'] = $_POST['voornaam'];
$_SESSION['lastname'] = $_POST['achternaam'];
$_SESSION['email'] = $_POST['email'];
$_SESSION['phone'] = $_POST['phone'];
$_SESSION['question'] = $_POST['question'];
$_SESSION['subject'] = $_POST['subject'];
$_SESSION['message'] = $_POST['message'];

$mailto = 'michiel.despiegelaere@gmail.com';
//var_dump($mailto);

$firstname = $_SESSION['firstname'];
$lastname = $_SESSION['lastname'];
$email = $_SESSION['email'];
$phone = $_SESSION['phone'];
$question = $_SESSION['question'];
$subject = $_SESSION['subject'];
$message = $_SESSION['message'];


$mailSub = $question;
$mailMsg = 'Voornaam: ' . $firstname . ' ';
$mailMsg .= 'Achternaam: ' . $lastname . ' ';
$mailMsg .= 'Email: ' . $email . ' ';
$mailMsg .= 'Telefoon: ' . $phone . ' ';
$mailMsg .= 'Vraag: ' . $question . ' ';
$mailMsg .= 'Onderwerp: ' . $subject . ' ';
$mailMsg .= 'Bericht: ' . $message;
require 'PHPMailer-master/PHPMailerAutoload.php';
$mail = new PHPMailer();
$mail->IsSmtp();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "michiel.despiegelaere@gmail.com";
$mail->Password = "emmamini";
$mail->SetFrom($email);
$mail->Subject = $mailSub;
$mail->Body = $mailMsg;
$mail->AddAddress($mailto);

if (!$mail->Send()) {
    echo "<h2 id='contacttext'>Uw bericht is niet verzonden, probeer het later opnieuw.</h2>";
    header('refresh: 3;url=contact.php');
} else {
    echo "<h2 id='contacttext'>Uw bericht is verzonden.</h2>";
    header('refresh: 3,url=contact.php');
}
?>
<footer class="page-footer teal" style="position: absolute; bottom: 0; left: 0; right: 0;">
    <div class="footer-copyright">
        <div class="container">
            <p> &copy; 2017-2018 Alle rechten voorbehouden<br>
            </p>
        </div>
    </div>
</footer>
<?php
include_once 'HTMLstaart.php'
?>





   

