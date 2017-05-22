<?php
include_once "HTMLkop.php";
include_once "showstuff.php";
include_once "Config.php";
include_once "database.php";
$database = Boteljon::getUserInstance(Config::getConfigInstantie()->getServer(),
    Config::getConfigInstantie()->getUsername(),
    Config::getConfigInstantie()->getPassword(),
    Config::getConfigInstantie()->getDatabase());
showkalenderhead();
function getfest($database){
    $card = "<div class='container'><div class'section'>";
    $festivals = $database->getFestivals();
    for ($festivalnr = 0; $festivalnr < sizeof($festivals); $festivalnr++){
        $card .= "<div class='row'>
        <div class='col s12 m7'>
          <div class='card'>
            <div class='card-image'>
              <img src='".$festivals[$festivalnr]->festival_picture."'>
            </div>
            <div class='card-content'>
              <p>Naam: ".$festivals[$festivalnr]->festival_name."</p></br><p>Datum: "
              .$festivals[$festivalnr]->festival_date."</p></br><p>Adres: "
              .$festivals[$festivalnr]->festival_adress."</p></br>
            </div>
            <div class='card-action'>
              <a href='".$festivals[$festivalnr]->festival_website."'>Bekijk de website</a>
            </div>
          </div>
        </div>
      </div>";
    }
    $card .= "</div></div>";
    echo $card;
}
getfest($database);
showfooter();
include_once "HTMLstaart.php";S
?>