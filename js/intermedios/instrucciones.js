circo.intermedios.Instrucciones = function(canvas)
{		
	this.imagenes = ['img/instrucciones/numeros.png'];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;

	var nivel = null;

	(function() {

	})();

	this.iniciar = function(partida)
	{				
		var idioma = partida.idioma;
		var texto = idioma.texto("instrucciones_numeros");
		var titulo = idioma.texto("titulo_prueba_1");
		var nombre = idioma.texto("nombre_prueba_1");
	
		nivel = new circo.intermedios.util.Instrucciones(canvas, titulo, nombre, texto, 
														'img/instrucciones/numeros.png');
		nivel.iniciar(partida);
	}
		
	this.avanzar = function(partida)
	{	
		nivel.avanzar();
	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos, idioma)
	{
		nivel.dibujar(contexto, ancho, alto, graficos);
	}
	
	this.finalizado = function()
	{
		return nivel.finalizado();
	}
}