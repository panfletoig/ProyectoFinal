const axios = require('axios');

let parametros = []; //Parametros para las diferentes peticiones
let respuestaInfo;   //Regresa la respuesta de la primera petición
let arreglo = [];    //Los separa dejando un arreglo de 1dato por 1posicion
let oracion = "";    //Las palabras se guardan en una oracion
let header = [];

//colocamos los endpoints
let direccionVision = "https://serviciovisionnorte.cognitiveservices.azure.com";
let direccionTraduccion = "https://api.cognitive.microsofttranslator.com/"

//Parametros
parametros[0]="/vision/v3.2/ocr?language=es";
parametros[1]="detect?api-version=3.0";


//colocamos el url y headers
let url = {url:"https://ellapizrojo.files.wordpress.com/2014/12/01.jpg"};
header[0] = {
"Ocp-Apim-Subscription-Key":"9f8839e9bd4e446c8d1bfad49bd6db72",
"Content-Type":"application/json"};
header[1]={
    "Ocp-Apim-Subscription-Key":"58f9f4075c9c46bca61a78cfc71a45b6",
    "Ocp-Apim-Subscription-Region":"southcentralus",
    "Content-Type":"application/json"
};

//une el endpoint con los parametros
let vision = direccionVision+parametros[0];
let deteccion = direccionTraduccion+parametros[1];

//peticion post que transforma la imagen a texto
function textvision(callback)
{
    axios.post(vision,url,
        {
          headers:
            header[0]
        })
        .then(respuesta => {
            //busca los texts que son las palabras
            respuesta = respuesta.data.regions[0].lines;

            respuestaInfo = respuesta.map(item=>{
                return{
                    words: item.words
                }
            });
            

            callback(respuestaInfo);
        })
        .catch(error => {
            console.log(error)
        })
}

function deteccionT(oracion, callback)
{
    axios.post(deteccion, oracion,{
        headers: header[1]
    })
    .then(respuesta=>{
        callback(respuesta.data[0].language);
    })
    .catch(error=>{
        console.log(error);
    })
}

//llamamos a la peticion de text vision
textvision(respuesta=>{
    let guarda = [];  //Guarda palabra por palabra
    let contador = 0; //Para ir actualizando el arreglo guarda
    
    //va guardando 1 arreglo por cada lugar
    for (let i=0;i< respuesta.length;i++) 
    {
        arreglo.push(respuesta[i].words);
    }
    
    //esto guarda un arreglo con palabras
    for(let i=0;i<arreglo.length; i++)
    {
        for(let a=0;a<arreglo[i].length; a++)
        {
            guarda[contador] = arreglo[i][a].text;
            contador++;
        }
    }

    //concatena las palabras de guarda en una oracion
    for(let i=0; i<guarda.length;i++)
    {
        oracion = oracion.concat(" "+guarda[i]);
    }

    oracion = oracion.trimStart(); //corta el primer espacio

    oracion = [{"Text":oracion}]

    deteccionT(oracion, datos=>{
        console.log(datos)
    })
});