circo.intermedios.Instrucciones = function(canvas, titulo, nombre, descripcion, imagen)
{		
	this.imagenes = [imagen];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;

	var nivel = null;

	(function() {

	})();

	this.iniciar = function(partida)
	{				
		var idioma = partida.idioma;
		var texto = idioma.texto(descripcion);
		var texto_titulo = idioma.texto(titulo);
		var texto_nombre = idioma.texto(nombre);

		nivel = new circo.intermedios.util.Instrucciones(canvas, texto_titulo, texto_nombre, texto, imagen);
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