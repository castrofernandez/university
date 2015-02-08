
yepnope({
  load: ["js/auditoria/navegador.js",
		"js/auditoria/movimiento.js",
		"js/auditoria/prueba.js",
		"js/auditoria/auditoria.js",
		"js/xuegu/xuegu.js",
		"js/xuegu/manejadores.js",
		"js/xuegu/partida.js",
		"js/xuegu/elemento.js",
		"js/xuegu/elementoRotable.js",
		"js/xuegu/utilidades.js",
		"js/xuegu/graficos.js",
		"js/circo.js",
		"js/audio.js",
		"js/intermedios/util/boton.js",
		"js/intermedios/util/botones.js",
		"js/intermedios/util/instrucciones.js",
		"js/intermedios/botones1.js",
		"js/intermedios/botones2.js",
		"js/intermedios/botones3.js",
		"js/intermedios/botones4.js",
		"js/intermedios/botones5.js",
		"js/intermedios/botones6.js",
		"js/intermedios/acrobatas.js",
		"js/intermedios/instrucciones.js",
		"js/intermedios/fin.js",
		"js/intermedios/resultado1.js",
		"js/intermedios/resultado2.js",
    "js/intermedios/resultado3.js",
    "js/intermedios/resultado4.js",
		"js/intermedios/puntuacion.js",
		"js/juegos/numeros.js",
		"js/juegos/topos.js",
		"js/juegos/palabras.js",
		"js/juegos/fuego.js"],
  callback: cargaCompletada
});

var canvas = null;
var secuencia = null;
var indice = -1;
var idioma = null;

var LISTO_PARA_EJECUCION = false;

var auditoriaUsuario = null;

var sonido = new Audio("audio/presentacion.mp3");

sonido.addEventListener('ended', function() {
   	this.currentTime = 0;
   	this.play();
}, false);

sonido.play();

function cargaCompletada() {
	LISTO_PARA_EJECUCION = true;
	
	//establecerEnlacesRedesSociales();
}

DomReady.ready(function() {
                    idioma = new internacionalizacion.Idioma(internacionalizacion.etiquetas, "en", false);

                    establecerEtiquetas();

                    var botonComenzar = document.getElementById("comenzar")

                    if (botonComenzar)
                    	botonComenzar.onclick = comenzar;

                    	var identificador = "PLAYED";

                    	wesCountry.ajax.load({
                    	  url: "/played/" + identificador,
                   	  	 method: "GET",
                 	     content_type: "application/json",
                 	     callback: function(info) {
                    	  	info = JSON.parse(info);
                      
                      	  if (info.played) {
                      	  	if (botonComenzar) {
                      	      botonComenzar.disabled = true;
                     	      botonComenzar.className = "gracias"
                        	  botonComenzar.innerHTML = idioma.texto("gracias");
                        	}
                        	  
                        	}
                        	
                        	establecerEnlacesRedesSociales(info.id);
                      	}
                    	});
});

function establecerEtiquetas() {
  var elementos = document.querySelectorAll("[data-label]");
  var length = elementos.length;

  for (var i = 0; i < length; i++) {
    var elemento = elementos[i];
    var label = elemento.getAttribute("data-label");

    elemento.innerHTML = idioma.texto(label);
  }

  var elementos = document.querySelectorAll("[data-alt]");
  var length = elementos.length;

  for (var i = 0; i < length; i++) {
    var elemento = elementos[i];
    var alt = elemento.getAttribute("data-alt");

    elemento.setAttribute("alt", idioma.texto(alt));
  }

  var elementos = document.querySelectorAll("[data-title]");
  var length = elementos.length;

  for (var i = 0; i < length; i++) {
    var elemento = elementos[i];
    var title = elemento.getAttribute("data-title");

    elemento.setAttribute("title", idioma.texto(title));
  }
  
  /*
	esteblecerEtiqueta("presentacion-h", "presentacion");
	esteblecerEtiqueta("titulo1", "titulo1");
	esteblecerEtiqueta("titulo2", "titulo2");
	esteblecerEtiqueta("descubre-h", "descubre");
	esteblecerEtiqueta("comenzar", "comenzar");
	esteblecerEtiqueta("creado", "creado");
	esteblecerEtiqueta("gracias", "gracias");*/

	var gratis = document.getElementById("img_gratis")

	if (gratis) {
		gratis.src = idioma.texto("img_gratis");
		gratis.style.visibility = "visible";
	}

	var solo = document.getElementById("img_3minutos")

	if (solo) {
		solo.src = idioma.texto("img_3minutos");
		solo.style.visibility = "visible";
	}

	document.title = idioma.texto("titulo");
}
/*
function esteblecerEtiqueta(elementoDOM, contenido) {
	if (elementoDOM)
		elementoDOM.innerHTML = idioma.texto(contenido);
}
*/

