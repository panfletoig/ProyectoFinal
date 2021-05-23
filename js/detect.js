window.onload = iniciar();

function iniciar(){
    let parametros = []; //Parametros para las diferentes peticiones
    let respuestaInfo;   //Regresa la respuesta de la primera petición
    let arreglo = [];    //Los separa dejando un arreglo de 1dato por 1posicion
    let oracion = "";    //Las palabras se guardan en una oracion
    let header = [];     //Guarda los diferentes headers

    const idioma = {
        1:"af", 2:"sq", 3:"am", 4:"ar",
        5:"hy", 6:"as", 7:"az", 8:"bn",
        9:"bs", 10:"bg", 11:"yue", 12:"ca",
        13:"zh-Hans", 14:"zh-Hant", 15:"hr", 16:"cs", 
        17:"da", 18:"prs", 19:"nl", 20:"en", 
        21:"et", 22:"fj", 23:"fil", 24:"fi", 
        25:"fr", 26:"fr-ca", 27:"de", 28:"el",
        29:"gu", 30:"ht", 31:"he", 32:"hi", 
        33:"mww", 34:"hu", 35:"is", 36:"id", 
        37:"iu", 38:"ga", 39:"it", 40:"ja", 
        41:"kn", 42:"kk", 43:"km", 44:"tlh-Latn", 
        45:"tlh-Piqd", 46:"ko", 47:"ku", 48:"kmr", 
        49:"lo", 50:"lv", 51:"lt", 52:"mg", 
        53:"ms", 54:"ml", 55:"mt", 56:"mi", 
        57:"mr", 58:"my", 59:"ne", 60:"nb", 
        61:"or", 62:"ps", 63:"fa", 64:"pl", 
        65:"pt", 66:"pt-pt", 67:"pa", 68:"otq", 
        69:"ro", 70:"ru", 71:"sm", 72:"sr-Cyrl", 
        73:"sr-Latn", 74:"sk", 75:"sl", 76:"es",
        77:"sw", 78:"sv", 79:"ty", 80:"ta", 
        81:"te", 82:"th", 83:"ti", 84:"to", 
        85:"tr", 86:"uk", 87:"ur", 88:"vi", 
        89:"cy", 90:"yua"
    };
    let idiomaElegido = idioma[Nidioma]

    //colocamos los endpoints
    let direccionVision = "https://tpc.cognitiveservices.azure.com/";
    let direccionTraduccion = "https://api.cognitive.microsofttranslator.com/"
    
    //Parametros
    parametros[0]="vision/v3.2/ocr?language=es";
    parametros[1]="detect?api-version=3.0";
    parametros[2]="translate?api-version=3.0&from=";
    
    
    //colocamos el url y headers
    let url = {"url": "https://imagetranslate.azurewebsites.net/img/"+dUrl};
    
    header[0] = {
    "Ocp-Apim-Subscription-Key":"945a6c1958534f69bdbfe112459fd8b1",
    "Content-Type":"application/json"
    };
    header[1]={
        "Ocp-Apim-Subscription-Key":"7fb8b8b2ea394ca5913d87cd43f1059b",
        "Ocp-Apim-Subscription-Region":"southcentralus",
        "Content-Type":"application/json"
    };
    
    //une el endpoint con los parametros
    let vision = direccionVision+parametros[0];
    let deteccion = direccionTraduccion+parametros[1];
    let traduccion = direccionTraduccion+parametros[2];
    
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
                console.log(error);
            }
        )
    }
    
    //Detecta el idioma
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
    
        oracion = [{"Text":oracion}];   
    
        //pericion deteccion de idioma
        deteccionT(oracion, traduccir=>{
            //traduccion a idioma
            translate(traduccir, procceso =>{
                document.getElementById('uno').innerHTML=procceso;
                document.getElementById('espera').innerHTML="Traducción";
            })
        })
    });
    
    function translate(traduccir, callback)
    {
        traduccion = traduccion+traduccir+"&to="+idiomaElegido;//concatenamos la dirreccion
    
        axios.post(traduccion,oracion, {
            headers:header[1]
        })
        .then(respuesta=>{
            callback(respuesta.data[0].translations[0].text);
        })
        .catch(error => {
            console.log(error);
        })
    }
}