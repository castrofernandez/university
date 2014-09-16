circo.intermedios.util.Instrucciones = function(canvas, titulo, subtitulo, texto, imagen)
{
	var dimensionesImagen = null;
	var margen;
	var fila;
	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	var pulsado = false;

	function botonPulsado()
	{
		pulsado = true;

		circo.audio.pop.play();
	}

	this.iniciar = function(partida)
	{
		fila = lienzo.alto / 5;
		margen = lienzo.ancho / 12;
		dimensionesImagen = { ancho: 2.5 * fila, alto: 2.5 * fila };

		var img = partida.graficos()[imagen];

		if (img.width > img.height)
			dimensionesImagen.alto = dimensionesImagen.alto * (img.height / img.width);
		else
			dimensionesImagen.ancho = dimensionesImagen.ancho * (img.width / img.height);

		dimensionesImagen.x = lienzo.ancho / 2 - dimensionesImagen.ancho / 2;
		dimensionesImagen.y = fila;

		// Creamos el fondo
		partida.crearElemento(0, 0, lienzo.ancho, lienzo.alto,
										{ dibujar: dibujarFondo, identificador: "fondo" });

		// Creamos los botones

		var ancho = lienzo.ancho * 2 / 3;
		var alto = lienzo.alto / 10;

		var texto = partida.idioma.texto("comenzar");

		var opciones = { x: lienzo.ancho / 2 - ancho / 2, y: lienzo.alto - alto - 5, tipo: "redondeado", identificador: "boton",
							partida: partida, ancho: ancho, alto: alto, relleno: '#c40038',
							contorno: false, grosor: 3, texto: texto, colorTexto: '#fff', sombra: '#800226' };

		opciones.onclick = botonPulsado;

		new circo.intermedios.util.Boton(opciones);
	}

	this.avanzar = function(partida)
	{

	}

	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		// T�tulo
		contexto.font = categorizr.isMobile ? "46px Conv_Carnevalee Freakshow" : "56px Conv_Carnevalee Freakshow";
		contexto.fillStyle = '#c40037';
		escribirTexto(contexto, dimensionesImagen.ancho, alto, titulo, ancho / 2, margen * 1.5);
		contexto.font = "26px Conv_Carnevalee Freakshow";
		contexto.fillStyle = '#333';
		escribirTexto(contexto, dimensionesImagen.ancho, alto, subtitulo, ancho / 2, margen * 2.5);

		// Imagen
		contexto.drawImage(graficos[imagen], dimensionesImagen.x, dimensionesImagen.y,
				dimensionesImagen.ancho, dimensionesImagen.alto);

		// Descripci�n
		contexto.fillStyle = '#646464';
	    contexto.font = '18px Verdana';
		escribirTexto(contexto, dimensionesImagen.ancho, alto, texto, ancho / 2, fila * 3.7);
	}

	this.finalizado = function()
	{
		return pulsado;
	}

	function dibujarFondo(contexto, ancho, alto, graficos)
	{

	}

	function escribirTexto(contexto, ancho, alto, texto, x, y)
	{
	    var indice = 0;
	    var lineaActual = 0;

	    var alturaLinea = 20;
	    var aux;

	    texto = texto.replace(/^\s+|\s+$/g, '');
	    var palabras = texto.split(' ');

	    while (indice < palabras.length)
	    {
	    	aux = palabras[indice];
	    	indice++;

	        while (indice < palabras.length && (contexto.measureText(aux + palabras[indice]).width < ancho))
	        {
	        	aux += (aux == "" ? "" : " ") + palabras[indice];
		        indice++;
	        }

	        contexto.fillText(aux, x, y + (alturaLinea * lineaActual++));
	    }
	}
}
