
/*
importame.cargarSecuencialmente(["xuegu/xuegu.js", 
					"xuegu/manejadores.js",
					"xuegu/partida.js", 
					"xuegu/elemento.js", 
					"xuegu/utilidades.js",
					"xuegu/graficos.js", 
					"circo.js", 
					"intermedios/util/boton.js",
					"intermedios/util/botones.js",
					"intermedios/util/instrucciones.js",
					"intermedios/botones1.js",
					"intermedios/botones2.js",
					"intermedios/botones3.js",
					"intermedios/botones4.js",
					"intermedios/botones5.js",
					"intermedios/botones6.js",
					"intermedios/acrobatas.js",
					"intermedios/instrucciones.js",
					"juegos/numeros.js"], cargaCompletada);
*/

/*
yepnope({
  test: categorizr.isMobile,
  yep: 'css/movil.css',
  nope: 'css/estilo.css'
});
*/

yepnope({
  load: ["js/xuegu/xuegu.js", 
		"js/xuegu/manejadores.js",
		"js/xuegu/partida.js", 
		"js/xuegu/elemento.js", 
		"js/xuegu/utilidades.js",
		"js/xuegu/graficos.js", 
		"js/circo.js", 
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
		"js/intermedios/puntuacion.js",
		"js/juegos/numeros.js",
		"js/juegos/topos.js"],
  callback: cargaCompletada
});

var canvas = null;
var secuencia = null;
var indice = -1;
var idioma = null;

var LISTO_PARA_EJECUCION = false;

function cargaCompletada() {
	LISTO_PARA_EJECUCION = true;
}

DomReady.ready(function() {
                    document.getElementById("comenzar").onclick = comenzar;
                    
                    idioma = new internacionalizacion.Idioma(internacionalizacion.etiquetas, "en", "en");
                    
                    establecerEtiquetas();
                });

function establecerEtiquetas() {
	esteblecerEtiqueta("presentacion-h", "presentacion");
	esteblecerEtiqueta("titulo1", "titulo1");
	esteblecerEtiqueta("titulo2", "titulo2");
	esteblecerEtiqueta("descubre-h", "descubre");
	esteblecerEtiqueta("comenzar", "comenzar");
	esteblecerEtiqueta("creado", "creado");
	
	var gratis = document.getElementById("img_gratis")
	gratis.src = idioma.texto("img_gratis");
	gratis.style.visibility = "visible";

	var solo = document.getElementById("img_3minutos")
	solo.src = idioma.texto("img_3minutos");
	solo.style.visibility = "visible";
	
	document.title = idioma.texto("titulo");
}

function esteblecerEtiqueta(elemento, contenido) {
	document.getElementById(elemento).innerHTML = idioma.texto(contenido);
}

function comenzar() 
{
	while (!LISTO_PARA_EJECUCION);

	canvas = document.getElementById('canvas-juego');

	if (categorizr.isMobile || categorizr.isTablet){
    	
    	var dimensiones = xuegu.Utilidades.dimensionesPagina();

		canvas.width = dimensiones.ancho;
		canvas.height = dimensiones.alto;
    		
    	document.getElementById('pie').style.display = 'none';
    	
    	document.body.innerHTML = '';
    	document.body.appendChild(canvas);
    }
    else {
		document.getElementById("inicio").style.display = 'none';
		document.getElementById("juego").style.display = 'block';
	}

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
	if (categorizr.isMobile || categorizr.isTablet)
	{
		var dimensiones = xuegu.Utilidades.dimensionesPagina();
		canvas.width = dimensiones.ancho;
		canvas.height = dimensiones.alto;
	}

	secuencia = [
					new circo.intermedios.Instrucciones(canvas, "titulo_prueba_1", 
																"nombre_prueba_1", 
																"instrucciones_numeros", 
																"img/instrucciones/numeros.png"),
					new circo.juegos.Numeros(canvas),
					new circo.intermedios.Puntuacion(canvas),
					
					new circo.intermedios.Botones5(canvas),
					
					new circo.intermedios.Instrucciones(canvas, "titulo_prueba_2", 
																"nombre_prueba_2", 
																"instrucciones_topos", 
																"img/instrucciones/topos.png"),
					new circo.juegos.Topos(canvas),
					new circo.intermedios.Puntuacion(canvas),
					
					new circo.intermedios.Botones6(canvas),
					new circo.intermedios.Botones1(canvas),
					new circo.intermedios.Botones2(canvas),
					new circo.intermedios.Botones3(canvas),
					new circo.intermedios.Botones4(canvas),
					new circo.intermedios.Acrobatas(canvas),
					new circo.intermedios.Fin(canvas)
				];

	cambiarJuego();
}

var anterior = null;

function cambiarJuego()
{
	indice++;
	
	if (indice < secuencia.length)
	{
		var juego = secuencia[indice];

		var partida = new xuegu.Partida(canvas, juego, idioma, cambiarJuego, anterior);
		partida.iniciar();
		
		anterior = partida;
	}
}


/*
function iniciar_circo()
{
	var idioma = new xuegu.Idioma(circo.etiquetas, "en");
	
	var juego_numeros = new circo.juegos.Numeros();
	var canvas = document.getElementById('canvas-juego');
	var partida = new xuegu.Partida(canvas, juego_numeros);
	
	partida.iniciar();

}
*/
