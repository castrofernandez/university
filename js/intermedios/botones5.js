circo.intermedios.Botones5 = function()
{		
	this.imagenes = ['img/intermedios/estrella1.png', 
					'img/intermedios/estrella2.png', 
					'img/intermedios/estrella3.png',
					'img/intermedios/estrella4.png',
					'img/intermedios/estrella-sombra.png'];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;

	var nivel = null;
	var posiciones = [];

	function dibujarEstrella(contexto)
	{
		var imagen = this.pulsado ? this.sombra : this.imagen;
		
		contexto.drawImage(imagen, this.x, this.y, this.ancho, this.alto);
		
		contexto.fillStyle = this.colorTexto;
		contexto.font = "26px Conv_Carnevalee Freakshow";
		contexto.fillText(this.texto, this.x + this.ancho / 2, this.y + this.alto / 1.8);
	}

	(function() {
		lienzo = xuegu.Utilidades.dimensionesJuego();
	
		dimensionesBoton = { ancho: (lienzo.ancho / 3), alto: (lienzo.ancho / 3) };
		margen = lienzo.ancho / 12;
		
		posiciones[0] = { x: margen, y: margen, tipo: "personalizado", imagen: 'img/intermedios/estrella1.png' };
		posiciones[1] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: margen, tipo: "personalizado", imagen: 'img/intermedios/estrella2.png' };
		posiciones[2] = { x: margen, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "personalizado", imagen: 'img/intermedios/estrella3.png' };
		posiciones[3] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "personalizado", 
							imagen: 'img/intermedios/estrella4.png' };
	})();

	this.iniciar = function(partida)
	{		
		var botones = [];
		
		var texto = partida.idioma.texto("continuar");
		
		for (var i = 0; i < posiciones.length; i++)
		{			
			var opciones = { partida: partida, ancho: dimensionesBoton.ancho, alto: dimensionesBoton.alto, grosor: 3, texto: "Continuar", 
							colorTexto: '#fff', sombra: 'img/intermedios/estrella-sombra.png', texto: texto, dibujar: dibujarEstrella };
						
			opciones.x = posiciones[i].x;
			opciones.y = posiciones[i].y;
			opciones.tipo = posiciones[i].tipo;	
			opciones.imagen = partida.graficos()[posiciones[i].imagen];
			opciones.sombra = partida.graficos()[opciones.sombra];
						
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
	}
	
	this.finalizado = function()
	{
		return nivel.finalizado();
	}
}