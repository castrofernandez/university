circo.juegos.Numeros = function(canvas)
{
	var ancho_alto_pato = null;;
	
	var gancho = { };

	var angulo_oscilacion = 0.05;
	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	
	this.imagenes = ['img/numeros/pato1.png', 'img/numeros/pato2.png', 'img/numeros/pato3.png', 
					'img/numeros/pato4.png', 'img/numeros/pato5.png', 'img/numeros/pato6.png', 'img/numeros/gancho.png'];
				
	var dibujarPato =  function(contexto, graficos, numero)
	{
		var mitad_ancho = Math.floor(this.ancho / 2);
	    var mitad_alto = Math.floor(this.alto / 2);
		
		contexto.save();
		
		contexto.translate(this.x, this.y);
		contexto.translate(mitad_ancho, mitad_alto);
		contexto.rotate(this.oscilacion);
		contexto.drawImage(graficos[this.imagen], - mitad_ancho, - mitad_alto, this.ancho, this.alto);
		contexto.fillStyle = '#555';
		contexto.fillText(numero, - mitad_ancho + 1 / 2 * ancho_alto_pato, - mitad_alto + 8 / 10 * ancho_alto_pato, this.ancho, this.alto);
		contexto.restore();
	}	
	
	var patosPulsados = 0;	
					
	var patos = null;
	
	this.iniciar = function(partida)	
	{
		ancho_alto_pato = lienzo.ancho / 5;
		gancho.alto = lienzo.alto / 2;
		gancho.ancho = 30 / 250 * gancho.alto;
	
		var posicionesPatos = [];
		
		var contador = 0;
		
		var columna = lienzo.ancho / 4;
		var margen_columna = (lienzo.ancho / 4 - lienzo.ancho / 5) / 2;
		
		var fila = lienzo.alto / 5;
		var margen_fila = (lienzo.alto / 5 - ancho_alto_pato) / 2;
		
		for (var i = 0; i < 5; i++)
			for (var j = 0; j < 4; j++) {
				posicionesPatos[contador] = { x : columna * j + margen_columna, y : fila * i + margen_fila };
				contador++;
			}
	
		this.elementos = patos = 	[
			new xuegu.Elemento(partida, posicionesPatos[0].x, posicionesPatos[0].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[1].x, posicionesPatos[1].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[2].x, posicionesPatos[2].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[3].x, posicionesPatos[3].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[4].x, posicionesPatos[4].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[5].x, posicionesPatos[5].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[6].x, posicionesPatos[6].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[7].x, posicionesPatos[7].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[8].x, posicionesPatos[8].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[9].x, posicionesPatos[9].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[10].x, posicionesPatos[10].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[11].x, posicionesPatos[11].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[12].x, posicionesPatos[12].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[13].x, posicionesPatos[13].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[14].x, posicionesPatos[14].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[15].x, posicionesPatos[15].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[16].x, posicionesPatos[16].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[17].x, posicionesPatos[17].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[18].x, posicionesPatos[18].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, posicionesPatos[19].x, posicionesPatos[19].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick})
			];	
	}
	
	function patoOnClick(coordenada)
	{
		if (this.activo)
			patosPulsados++;
		
		this.activo = false;
	}	
		
	this.finalizado = function()
	{
		return patos.length == patosPulsados;
	}	
		
	this.avanzar = function(partida)
	{	
		var coordenadas = partida.manejadores;
		coordenadasClick = coordenadas.click.obtenerValor();
	
		for (var i = 0; i < patos.length; i++)
		{
			var pato = patos[i];
		
			// Se comprueba si se ha pulsado un pato
			
			if (pato.activo)
			{	
				// Oscilación del pato
				
				pato.oscilacion += pato.avance_oscilacion ? 0.005 : -0.005;
	
				if (Math.abs(pato.oscilacion) >= angulo_oscilacion)
					pato.avance_oscilacion = ! pato.avance_oscilacion;
			}
		}
	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		// Fondo
		xuegu.Graficos.rectangulo(contexto, 0, 0, ancho, alto, '#8BE5E2');
		
		// Patos
		
		for (var i = 0; i < patos.length; i++)
		{
			var pato = patos[i];
			
			if (pato.activo)
			{
				pato.dibujar(contexto, graficos, i + 1);
			
			}
		}
		
		// Gancho
		
		contexto.drawImage(graficos['img/numeros/gancho.png'], lienzo.ancho / 2 - gancho.ancho / 2, -50, gancho.ancho, gancho.alto);
	}
}