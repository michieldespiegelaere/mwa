<?php
session_start();
include_once "HTMLkop.php";
include_once "showstuff.php";
showbaskethead();

if(!isset($_SESSION["packets"]))
{
    $_SESSION["packets"] = array();
    array_push($_SESSION["packets"], $_POST["koop"]);
}else{
    if($_POST["koop"] !== NULL)
    array_push($_SESSION["packets"], $_POST["koop"]);
}
var_dump($_SESSION["packets"]);

for($ordernr = 0; $ordernr < sizeof($_SESSION["packets"]); $ordernr++)
{
    echo "<p>".$_SESSION["packets"][$ordernr]."</p>";
}
showfooter();
include_once "HTMLstaart.php";
?>