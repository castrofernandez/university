circo.intermedios.util.Botones = function(canvas, botones, fondo)
{		
	var lienzo = null;
	var pulsado = false;
	var fondo = fondo ? fondo : ['#e25470', '#f1f1f3'];

	(function() {
		lienzo = xuegu.Utilidades.dimensionesJuego(canvas);	
	})();

	function botonPulsado()
	{
		pulsado = true;
	}

	this.iniciar = function(partida)
	{
		// Creamos el fondo
		partida.crearElemento(0, 0, lienzo.ancho, lienzo.alto, 
										{ dibujar: dibujarFondo });
		
		// Creamos los botones
		
		for (var i = 0; i < botones.length; i++)
		{
			var boton = botones[i];
			boton.onclick = botonPulsado;
			
			new circo.intermedios.util.Boton(boton);		
		}
	}
		
	this.avanzar = function(partida)
	{	

	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos, idioma)
	{

	}
	
	this.finalizado = function()
	{
		return pulsado;
	}
	
	function dibujarFondo(contexto, ancho, alto, graficos)
	{
		var barra = ancho / 17;
		
		for (var i = 0; i < 17; i++)
			xuegu.Graficos.rectangulo(contexto, barra * i, 0, barra, alto, i % 2 == 0 ? fondo[0] : fondo[1]);
	}
}