<?php
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
                    echo "Archivo se subio con exito";
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
    <meta charset="UTF-8">
    <title>Prosesamiento</title>
</head>
<body>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <header>
        <h1>Espera . . .</h1>
    </header>
    <script>
        var direccionUrl = '<?php echo $nombre;?>';
    </script>
    <script src="../js/detect.js"></script>
</body>
</html>
