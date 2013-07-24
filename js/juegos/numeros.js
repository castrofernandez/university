circo.juegos.Numeros = function()
{
	var ancho_alto_pato = 80;
	
	var ancho_gancho = 30;
	var alto_gancho = 250;
	
	var angulo_oscilacion = 0.05;
	
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
		this.elementos = patos = 	[
			new xuegu.Elemento(partida, 110, 33, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 10, 13, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 300, 10, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 210, 10, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 300, 110, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 50, 110, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 110, 190, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 200, 100, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 20, 200, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 20, 290, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 200, 200, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 310, 300, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 300, 200, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 100, 300, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 90, 400, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 230, 365, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 210, 280, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 180, 410, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: false, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 310, 410, ancho_alto_pato, ancho_alto_pato, 
				{imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: true, activo: true, dibujar: dibujarPato, onclick: patoOnClick}),
			new xuegu.Elemento(partida, 10, 400, ancho_alto_pato, ancho_alto_pato, 
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
		
		contexto.drawImage(graficos['img/numeros/gancho.png'], 180, -50, ancho_gancho, alto_gancho);
	}
}