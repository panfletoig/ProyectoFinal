<?php
    $nombre=$_FILES['archivo']['name'];
    $guardado=$_FILES['archivo']['tmp_name'];

    if(!file_exists('img')){
        mkdir('img',0777,true);
        if(file_exists('img')){
            if(move_uploaded_file($guardado, "img".$nombre)){
                echo "Archivo Guardado con exito";
            }else{
                echo "Archivo No se guardo :(";
            }
        }
    }
    else
    {
        if(move_uploaded_file($guardado, "img".$nombre)){
            echo "Archivo Guardado con exito";
        }else{
            echo "Archivo No se guardo :(";
        }
    }
?>