circo.intermedios.Botones1 = function()
{		
	this.imagenes = [];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;

	var nivel = null;
	var posiciones = [];

	(function() {
		lienzo = xuegu.Utilidades.dimensionesJuego();
	
		dimensionesBoton = { ancho: (lienzo.ancho / 3), alto: (lienzo.ancho / 6) };
		margen = dimensionesBoton.alto / 2;
		
		posiciones[0] = { x: margen, y: margen, tipo: "recto" };
		posiciones[1] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: margen, tipo: "redondeado" };
		posiciones[2] = { x: margen, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "recto" };
		posiciones[3] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "recto" };
	})();

	this.iniciar = function(partida)
	{		
		var botones = [];
		
		var texto = partida.idioma.texto("continuar");
		
		for (var i = 0; i < posiciones.length; i++)
		{			
			var opciones = { partida: partida, ancho: dimensionesBoton.ancho, alto: dimensionesBoton.alto, relleno: '#8bc8dc', 
							contorno: false, grosor: 3, texto: texto, colorTexto: '#3E6A76', sombra: '#598996' };
							
			opciones.x = posiciones[i].x;
			opciones.y = posiciones[i].y;
			opciones.tipo = posiciones[i].tipo;	
						
			botones.push(opciones);
		}
		
		nivel = new circo.intermedios.util.Botones(botones);
		nivel.iniciar(partida);
	}
		
	this.avanzar = function(partida)
	{	
		nivel.avanzar();
	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		nivel.dibujar(contexto, ancho, alto, graficos);
	}
	
	this.finalizado = function()
	{
		return nivel.finalizado();
	}
}