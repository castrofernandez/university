circo.intermedios.Fin = function(canvas)
{		
	this.imagenes = [];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;


	(function() {

	})();

	this.iniciar = function(partida)
	{				

	}
		
	this.avanzar = function(partida)
	{	

	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		contexto.fillStyle = '#555';
		contexto.fillText("Demo over", ancho / 2, alto / 2);
	}
	
	this.finalizado = function()
	{
		return true;
	}
}