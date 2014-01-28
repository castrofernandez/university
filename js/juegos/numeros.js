circo.juegos.Numeros = function(canvas)
{
	this.identificador = "numeros";
	var ancho_alto_pato = null;
	
	var gancho = { };

	var angulo_oscilacion = 0.05;
	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	
	this.imagenes = ['img/numeros/pato1.png', 'img/numeros/pato2.png', 'img/numeros/pato3.png', 
					'img/numeros/pato4.png', 'img/numeros/pato5.png', 'img/numeros/pato6.png', 'img/numeros/gancho.png',
					'img/numeros/pato1-inactivo.png', 'img/numeros/pato2-inactivo.png', 'img/numeros/pato3-inactivo.png', 
					'img/numeros/pato4-inactivo.png', 'img/numeros/pato5-inactivo.png', 'img/numeros/pato6-inactivo.png'];
				
	var contador = 1;			
				
	var dibujarPato =  function(contexto, ancho, alto, graficos, idioma, partidaAnterior)
	{	
		var mitad_ancho = Math.floor(this.ancho / 2);
	    var mitad_alto = Math.floor(this.alto / 2);
	
		if (!this.activo)
		{
			contexto.drawImage(graficos[this.imagenInactivo], this.x, this.y, this.ancho, this.alto);
			contexto.fillText(this.numero, this.x + mitad_ancho, this.y + 8 / 10 * this.alto, this.ancho, this.alto);
		
			return;
		}
		
		contexto.save();
		
		contexto.translate(this.x, this.y);
		contexto.translate(mitad_ancho, mitad_alto);
		contexto.rotate(this.oscilacion);

		contexto.drawImage(graficos[this.imagen], - mitad_ancho, - mitad_alto, this.ancho, this.alto);
		contexto.fillStyle = '#555';
		contexto.fillText(this.numero, - mitad_ancho + 1 / 2 * ancho_alto_pato, - mitad_alto + 8 / 10 * ancho_alto_pato, 
							this.ancho, this.alto);
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
			
		// Fondo
		partida.crearElemento(0, 0, lienzo.ancho, lienzo.alto, { dibujar: dibujarFondo });
	
		this.elementos = patos = 	[
			partida.crearElemento(posicionesPatos[0].x, posicionesPatos[0].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', imagenInactivo : 'img/numeros/pato1-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato1",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 1}),
			partida.crearElemento(posicionesPatos[1].x, posicionesPatos[1].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', imagenInactivo : 'img/numeros/pato3-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato2", 
					dibujar: dibujarPato, onclick: patoOnClick, numero: 2}),
			partida.crearElemento(posicionesPatos[2].x, posicionesPatos[2].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', imagenInactivo : 'img/numeros/pato6-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato3",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 3}),
			partida.crearElemento(posicionesPatos[3].x, posicionesPatos[3].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', imagenInactivo : 'img/numeros/pato2-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato4",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 4}),
			partida.crearElemento(posicionesPatos[4].x, posicionesPatos[4].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', imagenInactivo : 'img/numeros/pato4-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato5",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 5}),
			partida.crearElemento(posicionesPatos[5].x, posicionesPatos[5].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', imagenInactivo : 'img/numeros/pato2-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato6",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 6}),
			partida.crearElemento(posicionesPatos[6].x, posicionesPatos[6].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', imagenInactivo : 'img/numeros/pato5-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato7",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 7}),
			partida.crearElemento(posicionesPatos[7].x, posicionesPatos[7].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', imagenInactivo : 'img/numeros/pato3-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato8",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 8}),
			partida.crearElemento(posicionesPatos[8].x, posicionesPatos[8].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', imagenInactivo : 'img/numeros/pato1-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato9",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 9}),
			partida.crearElemento(posicionesPatos[9].x, posicionesPatos[9].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', imagenInactivo : 'img/numeros/pato4-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato10",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 10}),
			partida.crearElemento(posicionesPatos[10].x, posicionesPatos[10].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', imagenInactivo : 'img/numeros/pato2-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato11",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 11}),
			partida.crearElemento(posicionesPatos[11].x, posicionesPatos[11].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', imagenInactivo : 'img/numeros/pato3-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato12",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 12}),
			partida.crearElemento(posicionesPatos[12].x, posicionesPatos[12].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', imagenInactivo : 'img/numeros/pato5-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato13",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 13}),
			partida.crearElemento(posicionesPatos[13].x, posicionesPatos[13].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', imagenInactivo : 'img/numeros/pato6-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato14",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 14}),
			partida.crearElemento(posicionesPatos[14].x, posicionesPatos[14].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', imagenInactivo : 'img/numeros/pato4-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato15",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 15}),
			partida.crearElemento(posicionesPatos[15].x, posicionesPatos[15].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', imagenInactivo : 'img/numeros/pato1-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato16",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 16}),
			partida.crearElemento(posicionesPatos[16].x, posicionesPatos[16].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', imagenInactivo : 'img/numeros/pato6-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato17",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 17}),
			partida.crearElemento(posicionesPatos[17].x, posicionesPatos[17].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', imagenInactivo : 'img/numeros/pato5-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato18",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 18}),
			partida.crearElemento(posicionesPatos[18].x, posicionesPatos[18].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', imagenInactivo : 'img/numeros/pato4-inactivo.png', 
				oscilacion: +0, avance_oscilacion: true, activo: true, identificador: "pato19",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 19}),
			partida.crearElemento(posicionesPatos[19].x, posicionesPatos[19].y, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', imagenInactivo : 'img/numeros/pato2-inactivo.png', 
				oscilacion: +0, avance_oscilacion: false, activo: true, identificador: "pato20",
					dibujar: dibujarPato, onclick: patoOnClick, numero: 20})
			];	
		
		circo.audio.circo.volume = 0.05;	
		circo.audio.circo.play();
		
		circo.audio.circo.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);
	}
	
	function patoOnClick(coordenada)
	{
		circo.audio.trompeta.pause();
	
		if (this.numero == contador) {
			if (this.activo) {
				patosPulsados++;
				contador++;	
				
				circo.audio.pato.play();
			}
			
			this.activo = false;
		}
		else
			circo.audio.trompeta.play();
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
	
	function dibujarFondo(contexto, ancho, alto, graficos, idioma, partidaAnterior)
	{
		xuegu.Graficos.rectangulo(contexto, 0, 0, ancho, alto, '#8BE5E2');
	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		// Gancho
		
		contexto.drawImage(graficos['img/numeros/gancho.png'], lienzo.ancho / 2 - gancho.ancho / 2, -50, gancho.ancho, gancho.alto);
	}
}