circo.intermedios.Resultado2 = function(canvas)
{		
	this.identificador = "resultado2";
	this.imagenes = [];
					
	this.velocidad = 150;

	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);

	var pulsado = false;
	
	var tu_edad_mental = null;
	var pulsa_finalizar = null;
	
	var edad_resultado = 30;
	
	var abertura = null;
	var ranura =  null;
	var papel = null;

	(function() {

	})();

	this.iniciar = function(partida)
	{						
		// Etiquetas
		
		tu_edad_mental = partida.idioma.texto("tu_edad_mental");
		pulsa_finalizar = partida.idioma.texto("pulsa_finalizar");
		
		// Papel
		
		abertura = {
			ancho: lienzo.ancho * 9 / 10,
			alto: lienzo.alto / 10,
			x: lienzo.ancho / 2 - (lienzo.ancho * 9 / 10)	/ 2,
			y: lienzo.alto / 10
		};
		
		ranura = {
			ancho: abertura.ancho - abertura.alto / 2,
			alto: abertura.alto / 2,
			x: lienzo.ancho / 2 - (abertura.ancho - abertura.alto / 2) / 2,	
			y: abertura.y + abertura.alto / 4
		};
		
		papel = {
			ancho: ranura.ancho * 9 / 10,
			alto: lienzo.alto - 2 * ranura.y,
			x: lienzo.ancho / 2 - (ranura.ancho * 9 / 10) / 2,
			y: ranura.y	
		};
		
		// Creamos el fondo
		partida.crearElemento(0, 0, lienzo.ancho, lienzo.alto, 
										{ dibujar: dibujarFondo });
		
		// Botón
		
		var ancho = lienzo.ancho * 2 / 3;
		var alto = lienzo.alto / 10;
		var posY = papel.y + papel.alto - 2 * alto;
		
		var opciones = { x: lienzo.ancho / 2 - ancho / 2, y: posY, tipo: "redondeado", 
							partida: partida, ancho: ancho, alto: alto, relleno: '#E7C185', 
							contorno: false, grosor: 3, texto: pulsa_finalizar, colorTexto: '#302a1b', sombra: '#B6945E' };
		
		opciones.onclick = botonPulsado;
			
		new circo.intermedios.util.Boton(opciones);
	}
		
	this.avanzar = function(partida)
	{	

	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos) {
		
	}
	
	function botonPulsado() {
		pulsado = true;
	}
	
	function dibujarFondo(contexto, ancho, alto, graficos)
	{
		// Fondo
		xuegu.Graficos.rectangulo(contexto, 0, 0, lienzo.ancho, lienzo.alto, '#c8002d');

		// Abertura
		
		var ancho_abertura = ancho * 9 / 10;
		xuegu.Graficos.rectangulo(contexto, abertura.x, abertura.y, abertura.ancho, abertura.alto, '#810000');
		
		xuegu.Graficos.rectangulo(contexto, ranura.x, ranura.y, ranura.ancho, ranura.alto, '#302a1b');
		
		// Papel 
		
		xuegu.Graficos.rectangulo(contexto, papel.x, papel.y, papel.ancho, papel.alto, '#ffdda7');
		
		contexto.fillStyle = '#302a1b';
		contexto.font = "24px Verdana";
		contexto.fillText(tu_edad_mental, ancho / 2, papel.y + papel.alto / 6);
		
		contexto.font = "200px Conv_Carnevalee Freakshow";
		contexto.fillText(edad_resultado, ancho / 2, papel.y + papel.alto / 1.8);
	}
	
	this.finalizado = function()
	{
		return pulsado;
	}
}