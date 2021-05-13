const axios = require('axios');

let parametros = [];
let respuestaInfo;
let arreglo = [];
let oracion = "";

//colocamos el endpoint
let direccion = "https://serviciovisionnorte.cognitiveservices.azure.com";
parametros[0]="/vision/v3.2/ocr?language=es";

//colocamos el url y headers
let url = {url:"https://ellapizrojo.files.wordpress.com/2014/12/01.jpg"};
let header = {
"Ocp-Apim-Subscription-Key":"9f8839e9bd4e446c8d1bfad49bd6db72",
"Content-Type":"application/json"};

//une el endpoint con los parametros
let vision = direccion+parametros[0];

//peticion que transforma la imagen a texto
function textvision(callback)
{
    axios.post(vision,url,
        {
          headers:
            header
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

//llamamos a la peticion de text vision
textvision(respuesta=>{
    let guarda = []; 
    let contador = 0;
    
    //esto separa arreglos
    for (let i=0;i< respuesta.length;i++) 
    {
        arreglo.push(respuesta[i].words);
    }
    
    //esto guarda un arreglo con palabras
    for(let i=0;i<arreglo.length; i++)
    {
        for(let a=0;a<arreglo[i].length; a++)
        {
            guarda[contador] = arreglo[i][a].text
            contador++;
        }
    }

    //forma una oracion
    for(let i=0; i<guarda.length;i++)
    {
        oracion = oracion.concat(" "+guarda[i]);
    }
    oracion = oracion.trimStart();

    console.log(oracion);
})