function establecerEnlacesRedesSociales(from) {
	// Enlaces a redes sociales
  var parametros = getUrlParameters();
  var code = parametros.parameters["code"];
  
  if (!from) {
  	var from_u = parametros.parameters["from_u"];
  	var from_direct = "0";
  }
  else {
  	var from_u = from;
  	var from_direct = "1";
  }
  
  var parametros = code ? "?code=" + code : ""
  
  if (from_u) {
  	var separator = parametros != "" ? "&" : "?";
  	parametros += separator + "from_u=" + from_u;
  }
  
  if (from_direct) {
  	var separator = parametros != "" ? "&" : "?";
  	parametros += separator + "from_direct=" + from_direct;
  }

  // Twitter
  var elementos = document.querySelectorAll("[data-twitter]");
  var length = elementos.length;

  for (var i = 0; i < length; i++) {
    var elemento = elementos[i];
    var href = "http://twitter.com/share?url=" + encodeURIComponent("http://www.circoneuronal.org/" + parametros);
    var text = idioma.texto("descubre_twitter")

    elemento.setAttribute("href", href + "&text=" + text);
  }
  
  // Facebook
  var elementos = document.querySelectorAll("[data-facebook]");
  var length = elementos.length;

  for (var i = 0; i < length; i++) {
    var elemento = elementos[i];
    var href = "http://www.circoneuronal.org/" + parametros;

    //elemento.setAttribute("href", href);
    
    elemento.onclick = function(e) {
    	FB.ui({
  			method: 'feed',
  			link: href,
  			caption: idioma.texto("descubre_twitter"),
			}, function(response){});
			
			/*
		FB.ui({
 		method: 'share_open_graph',
  		action_type: 'og.likes',
  		action_properties: JSON.stringify({
      		object: href,
  		})
		}, function(response){});
*/
		return false;
    }
  }
}

function comenzar()
{
	while (!LISTO_PARA_EJECUCION);

	canvas = document.getElementById('canvas-juego');

  var dimensiones = xuegu.Utilidades.dimensionesPagina();

	if (categorizr.isMobile || categorizr.isTablet) {
		canvas.width = dimensiones.ancho;
		canvas.height = dimensiones.alto;

    document.getElementById('pie').style.display = 'none';

    var input = document.getElementById('input');

    document.body.innerHTML = '';
    document.body.appendChild(input);
    document.body.style.backgroundImage = 'url(../img/fondo.jpg)';
  }
  else {
		document.getElementById("inicio").style.display = 'none';
		document.getElementById("juego").style.display = 'block';

    // Ajustamos alto del canvas para evitar scroll

    var top = findPos(canvas).top;

    if (top + canvas.height > dimensiones.alto)
      canvas.height = dimensiones.alto - top;
	}

  auditoriaUsuario = new auditoria.Auditoria(canvas);

  // Scroll to top
  scroll(0, 0);

	if ((categorizr.isMobile || categorizr.isTablet) && window.innerWidth > window.innerHeight)
	{
		window.addEventListener("orientationchange", orientacion);

		var contexto = canvas.getContext('2d');

		contexto.textAlign = 'center';
		contexto.font = "16px Conv_Carnevalee Freakshow";
		contexto.fillStyle = '#333';
		contexto.fillText(idioma.texto("girar_dispositivo"), window.innerWidth / 2, window.innerHeight / 2);
	}
	else
		iniciarCirco();
}

function findPos(obj) {
	var curleft = curtop = 0;

  if (obj.offsetParent) {
    do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
    }
    while (obj = obj.offsetParent);
  }

  return {
      left: curleft,
      top: curtop
    };
}

function orientacion()
{
	if (window.innerHeight > window.innerWidth)
	{
		window.removeEventListener("orientationchange", orientacion);

		iniciarCirco();
	}
}

