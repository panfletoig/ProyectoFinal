const tieneSoporteUserMedia = () =>
    !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
const _getUserMedia = (...arguments) =>
    (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);

const $video = document.querySelector("#video"),
	$canvas = document.querySelector("#canvas"),
	$boton = document.querySelector("#boton"),
	$estado = document.querySelector("#estado"),
	$listaDeDispositivos = document.querySelector("#listaDeDispositivos");
const limpiarSelect = () => {
	for(let i=$listaDeDispositivos.options.length; i>=0; i--){
		$listaDeDispositivos.remove(i);
	};
};
const obtenerDispositivos = () => navigator.mediaDevices.enumerateDevices();

var comparafoto = 1;

const llenarDispositivos = () => {

	limpiarSelect();
	obtenerDispositivos()
	.then(dispositivos => {
		const dispositivosDeVideo = [];
		dispositivos.forEach(dispositivo=>{
			const tipo = dispositivo.kind;
			if(tipo === "videoinput"){
				dispositivosDeVideo.push(dispositivo);
			}
		});

		if(dispositivosDeVideo.length>0){
			dispositivosDeVideo.forEach(dispositivo=>{
				const option = document.createElement('option');
				option.value = dispositivo.deviceId;
				option.text = dispositivo.label;
				$listaDeDispositivos.appendChild(option);
			})
		}
	})
}
(function (){
	if(!tieneSoporteUserMedia()){
		alert("Sorry, your browser does not have camera support :(")
		$estado.innerHTML = "try to update or change browsers :)"
		return;
	}

	let stream;

	obtenerDispositivos()
	.then(dispositivos=>{
		const dispositivosDeVideo = [];

		dispositivos.forEach(function(dispositivo){
			const tipo = dispositivo.kind;
			if (tipo === "videoinput"){
				dispositivosDeVideo.push(dispositivo);
			}
		})

		if(dispositivosDeVideo.length>0){
			mostrarStream(dispositivosDeVideo[0].deviceId);
		}
	});

	const mostrarStream = idDeDispositivo =>{
		_getUserMedia(
			{
				video:{
					deviceId: idDeDispositivo
				}
			},
			(streamObtenido)=>{
				llenarDispositivos();

				$listaDeDispositivos.onchange = () =>{
					if(stream){
						stream.getTracks().forEach(function(track){
							track.stop();
						})
					}

					mostrarStream($listaDeDispositivos.value);
				}

				stream = streamObtenido;
				$video.srcObject = stream;
				$video.play();

				$boton.addEventListener("click",function(){
					$video.pause();

					let contexto = $canvas.getContext("2d");
					$canvas.width = video.videoWidth;
					$canvas.height = video.videoHeight;
					contexto.drawImage($video,0,0,$canvas.width, $canvas.height);

					var foto = $canvas.toDataURL();
					comparafoto = foto;
					let enlase = document.createElement('a');
					enlase.href = foto;
					enlase.click();

					console.log(foto);

					$video.play();
				})
			}, (error) =>{
				console.log("Permiso denegado o error: ",error);
				$estado.innerHTML = "I don't have permission, can't access your camera :( "
			}
		)
	}
})();

