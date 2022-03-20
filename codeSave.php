<?php
// header('Content-Type: text/html; charset=utf-8');

if (isset($_POST['monCode'])){
    $zone_dessin = $_POST['monCode'];
    echo "reponse de $zone_dessin ";
    file_put_contents("image.txt",$zone_dessin);

}
?>