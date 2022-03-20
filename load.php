<?php

$filename = "image.txt";

if (file_exists($filename)){
    $file_contents = file_get_contents($filename);
    
    echo $file_contents;
}

?>