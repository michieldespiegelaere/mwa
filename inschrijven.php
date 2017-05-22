<?php
include_once "HTMLkop.php";
include_once "showstuff.php";
include_once "Config.php";
include_once "database.php";
showshophead();
$database = Boteljon::getUserInstance(Config::getConfigInstantie()->getServer(),
        Config::getConfigInstantie()->getUsername(),
        Config::getConfigInstantie()->getPassword(),
        Config::getConfigInstantie()->getDatabase());
function showPackets($database)
{
    echo "<h2 id=contacttext>Kies hieronder het pakket dat het best bij u past</h2>";
    $packet = "<div class='container'><div class='section'><div class='row center'>";
    $packets = $database->getPackets();
    for ($packetnr = 0; $packetnr < sizeof($packets); $packetnr++)
    {
        $packet .= "<form method='post' action='winkelmandje.php' class='border'><div class='col s12 m3'>
        <h2 class='monthtext'>".$packets[$packetnr]->number_of_months." month(s)</h2></hr>
        <h2 class='monthtext'>&#8364;".$packets[$packetnr]->price_per_month."/maand</h2>
        <p class='light info'>".$packets[$packetnr]->packet_info."</p>
        <button type='submit' id='download-button' name='koop' class='btn-large waves-effect waves-light teal lighten-1' value='".$packets[$packetnr]->packet_id."'>koop nu</button>
        </div></form>";
    }
    $packet .= "</div></div></div>";
    echo $packet;
}

showPackets($database);
showfooter();
include_once "HTMLstaart.php";
?>