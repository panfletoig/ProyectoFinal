<?php
    require 'conexion.php';
    $imagen = "";
    if(isset($_FILES["imagen"])){
        $file = $_FILES["imagen"];
        $nombre = $file["name"];
        $tipo = $file["type"];
        $ruta_provisional = $file["tmp`_name"];
        $size = $file["size"]
        $dimensiones = getimagesize($ruta_provisional)
    }