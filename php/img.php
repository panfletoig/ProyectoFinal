<?php
    $idiomas=$_REQUEST["idioma"];
    $nombre=$_FILES['imagen']['name'];
    $guardado=$_FILES['imagen']['tmp_name'];
    $size=$_FILES['imagen']['size'];
    $type=$_FILES['imagen']['type'];

    if($type=='image/jpg' || $type=='image/JPG' || $type=='image/jpeg'){
        if($size > 5*1024*1024){
            echo "Error: El archivo es demasiado grande soporto 5MB";
        }else{
            if(!file_exists('../img/')){
                mkdir('../img/',0777,true);
                if(file_exists('../img/')){
                    if(move_uploaded_file($guardado, "../img/".$nombre)){
                        echo "Archivo Guardado con exito";
                    }else{
                        echo "Archivo No se guardo :(";
                    }
                }
            }else{
                if(move_uploaded_file($guardado, "../img/".$nombre)){
                    echo "Archivo subio con exito :)";
                }else{
                    echo "Archivo no se guardo :( mision fallada con exito";
                }
            }
        }
    }else{
        echo "Error: Archivo no compatible :(";
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Prosesamiento</title>
</head>
<body>
    <header>
        <h1>UwU</h1>
    </header>
    <script>
        var dUrl = '<?php echo $nombre;?>';
        var Nidioma = '<?php echo $idiomas;?>';
        </script>
    <script src="../librerias/axios.min.js"></script>
    <script src="../js/detect.js"></script>
</body>
</html>