function iniciarCirco()
{
	// Paramos sonido
	sonido.pause();


	if (categorizr.isMobile || categorizr.isTablet)
	{
		var dimensiones = xuegu.Utilidades.dimensionesPagina();
		canvas.width = dimensiones.ancho;
		canvas.height = dimensiones.alto;
	}

	secuencia = [
					new circo.intermedios.Instrucciones(canvas, "instrucciones_1",
																"titulo_prueba_1",
																"nombre_prueba_1",
																"instrucciones_numeros",
																"img/instrucciones/numeros.png"),
					new circo.juegos.Numeros(canvas),
					new circo.intermedios.Puntuacion(canvas),

					new circo.intermedios.Botones4(canvas),

					new circo.intermedios.Instrucciones(canvas, "instrucciones_2",
																"titulo_prueba_2",
																"nombre_prueba_2",
																"instrucciones_topos",
															"img/instrucciones/topos.png"),
					new circo.juegos.Topos(canvas),
					new circo.intermedios.Puntuacion(canvas),

					new circo.intermedios.Botones4(canvas),

					new circo.intermedios.Instrucciones(canvas, "instrucciones_3",
																"titulo_prueba_3",
																"nombre_prueba_3",
																"instrucciones_palabras",
																"img/instrucciones/pato.png"),
					new circo.juegos.Palabras(canvas),
					new circo.intermedios.Puntuacion(canvas),

					new circo.intermedios.Botones4(canvas),
					new circo.intermedios.Acrobatas(canvas),

					/*
					new circo.intermedios.Instrucciones(canvas, "instrucciones_4",
																"titulo_prueba_4",
																"nombre_prueba_4",
																"instrucciones_fuego",
																"img/instrucciones/fuego.png"),

					new circo.juegos.Fuego(canvas), */
					new circo.intermedios.Resultado1(canvas),
					new circo.intermedios.Resultado2(canvas),
          new circo.intermedios.Resultado3(canvas),
          new circo.intermedios.Resultado4(canvas) //,
    
					//new circo.intermedios.Fin(canvas)
				];

	cambiarJuego();
}

var anterior = null;
var instante_global = new Date();

function cambiarJuego()
{
	if (circo.audio.circo)
		circo.audio.circo.pause();

	indice++;

  // Almacenar datos auditoria

  if (indice > 0) {
    var pruebas = auditoriaUsuario.data.tests;

    var data = {
      data: pruebas.length > 0 ? pruebas[0] : {}
    };

    data.user = auditoria.user;
    data.audit = auditoria.audit;

    wesCountry.ajax.load({
      url: auditoria.host + "/observations",
      parameters: JSON.stringify(data),
      method: "POST",
      content_type: "application/json",
      callback: function(info) {

      }
    });

    auditoriaUsuario.clear();
  }

	if (indice < secuencia.length)
	{
		var juego = secuencia[indice];

		var partida = new xuegu.Partida(canvas, juego, idioma, cambiarJuego, anterior, auditoriaUsuario, instante_global);
		partida.iniciar();

		anterior = partida;
	}
  else {
    var identificador = {
      identifier: "PLAYED"
    };

    wesCountry.ajax.load({
      url: auditoria.host + "/played",
      parameters: JSON.stringify(identificador),
      method: "POST",
      content_type: "application/json",
      callback: function(info) {
		info = JSON.parse(info);
		var id = info.id;
		var parametros = getUrlParameters();
  		var code = parametros.parameters["code"];
  		
  		var parametros = "?from_u=" + id + "&from_direct=1";
  		
  		if (code) 
  			parametros += "&code=" + code;
		
		window.location.href = "compartir.html" + parametros;
      }
    });
  }
}

function getUrlParameters() {
    var parameters = {};

    var url = document.URL;

    var queryString = url.split('?');

    var host = queryString[0];

    if (queryString.length > 1) {
      queryString = queryString[1];

      queryString = queryString.split('&');

      for (var i = 0; i < queryString.length; i++) {
        var parameter = queryString[i].split("=");

        var name = parameter[0];
        var value = parameter[1] ? parameter[1] : "";

        parameters[name] = value;
      }
    }

    return {
      host: host,
      parameters: parameters
    };
  }