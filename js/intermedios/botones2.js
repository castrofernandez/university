circo.intermedios.Botones2 = function(canvas)
{		
	this.identificador = "botones2";
	this.imagenes = [];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;

	var nivel = null;
	var posiciones = [];

	(function() {
		lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	
		dimensionesBoton = { ancho: (lienzo.ancho / 4), alto: (lienzo.ancho / 4) };
		margen = dimensionesBoton.alto / 3;
		
		posiciones[0] = { x: margen, y: margen, tipo: "redondo" };
		posiciones[1] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: margen, tipo: "redondo" };
		posiciones[2] = { x: margen, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "redondo" };
		posiciones[3] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "redondo" };
	})();

	this.iniciar = function(partida)
	{		
		var botones = [];
		
		for (var i = 0; i < posiciones.length; i++)
		{			
			var opciones = { partida: partida, ancho: dimensionesBoton.ancho, alto: dimensionesBoton.alto, relleno: '#d10033', 
							contorno: false, grosor: 3, texto: "", colorTexto: '#3E6A76', sombra: '#8B0325' };
							
			opciones.x = posiciones[i].x;
			opciones.y = posiciones[i].y;
			opciones.tipo = posiciones[i].tipo;	
						
			botones.push(opciones);
		}
		
		nivel = new circo.intermedios.util.Botones(canvas, botones, ['#8bc8dc', '#f1f1f3']);
		nivel.iniciar(partida);
	}
		
	this.avanzar = function(partida)
	{	
		nivel.avanzar();
	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos, idioma)
	{
		nivel.dibujar(contexto, ancho, alto, graficos);
		
		contexto.fillStyle = "#0B4C5F";
		contexto.font = "30px Verdana";
		contexto.textAlign = 'center';
		contexto.fillText(idioma.texto("pulsaCirculo"), ancho / 2, alto / 2 - 30);
		contexto.fillText(idioma.texto("paraContinuar"), ancho / 2, alto / 2 + 30);
	}
	
	this.finalizado = function()
	{
		return nivel.finalizado();
	}
}