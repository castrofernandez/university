circo.intermedios.Botones6 = function(canvas)
{		
	this.identificador = "botones6";
	this.imagenes = ['img/intermedios/forma1.png', 
					'img/intermedios/forma2.png', 
					'img/intermedios/forma3.png'];

	var dimensionesBoton = null;	
	var margen = null;
	var lienzo = null;

	var nivel = null;
	var posiciones = [];

	function dibujarForma(contexto)
	{
		//var imagen = this.pulsado ? this.sombra : this.imagen;
		var imagen = this.imagen;
		
		contexto.drawImage(imagen, this.x, this.y, this.ancho, this.alto);
		
		contexto.fillStyle = this.colorTexto;
		contexto.font = "26px Conv_Carnevalee Freakshow";
		contexto.fillText(this.texto, this.x + this.ancho / 2, this.y + this.alto / 1.8);
	}

	(function() {
		lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	
		dimensionesBoton = { ancho: (lienzo.ancho / 3), alto: (lienzo.ancho / 4) };
		margen = dimensionesBoton.alto / 3;
		
		posiciones[0] = { x: margen, y: margen, tipo: "personalizado", imagen: 'img/intermedios/forma1.png' };
		posiciones[1] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: margen, tipo: "redondeado" };
		posiciones[2] = { x: margen, y: lienzo.alto - margen - dimensionesBoton.alto, tipo: "personalizado", imagen: 'img/intermedios/forma2.png' };
		posiciones[3] = { x: lienzo.ancho - margen - dimensionesBoton.ancho, y: lienzo.alto - margen - dimensionesBoton.alto, 
							tipo: "personalizado", imagen: 'img/intermedios/forma3.png' };
	})();

	this.iniciar = function(partida)
	{		
		var botones = [];
		
		var texto = partida.idioma.texto("continuar");
		
		for (var i = 0; i < posiciones.length; i++)
		{			
			var opciones = { partida: partida, ancho: dimensionesBoton.ancho, alto: dimensionesBoton.alto, relleno: '#8bc8dc', 
							contorno: false, grosor: 3, texto: texto, colorTexto: '#3E6A76', sombra: '#8B0325', dibujar: dibujarForma };
							
			opciones.x = posiciones[i].x;
			opciones.y = posiciones[i].y;
			opciones.tipo = posiciones[i].tipo;	
			opciones.imagen = partida.graficos()[posiciones[i].imagen];
						
			botones.push(opciones);
		}
		
		nivel = new circo.intermedios.util.Botones(canvas, botones);
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