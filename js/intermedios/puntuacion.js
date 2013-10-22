circo.intermedios.Puntuacion = function(canvas, anterior)
{		
	this.identificador = "puntuacion";
	this.imagenes = [];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;
	
	var boton = null;
	var pulsado = false;
	
	var textoPuntuacion = null;
	
	function botonPulsado()
	{
		pulsado = true;
	}

	this.iniciar = function(partida, partidaAnterior)
	{				
		var texto = partida.idioma.texto("aceptar");
		
		lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	
		margen = lienzo.ancho / 6;;
		dimensionesBoton = { ancho: (lienzo.ancho - 2 * margen), alto: (lienzo.ancho / 6) };
		var x = margen;
		var y = lienzo.alto / 2 - dimensionesBoton.alto / 2;
		
		var opciones = { partida: partida, ancho: dimensionesBoton.ancho, alto: dimensionesBoton.alto, relleno: '#c40038', 
						contorno: false, grosor: 3, texto: texto, colorTexto: '#fff', sombra: '#800226', identificador: "boton",
						tipo: "redondeado", x: x, y: y, onclick: botonPulsado };
							
		boton = new circo.intermedios.util.Boton(opciones);
		
		textoPuntuacion = partida.idioma.texto("pruebaFinalizada");
	}
		
	this.avanzar = function(partida)
	{	

	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos, idioma, partidaAnterior)
	{
		if (partidaAnterior)
			for (var i = 0; i < partidaAnterior.elementos.length; i++)
				partidaAnterior.elementos[i].dibujar(contexto, ancho, alto, partidaAnterior.graficos(), idioma);
	
		if (partidaAnterior && partidaAnterior.dibujar)
			partidaAnterior.dibujar(contexto, ancho, alto, partidaAnterior.graficos(), idioma);
		
		// Fondo
		contexto.globalAlpha = 0.8;
		xuegu.Graficos.rectangulo(contexto, 0, 0, ancho, alto, '#333');
		
		contexto.globalAlpha = 1;
			
		contexto.fillStyle = '#fff';
		contexto.fillText(textoPuntuacion, ancho / 2, alto / 6);

		boton.dibujar(contexto, ancho, alto, graficos);
	}
	
	this.finalizado = function()
	{
		return pulsado;
	}
}