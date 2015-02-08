circo.juegos.Palabras = function(canvas)
{
	this.identificador = "palabras";
	var pato = null;

	var velocidad_pato = 30;

	var palabras = ['cocodrilo', 'veloz', 'perro', 'kiwi'];

	var palabraEnCurso = 0;

	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);

	var patos = [];
	var patos_atras = [];

	var num_olas = 7;
	var tam_ola = lienzo.ancho / num_olas;
	var ancho_alto_pato = tam_ola * 1.5;
	var ancho_alto_pato_delantero = categorizr.isMobile ? ancho_alto_pato * 2.5 : ancho_alto_pato * 1.5;

	var y_atras = lienzo.alto / 5;
	var y = lienzo.alto * 3 / 5;

	this.imagenes = ['img/palabras/pato_frente.png', 'img/palabras/pato_atras.png',
					'img/palabras/ola_1.png', 'img/palabras/ola_2.png', 'img/palabras/ola_3.png',
					'img/palabras/ola_4.png', 'img/palabras/diana.png', 'img/palabras/diana_atras.png',
					'img/palabras/toldo_1.png', 'img/palabras/toldo_2.png'];

	var input = null;
	var auditoria = null;

	(function ()
	{
		var ancho = lienzo.ancho;

		for (var i = 0; i < palabras.length; i++)
			patos.push(ancho);
			//patos.push(ancho + ancho_alto_pato + ancho_alto_pato * 2 * i);

		for (var i = 0; i < palabras.length * 2; i++)
			patos_atras.push(0 - ancho_alto_pato - ancho_alto_pato * 2 * i);
	})();

	this.iniciar = function(partida)
	{
		input = document.getElementById('canvas-input');
		input.placeholder = partida.idioma.texto('escribe');
		input.style.display = 'block';
		
		// Traducir palabras
		var length = palabras.length;
		
		for (var i = 0; i < length; i++)
			palabras[i] = partida.idioma.texto(palabras[i]);

		//input.colision = function() { return true; };

		//if (partida && partida.manejadores)
		//	partida.manejadores.keyup.registrarElemento(input);

		auditoria = partida.auditoriaPrueba;

		if (input.attachEvent)
			input.attachEvent("keyup", teclaPulsada);
		else
			input.addEventListener("keyup", teclaPulsada, false);

		circo.audio.circo.volume = 0.05;
		circo.audio.circo.play();

		circo.audio.circo.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);
	}

	function teclaPulsada(tecla) {
		var observacion = {
			element: "texto-palabras",
			event: "keyup",
			value: tecla.keyCode,
			instant: auditoria.instante()
		};

		auditoria.data.observations.push(observacion);

		// Se comprueba texto introducido
		var palabra = palabras[palabraEnCurso < palabras.length ? palabraEnCurso : 0];
		palabra = palabra.toLowerCase();

		var tecleado = input.value.toLowerCase();
		tecleado = tecleado.replace(/^\s+|\s+$/gm, ''); // Eliminamos espacios en blanco

		if (palabra == tecleado) {
			palabraEnCurso++;

			input.value = "";
		}
	}

	this.finalizar = function(partida)
	{
		var input = document.getElementById('canvas-input');
		input.style.display = 'none';

		document.activeElement.blur();
		input.blur();
	}

	this.finalizado = function()
	{
		return palabraEnCurso >= palabras.length;
		//return patos[patos.length - 1] + ancho_alto_pato < 0;
	}

	this.avanzar = function(coordenada)
	{
		// Patos secundarios
		for (var i = 0; i < patos_atras.length; i++)
			patos_atras[i]++;

		// Patos principales
		var medio = lienzo.ancho / 2 - ancho_alto_pato / 2;

		for (var i = 0; i <= palabraEnCurso && i < palabras.length; i++)
			if (i < palabraEnCurso || patos[i] > medio) {
				patos[i] -= velocidad_pato;

				if (patos[i] < medio)
					patos[i] = medio;
			}
	}

	this.dibujar = function(contexto, ancho, alto, graficos)
	{
		// Fondo

		xuegu.Graficos.rectangulo(contexto, 0, 0, ancho, alto, '#4C9CB5');

		// Toldo

		for (var i = 0; i < num_olas; i++)
				contexto.drawImage(i % 2 == 0 ? graficos['img/palabras/toldo_1.png'] : graficos['img/palabras/toldo_2.png'],
									tam_ola * i, 0, tam_ola, tam_ola);

		/* Patos traseros */

			// Barras

			var y_barras = y_atras + tam_ola;

			for (var i = 0; i < num_olas; i++)
			{
			    xuegu.Graficos.rectangulo(contexto, tam_ola * i, y_barras, tam_ola, alto - y_barras,
			    	i % 2 == 0 ? '#98002b' : '#e5e5e8');
			}

			for (var i = 0; i < num_olas + 1; i++)
				contexto.drawImage(graficos['img/palabras/ola_4.png'], tam_ola * i - tam_ola / 2, y_atras + tam_ola / 6,
					tam_ola, tam_ola);

			// Patos secundarios
			for (var i = 0; i < patos_atras.length; i++)
			{
				contexto.drawImage(graficos['img/palabras/pato_atras.png'], patos_atras[i], y_atras,
					ancho_alto_pato, ancho_alto_pato);

				//patos_atras[i]++;
			}

			// Olas frontales

			for (var i = 0; i < num_olas; i++)
				contexto.drawImage(i % 2 == 0 ? graficos['img/palabras/ola_2.png'] : graficos['img/palabras/ola_3.png'],
									tam_ola * i, y_atras + tam_ola / 2, tam_ola, tam_ola);

			// Z�calo

		    xuegu.Graficos.rectangulo(contexto, 0, y_atras + tam_ola / 2 + tam_ola, ancho, tam_ola, '#2D4172');

		    xuegu.Graficos.rectangulo(contexto, 0, y_atras + tam_ola / 2 + tam_ola, ancho, tam_ola / 10, '#182544');

		    // Dianas

			for (var i = 0; i < num_olas; i++)
				if (i % 2 == 0)
					contexto.drawImage(graficos['img/palabras/diana_atras.png'],
									tam_ola * i + tam_ola / 6, y_atras + tam_ola * 1.5 + tam_ola / 6, tam_ola / 1.5, tam_ola / 1.5);

		/* Patos delanteros */

			// Barras

			var y_barras = y + tam_ola;

			for (var i = 0; i < num_olas; i++)
			{
			    xuegu.Graficos.rectangulo(contexto, tam_ola * i, y_barras, tam_ola, alto - y_barras,
			    	i % 2 == 0 ? '#d10033' : '#ffffff');
			}

			// Olas traseras

			for (var i = 0; i < num_olas + 1; i++)
				contexto.drawImage(graficos['img/palabras/ola_4.png'], tam_ola * i - tam_ola / 2, y + tam_ola / 6,
					tam_ola, tam_ola);

			contexto.fillStyle = "#555";

			var incremento = ancho_alto_pato_delantero / 2;
			//var incrementoTexto = 4 / 5 * ancho_alto_pato_delantero - incremento;

			// Patos principales
			/*for (var i = 0; i < patos.length; i++)
			{
				contexto.drawImage(graficos['img/palabras/pato_frente.png'], patos[i], y - incremento,
					ancho_alto_pato, ancho_alto_pato);
				contexto.textAlign = 'center';
				contexto.fillText(palabras[i], patos[i] + ancho_alto_pato / 2, y + incrementoTexto);
			}*/
			contexto.drawImage(graficos['img/palabras/pato_frente.png'], patos[palabraEnCurso], y - incremento,
				ancho_alto_pato_delantero, ancho_alto_pato_delantero);


			// Texto
			contexto.textAlign = 'center';
			contexto.font = '26px Verdana';
			contexto.fillText(palabras[palabraEnCurso], patos[palabraEnCurso] + ancho_alto_pato_delantero / 1.8, y + ancho_alto_pato_delantero / 6);

			// Olas frontales

			for (var i = 0; i < num_olas; i++)
				contexto.drawImage(i % 2 == 0 ? graficos['img/palabras/ola_1.png'] : graficos['img/palabras/ola_2.png'],
									tam_ola * i, y + tam_ola * 6 / 10, tam_ola, tam_ola);

			// Z�calo

		    xuegu.Graficos.rectangulo(contexto, 0, y + tam_ola / 2 + tam_ola, ancho, tam_ola, '#405c9e');

		    xuegu.Graficos.rectangulo(contexto, 0, y + tam_ola / 2 + tam_ola, ancho, tam_ola / 10, '#283961');

		    // Dianas

			for (var i = 0; i < num_olas; i++)
				if (i % 2 == 0)
					contexto.drawImage(graficos['img/palabras/diana.png'],
									tam_ola * i + tam_ola / 6, y + tam_ola * 1.5 + tam_ola / 6, tam_ola / 1.5, tam_ola / 1.5);
	}
}
