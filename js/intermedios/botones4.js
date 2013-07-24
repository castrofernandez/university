circo.intermedios.Botones4 = function()
{		
	this.imagenes = [];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;

	var nivel = null;
	var posiciones = [];

	function dibujarBotonDiana(contexto)
	{
		var radio1 = this.ancho / 2;
		var radio3 = this.ancho / 5;
		
		var radio2 = radio3 + (radio1 - radio3) / 2;
		
		xuegu.Graficos.circulo(contexto, this.x + radio1, this.y + radio1, radio1, 
											this.pulsado ? this.sombra : this.relleno1, this.contorno, this.grosor, true);
											
		xuegu.Graficos.circulo(contexto, this.x + radio1, this.y + radio1, radio2, 
											this.pulsado ? this.sombra : this.relleno2, this.contorno, this.grosor, false);
		
		xuegu.Graficos.circulo(contexto, this.x + radio1, this.y + radio1, radio3, 
											this.pulsado ? this.sombra : this.relleno1, this.contorno, this.grosor, false);
	}

	(function() {
		lienzo = xuegu.Utilidades.dimensionesJuego();
	
		dimensionesBoton = { ancho: (lienzo.ancho / 4), alto: (lienzo.ancho / 4) };
		margen = dimensionesBoton.alto / 3;
		
		posiciones[0] = { x: margen, y: margen, tipo: "personalizado" };
		posiciones[1] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: margen, tipo: "personalizado" };
		posiciones[2] = { x: margen, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "personalizado" };
		posiciones[3] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "personalizado" };
	})();

	this.iniciar = function(partida)
	{		
		var botones = [];
		
		for (var i = 0; i < posiciones.length; i++)
		{			
			var opciones = { partida: partida, ancho: dimensionesBoton.ancho, alto: dimensionesBoton.alto, relleno1: '#d10033', relleno2: '#fff', 
							contorno: false, grosor: 3, texto: "", colorTexto: '#3E6A76', sombra: '#8B0325', dibujar: dibujarBotonDiana };
							
			opciones.x = posiciones[i].x;
			opciones.y = posiciones[i].y;
			opciones.tipo = posiciones[i].tipo;	
						
			botones.push(opciones);
		}
		
		nivel = new circo.intermedios.util.Botones(botones, ['#8bc8dc', '#f1f1f3']);
		nivel.iniciar(partida);
	}
		
	this.avanzar = function(partida)
	{	
		nivel.avanzar();
	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		nivel.dibujar(contexto, ancho, alto, graficos);
		
		contexto.fillStyle = "#0B4C5F";
		contexto.font = "30px Verdana";
		contexto.textAlign = 'center';
		contexto.fillText(idioma.texto("pulsaDiana"), ancho / 2, alto / 2 - 30);
		contexto.fillText(idioma.texto("paraContinuar"), ancho / 2, alto / 2 + 30);
	}
	
	this.finalizado = function()
	{
		return nivel.finalizado();
	}
}