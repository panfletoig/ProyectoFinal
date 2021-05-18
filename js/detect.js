window.onload = iniciar();

function iniciar(){
    alert(dUrl);

    let parametros = []; //Parametros para las diferentes peticiones
    let respuestaInfo;   //Regresa la respuesta de la primera petición
    let arreglo = [];    //Los separa dejando un arreglo de 1dato por 1posicion
    let oracion = "";    //Las palabras se guardan en una oracion
    let header = [];     //Guarda los diferentes headers
    
    let idioma = {
        afrikáans:"af", Albanés:"sq", Amárico:"am", Árabe:"ar",
        Armenio:"hy", Asamés:"as", Azerbaiyano:"az", Bengalí:"bn",
        "Bosnio (latino)":"bs", Búlgaro:"bg", "Cantonés (tradicional)":"yue", Catalán:"ca",
        "Chino simplificado":"zh-Hans", "Chino tradicional":"zh-Hant",
        Croata:"hr", Checo:"cs", Danés:"da", Dari:"prs",
        Neerlandés:"nl", Inglés:"en", Estonio:"et", Fiyiano:"fj",
        Filipino:"fil", Finés:"fi", Francés:"fr", "Francés (Canadá)":"fr-ca",
        Alemán:"de", Griego:"el", Gujarati:"gu", "Criollo haitiano":"ht",
        Hebreo:"he", Hindi:"hi", "Hmong Daw":"mww", Húngaro:"hu",
        Islandés:"is", Indonesio:"id", Inuktitut:"iu", Irlandés:"ga",
        Italiano:"it", Japonés:"ja", Canarés:"kn", Kazajo:"kk",
        Jemer:"km", Klingon:"tlh-Latn", "Klingon (plqaD)":"tlh-Piqd", "Maya Yucateco":"yua",
        Coreano:"ko", "Kurdo (central)":"ku", "Kurdo (norte)":"kmr", Lao:"lo",
        Letón:"lv", Lituano:"lt", Malgache:"mg", Malayo:"ms",
        Malayalam:"ml", Maltés:"mt", Maori:"mi", Maratí:"mr",
        Myanmar:"my", Nepalí:"ne", Noruego:"nb", Odia:"or",
        Pastún:"ps", Persa:"fa", Polaco:"pl", "Portugués (Brasil)":"pt",
        "Portugués (Portugal)":"pt-pt", Punjabi:"pa", "Otomí Querétaro":"otq", Rumano:"ro",
        Ruso:"ru", Samoano:"sm", "Serbio (cirílico)":"sr-Cyrl", "Serbio (latino)":"sr-Latn",
        Eslovaco:"sk", Esloveno:"sl", Español:"es", Swahili:"sw",
        Sueco:"sv", Tahitiano:"ty", Tamil:"ta", Telugu:"te",
        Tailandés:"th", Tigriña:"ti", Tongano:"to", Turco:"tr",
        Ucraniano:"uk", Urdu:"ur", Vietnamita:"vi", Galés:"cy"
    };

    let idiomaElegido;

    //colocamos los endpoints
    let direccionVision = "https://tpc.cognitiveservices.azure.com/";
    let direccionTraduccion = "https://api.cognitive.microsofttranslator.com/"
    
    //Parametros
    parametros[0]="vision/v3.2/ocr?language=es";
    parametros[1]="detect?api-version=3.0";
    parametros[2]="translate?api-version=3.0&from=";
    
    
    //colocamos el url y headers
    let url = {url: "http://imagetranslate.epizy.com/img/"+dUrl};
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
                console.log(error)
            })
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
            //traduccion a idima
            translate(traduccir, procceso =>{
                console.log(procceso);
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
            console.log(error.data);
        })
    }
}
