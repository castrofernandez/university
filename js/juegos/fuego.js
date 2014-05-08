circo.juegos.Fuego = function(canvas)
{
	this.identificador = "fuego";

	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	
	this.imagenes = ['img/fuego/nube.png', 'img/fuego/sol.png', 'img/fuego/colina.png', 'img/fuego/casas1.png', 'img/fuego/casas2.png',
	'img/fuego/casas3.png', 'img/fuego/casas4.png', 'img/fuego/manguera.png', 'img/fuego/chorro.png', 'img/fuego/fuego.png'];
	
	var manguera = null;
	var oscilacion_manguera = 0.8;
	var fuerzaAgua = 0;
	var maxFuerzaAgua = 1.5;
	var intervaloManguera = null;
	var moviendoManguera = false;
	var disparando = false;
	var duracion_fuego = 4000;
	
	var instanteInicial = null;
	var numFuegosActivos = 0;
	var numFuegosApagados = 0;
	
	var subidas = 	[
						{ fuego: 0, instante: 1000 },
						{ fuego: 1, instante: 1000 },
						
						{ fuego: 4, instante: 3000 },
						{ fuego: 5, instante: 3000 },
						
						{ fuego: 2, instante: 5000 },
						
						{ fuego: 1, instante: 7000 },
						{ fuego: 5, instante: 7000 },
						
						{ fuego: 3, instante: 9000 },
						
						{ fuego: 0, instante: 11000 },
						{ fuego: 4, instante: 11000 },
						
						{ fuego: 2, instante: 13000 },
						{ fuego: 3, instante: 13000 },
						
						{ fuego: 1, instante: 15000 },
						{ fuego: 5, instante: 15000 },
						
						{ fuego: 2, instante: 17000 },
						{ fuego: 3, instante: 17000 },
						
						{ fuego: 0, instante: 19000 },
						{ fuego: 1, instante: 19000 },
						{ fuego: 4, instante: 19000 },
						{ fuego: 5, instante: 19000 }
					];
					
	var fuegos = new Array();
	
	var nube = {
		ancho: lienzo.ancho / 2.2,
		alto: lienzo.ancho / (2.2 * 4)
	};
	
	var sol = {
		ancho: nube.ancho / 3,
		alto: nube.ancho / 3	
	};
	
	var colina = {
		ancho: lienzo.ancho / 2,
		alto: lienzo.ancho / 2 / 3
	};
	
	var casas1 = {
		ancho: lienzo.ancho,
		alto: lienzo.ancho / 6	
	};
	
	var casas2 = {
		ancho: lienzo.ancho,
		alto: lienzo.ancho / 3	
	};
	
	var casas3 = {
		ancho: lienzo.ancho,
		alto: lienzo.ancho / 4	
	};
	
	var casas4 = {
		ancho: lienzo.ancho,
		alto: lienzo.ancho / 3.5
	};
	
	var manguera_dimensiones = {
		ancho: lienzo.ancho / 5,
		alto: lienzo.alto / 2
	};
	
	var contador_agua = {
		x: lienzo.ancho * 18.2 / 20,
		y: lienzo.alto * 3.8 / 5,
		ancho: lienzo.ancho / 20,
		alto: lienzo.alto / 5
	};
	
	var chorro = {
		ancho: lienzo.ancho / 4.8,
		alto: lienzo.alto / 1.4	
	};
	
	var fuego = {
		ancho: lienzo.ancho / 5,
		alto: lienzo.ancho / 3	
	};
	
	this.iniciar = function(partida)	
	{
		// Fondo
		partida.crearElemento(0, 0, lienzo.ancho, lienzo.alto, { dibujar: dibujarFondo });
		
		// Manguera
		manguera = partida.crearElementoRotable(lienzo.ancho / 2 - manguera_dimensiones.ancho / 2, lienzo.alto - manguera_dimensiones.alto / 2, 
				manguera_dimensiones.ancho, manguera_dimensiones.alto, 
				{ imagen : 'img/fuego/manguera.png', identificador: "manguera", chorro: 'img/fuego/chorro.png',
					dibujar: dibujarManguera, onmousedown: cogerManguera, onmouseup: soltarManguera,
					ontouchstart: cogerManguera, ontouchend: soltarManguera });
					
		// Fuegos
		fuegos[0] = partida.crearElemento(fuego.ancho / 4, lienzo.alto / 10 + colina.alto - fuego.alto / 1.5, 
				fuego.ancho, fuego.alto, { identificador: "fuego1", mostrando: false, mostrar: mostrarFuego, onclick: pulsarFuego });
		fuegos[1] = partida.crearElemento(lienzo.ancho - fuego.ancho * 5 / 4, lienzo.alto / 10 + colina.alto - fuego.alto / 1.5, 
				fuego.ancho, fuego.alto, { identificador: "fuego2", mostrando: false, mostrar: mostrarFuego, onclick: pulsarFuego });
				
		fuegos[2] = partida.crearElemento(fuego.ancho / 4, lienzo.alto / 2.5 - fuego.alto / 2, 
				fuego.ancho, fuego.alto, { identificador: "fuego1", mostrando: false, mostrar: mostrarFuego, onclick: pulsarFuego });
		fuegos[3] = partida.crearElemento(lienzo.ancho - fuego.ancho * 5 / 4, lienzo.alto / 2.5 - fuego.alto / 2, 
				fuego.ancho, fuego.alto, { identificador: "fuego2", mostrando: false, mostrar: mostrarFuego, onclick: pulsarFuego });
				
		fuegos[4] = partida.crearElemento(fuego.ancho / 4, lienzo.alto / 2.5 + casas3.alto - fuego.alto / 2, 
				fuego.ancho, fuego.alto, { identificador: "fuego1", mostrando: false, mostrar: mostrarFuego, onclick: pulsarFuego });
		fuegos[5] = partida.crearElemento(lienzo.ancho - fuego.ancho * 5 / 4, lienzo.alto / 2.5 + casas3.alto - fuego.alto / 2, 
				fuego.ancho, fuego.alto, { identificador: "fuego2", mostrando: false, mostrar: mostrarFuego, onclick: pulsarFuego });
				
		instanteInicial = new Date();
		
		circo.audio.circo.volume = 0.05;	
		circo.audio.circo.play();
		
		circo.audio.circo.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);
	}	
	
	function pulsarFuego() {
		this.mostrando = false;
		numFuegosApagados++;
	}
	
	function mostrarFuego() {
		this.mostrando = true;
		numFuegosActivos++;
		
		(function(fuego) {
			setTimeout(function() {
				fuego.mostrando = false;
				numFuegosActivos--;
			}, duracion_fuego);
		})(this);
	}
	
	function dibujarFondo(contexto, ancho, alto, graficos, idioma, partidaAnterior)
	{
		xuegu.Graficos.rectangulo(contexto, 0, 0, ancho, alto, '#a8d5d1');
		
		// Nubes y sol
		
		contexto.drawImage(graficos['img/fuego/nube.png'], lienzo.ancho - nube.ancho * 3 / 4, nube.alto / 3, nube.ancho, nube.alto);
		contexto.drawImage(graficos['img/fuego/nube.png'], nube.ancho * -1 / 8, nube.alto / 2, nube.ancho, nube.alto);
		contexto.drawImage(graficos['img/fuego/sol.png'], lienzo.ancho / 2 - sol.ancho / 2, sol.alto / 2, sol.ancho, sol.alto);
		
		// Colinas
		
		contexto.drawImage(graficos['img/fuego/colina.png'], 0, lienzo.alto / 10, colina.ancho, colina.alto);
		contexto.drawImage(graficos['img/fuego/colina.png'], lienzo.ancho / 2, lienzo.alto / 10, colina.ancho, colina.alto);
		xuegu.Graficos.rectangulo(contexto, 0, lienzo.alto / 10 + colina.alto, lienzo.ancho, lienzo.alto * 5 / 6, '#00a591');
		
		// Fuegos
		
		if (fuegos[0].mostrando)
			contexto.drawImage(graficos['img/fuego/fuego.png'], fuegos[0].x, fuegos[0].y, fuegos[0].ancho, fuegos[0].alto);
			
		if (fuegos[1].mostrando)
			contexto.drawImage(graficos['img/fuego/fuego.png'], fuegos[1].x, fuegos[1].y, fuegos[1].ancho, fuegos[1].alto);
		
		// Casas fondo 1
		
		contexto.drawImage(graficos['img/fuego/casas1.png'], 0, lienzo.alto / 10 + colina.alto, casas1.ancho, casas1.alto);
		contexto.drawImage(graficos['img/fuego/casas2.png'], 0, lienzo.alto / 10 + colina.alto, casas2.ancho, casas2.alto);		
		
		// Fuegos
		
		if (fuegos[2].mostrando)
			contexto.drawImage(graficos['img/fuego/fuego.png'], fuegos[2].x, fuegos[2].y, fuegos[2].ancho, fuegos[2].alto);
	
		if (fuegos[3].mostrando)
			contexto.drawImage(graficos['img/fuego/fuego.png'], fuegos[3].x, fuegos[3].y, fuegos[3].ancho, fuegos[3].alto);		
		
		// Casas fondo 2
		
		var altura = lienzo.alto / 2.5 + casas3.alto;
		contexto.drawImage(graficos['img/fuego/casas3.png'], 0, lienzo.alto / 2.4, casas3.ancho, casas3.alto);		
		xuegu.Graficos.rectangulo(contexto, 0, altura, lienzo.ancho, lienzo.alto - altura, '#d294b2');		
		
		// Fuegos
		
		if (fuegos[4].mostrando)
			contexto.drawImage(graficos['img/fuego/fuego.png'], fuegos[4].x, fuegos[4].y, fuegos[4].ancho, fuegos[4].alto);
			
		if (fuegos[5].mostrando)	
			contexto.drawImage(graficos['img/fuego/fuego.png'], fuegos[5].x, fuegos[5].y, fuegos[5].ancho, fuegos[5].alto);			
		
		// Casas
		
		contexto.drawImage(graficos['img/fuego/casas4.png'], 0, altura, casas4.ancho, casas4.alto);
		
		// Panel
		
		var altura = altura + casas4.alto;
		xuegu.Graficos.rectangulo(contexto, 0, altura, lienzo.ancho, lienzo.alto / 100, '#26807e');
		xuegu.Graficos.rectangulo(contexto, 0, altura + lienzo.alto / 100, lienzo.ancho, lienzo.alto / 30, '#00a492');
		
		var altura = altura + lienzo.alto / 30;
		var ancho = lienzo.ancho / 7;
		var alto = lienzo.alto - altura;
		
		for (var i = 0; i < 7; i++) {
			var color = i % 2 == 0 ? '#e36076' : '#f0f1f3';
			xuegu.Graficos.rectangulo(contexto, 0 + ancho * i, altura, ancho, alto, color);
		}
		
		// Marcador
		if (numFuegosApagados > 0) {
			contexto.fillStyle = "#008ab8";
			contexto.font = "30px Verdana";
			contexto.textAlign = 'right';
			contexto.fillText(numFuegosApagados, lienzo.ancho * 19 / 20, 30);
		}
	}
		
	this.finalizado = function()
	{
		return subidas.length == 0 && numFuegosActivos == 0;
	}	
		
	this.avanzar = function(partida)
	{	
		var instante = (new Date()).getTime() - instanteInicial.getTime();
		
		if (subidas.length > 0 && instante >= subidas[0].instante)
		{
			fuegos[subidas[0].fuego].mostrar();
			subidas.shift();
		}
	}
	
	this.dibujar = function(contexto, ancho, alto, graficos)
	{
		// Nivel de fuerza de agua
		
		if (moviendoManguera) {
			// Fondo
			xuegu.Graficos.rectangulo(contexto, contador_agua.x, contador_agua.y, contador_agua.ancho, contador_agua.alto, '#d2e9e7');
			// Nivel
			var nivel = (fuerzaAgua * contador_agua.alto) / maxFuerzaAgua;
			var inicio = contador_agua.y + contador_agua.alto - nivel;
			xuegu.Graficos.rectangulo(contexto, contador_agua.x, inicio, contador_agua.ancho, nivel, '#3cb1c3');
		}
		
		//xuegu.Graficos.circulo(contexto, impacto.x, impacto.y, 10, "#000")
	}
	
	function dibujarManguera(contexto, ancho, alto, graficos, idioma, partidaAnterior)
	{
		var angulo = this.rotacion;
	/*
		if (angulo > oscilacion_manguera)
			angulo = oscilacion_manguera;
		else if (angulo < -1 * oscilacion_manguera)
			angulo = -1 * oscilacion_manguera;
	*/
		var mitad_ancho = Math.floor(this.ancho / 2);
	    var mitad_alto = Math.floor(this.alto / 2);	

		contexto.save();
		
		contexto.translate(this.x + mitad_ancho, this.y + mitad_alto);
		contexto.rotate(angulo);	
		
		contexto.drawImage(graficos[this.imagen], - mitad_ancho, - mitad_alto, this.ancho, this.alto);
		
		if (disparando) {
			var mitad_ancho_chorro = Math.floor(chorro.ancho / 2);
			var alto = (fuerzaAgua / maxFuerzaAgua) * chorro.alto;

			contexto.drawImage(graficos[this.chorro], - mitad_ancho_chorro, - mitad_alto * 0.95 - alto, chorro.ancho, alto);
		}	
		
		contexto.restore();
	}
	
	function cogerManguera(coordenada) {
		if (disparando)
			return;
	
		if (intervaloManguera)
			clearInterval(intervaloManguera);
	
		intervaloManguera = setInterval(function() {
			if (fuerzaAgua < maxFuerzaAgua)
				fuerzaAgua += 0.1;
			else
				disparar();
		}, 100);
		
		fuerzaAgua = 0;
		moviendoManguera = true;
	}
	
	function soltarManguera(coordenada) {
		if (disparando)
			return;
	
		if (moviendoManguera)
			disparar();
	}
	
	function disparar() {
		clearInterval(intervaloManguera);
		
		moviendoManguera = false;
		disparando = true;
		
		setTimeout(function() {
			disparando = false;
			manguera.reiniciar();
		}, 1000);
		
		// Calcular punto de impacto del chorro
		var alto_chorro = (fuerzaAgua / maxFuerzaAgua) * chorro.alto;
		// Restamos el ancho de la manguera por un espacio vacio que hay al final de la imagen
		var hipotenusa = (manguera_dimensiones.alto - manguera_dimensiones.ancho) / 2 + alto_chorro;
		
		//var x = lienzo.ancho / 2 - Math.cos(manguera.rotacion) * hipotenusa;
		//var y = lienzo.alto + Math.sin(manguera.rotacion) * hipotenusa;
		var angulo = Math.PI / 2 - manguera.rotacion;
		//var sentido = Math.cos(angulo) > 0 ? 1 : -1;
		
		var x = Math.cos(angulo) * hipotenusa + manguera.x + manguera.ancho / 2;
		var y = lienzo.alto - Math.sin(angulo) * hipotenusa;
		
		var grados = angulo * 180 / Math.PI;
		console.log(grados)
		console.log(x + "," + y)
		
		this.impacto = { x: x, y: y };
		
		for (var i = 0; i < fuegos.length; i++)
			if (fuegos[i].mostrando && fuegos[i].colision(this.impacto)) {
				fuegos[i].mostrando = false;
				numFuegosApagados++;
			}
	}
}