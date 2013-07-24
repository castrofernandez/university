circo.intermedios.Botones3 = function()
{		
	this.imagenes = [];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;

	var nivel = null;
	var posiciones = [];

	(function() {
		lienzo = xuegu.Utilidades.dimensionesJuego();
	
		dimensionesBoton = { ancho: (lienzo.ancho / 4), alto: (lienzo.ancho / 4) };
		margen = lienzo.ancho / 12;
		
		posiciones[0] = { x: margen, y: margen, tipo: "recto", relleno: "#0d72bd" };
		posiciones[1] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: margen, tipo: "recto", relleno: "#97949a" };
		posiciones[2] = { x: margen, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "recto", relleno: "#d10033" };
		posiciones[3] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "recto", 
							relleno: "#00a491" };
	})();

	this.iniciar = function(partida)
	{		
		var botones = [];
		
		var texto = partida.idioma.texto("continuar");
		
		for (var i = 0; i < posiciones.length; i++)
		{			
			var opciones = { partida: partida, ancho: dimensionesBoton.ancho, alto: dimensionesBoton.alto,
							grosor: 3, texto: texto, colorTexto: '#fff', sombra: '#598996', contorno: false };
							
			opciones.x = posiciones[i].x;
			opciones.y = posiciones[i].y;
			opciones.tipo = posiciones[i].tipo;	
			opciones.relleno = posiciones[i].relleno;
			opciones.contorno = posiciones[i].contorno;
						
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