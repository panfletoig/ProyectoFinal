<?php
    $idiomas=$_REQUEST["idioma"];
    $nombre=$_FILES['imagen']['name'];
    $guardado=$_FILES['imagen']['tmp_name'];
    $type=$_FILES['imagen']['type'];

    if($type=='image/jpg' || $type=='image/JPG' || $type=='image/jpeg'){

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
            }
        }
        
    }else{
        $error = "Error: Archivo no compatible :(";
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Prosesamiento</title>
    <link rel="icon" href="https://images.emojiterra.com/google/android-11/512px/1f9e0.png">
    <link rel="stylesheet" href="https://imagetranslate.epizy.com/css/fuentes.css">
    <link rel="stylesheet" href="https://imagetranslate.epizy.com/css/estilo.css">
</head>
<body>
    <style>
        @import url(https://fonts.googleapis.com/css?family=KoHo:200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic);
        @import url(https://fonts.googleapis.com/css?family=Rubik:300,regular,500,600,700,800,900,300italic,italic,500italic,600italic,700italic,800italic,900italic);
        
        *{
            font-family: Rubik;
            font-size: 1.8vw;
            margin: 0px;
            padding: 0px;
            text-decoration: none;
        }
        body{
            background:#ededed;
        }
        header h1{
            font-family: "KoHo";
            font-size: 4vw;
            background: black;
            color: #ededed;
            text-align: center;
            width: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        header{
            width: 100%;
            text-align: center;
        }
        #espera{
            font-family: Rubik;
            font-size: 2.5vw;
            background-color: rgb(12, 14, 44);
            color: #ededed;
            text-align: center;
            margin-top: 0.5em;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        #uno{
            padding-top: 10px;
            text-align: center;
            color: #ededed;
            padding-top: 1vw;
            background-color: rgb(5, 44, 58);
            padding-bottom: 1vw;
        }
        footer{
            color: #ededed;
            text-align: center;
            bottom: 0;
            position: sticky;
            padding-bottom: 1vw;
            padding-top: 1vw;
            width: 100%;
            margin-top: 10vw;
            background-color: rgb(12, 14, 44);
        }
    </style>
    <header>
        <a href="https://imagetranslate.azurewebsites.net/">
            <h1>Image Translate</h1>
        </a>
    </header>
    <main>
        <section>
            <p id="espera">
                Espera. . .
            </p>
        </section>
        <section>
            <script>
                var dUrl = '<?php echo $nombre;?>';
                var Nidioma = '<?php echo $idiomas;?>';
            </script>
            <script src="../librerias/axios.min.js"></script>
            <script src="../js/detect.js"></script>
            <div id="uno">
            </div>
            <footer>
                <a href="https://imagetranslate.azurewebsites.net/">Regresar al inicio</a>
            </footer>
        </section>
    </main>
</body>
</html>
