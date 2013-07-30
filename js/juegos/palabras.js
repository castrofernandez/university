circo.juegos.Palabras = function(canvas)
{
	var pato = null;
	
	var palabras = ['En', 'un', 'lugar', 'de', 'la', 'Mancha'];
	
	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	
	var patos = [];
	var patos_atras = [];
	
	var num_olas = 7;
	var tam_ola = lienzo.ancho / num_olas;
	var ancho_alto_pato = tam_ola * 1.5;
	
	var y_atras = lienzo.alto / 5;
	var y = lienzo.alto * 3 / 5;
	
	this.imagenes = ['img/palabras/pato_frente.png', 'img/palabras/pato_atras.png', 'img/palabras/ola_1.png', 
					'img/palabras/ola_2.png', 'img/palabras/ola_3.png', 'img/palabras/ola_4.png', 
					'img/palabras/diana.png', 'img/palabras/toldo_1.png', 'img/palabras/toldo_2.png'];
	
	
	(function ()
	{
		var ancho = lienzo.ancho;
	
		for (var i = 0; i < palabras.length; i++)
			patos.push(ancho + ancho_alto_pato + ancho_alto_pato * 2 * i);
		
		for (var i = 0; i < palabras.length * 2; i++)
			patos_atras.push(0 - ancho_alto_pato - ancho_alto_pato * 2 * i);
	})();
	
	this.iniciar = function(partida)
	{
		var input = document.getElementById('canvas-input');
		input.placeholder = partida.idioma.texto('escribe');
		input.style.display = 'block';
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
		return patos[patos.length - 1] + ancho_alto_pato < 0;
	}
	
	this.avanzar = function(coordenada)
	{
		// Patos secundarios
		for (var i = 0; i < patos_atras.length; i++)
			patos_atras[i]++;
			
		// Patos principales
		for (var i = 0; i < patos.length; i++)
			patos[i]--;
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
		
			// Zócalo
		    
		    xuegu.Graficos.rectangulo(contexto, 0, y_atras + tam_ola / 2 + tam_ola, ancho, tam_ola, '#405c9e');
		    
		    xuegu.Graficos.rectangulo(contexto, 0, y_atras + tam_ola / 2 + tam_ola, ancho, tam_ola / 10, '#283961');
		    
		    // Dianas
		    
			for (var i = 0; i < num_olas; i++)
				if (i % 2 == 0)
					contexto.drawImage(graficos['img/palabras/diana.png'], 
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
			
			var incremento = ancho_alto_pato / 5;
			var incrementoTexto = 4 / 5 * ancho_alto_pato - incremento;
			
			// Patos principales
			for (var i = 0; i < patos.length; i++)
			{
				contexto.drawImage(graficos['img/palabras/pato_frente.png'], patos[i], y - incremento, 
					ancho_alto_pato, ancho_alto_pato);
				contexto.textAlign = 'center';
				contexto.fillText(palabras[i], patos[i] + ancho_alto_pato / 2, y + incrementoTexto);
			
				//patos[i]--;
			}
			
			// Olas frontales
			
			for (var i = 0; i < num_olas; i++)
				contexto.drawImage(i % 2 == 0 ? graficos['img/palabras/ola_1.png'] : graficos['img/palabras/ola_2.png'], 
									tam_ola * i, y + tam_ola * 6 / 10, tam_ola, tam_ola);
									
			// Zócalo
			
		    xuegu.Graficos.rectangulo(contexto, 0, y + tam_ola / 2 + tam_ola, ancho, tam_ola, '#405c9e');
		    
		    xuegu.Graficos.rectangulo(contexto, 0, y + tam_ola / 2 + tam_ola, ancho, tam_ola / 10, '#283961');
		    
		    // Dianas
		    
			for (var i = 0; i < num_olas; i++)
				if (i % 2 == 0)
					contexto.drawImage(graficos['img/palabras/diana.png'], 
									tam_ola * i + tam_ola / 6, y + tam_ola * 1.5 + tam_ola / 6, tam_ola / 1.5, tam_ola / 1.5);
	}
}