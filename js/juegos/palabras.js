circo.juegos.Palabras = function()
{
	var pato = null;
	
	var palabras = ['En', 'un', 'lugar', 'de', 'la', 'Mancha'];
	
	var patos = [];
	var patos_atras = [];
	
	var ancho_alto_pato = 80;
	var num_olas = 7;
	var tam_ola = xuegu.Utilidades.dimensionesJuego().ancho / num_olas;
	
	var y_atras = 50;
	var y = 230;
	
	this.imagenes = ['img/palabras/pato_frente.png', 'img/palabras/pato_atras.png', 'img/palabras/ola_1.png', 
					'img/palabras/ola_2.png', 'img/palabras/ola_3.png', 'img/palabras/ola_4.png', 'img/palabras/diana.png', 'img/palabras/toldo_1.png', 'img/palabras/toldo_2.png'];
	
	
	(function ()
	{
		var ancho = xuegu.Utilidades.dimensionesJuego().ancho;
	
		for (var i = 0; i < palabras.length; i++)
			patos.push(ancho + ancho_alto_pato + ancho_alto_pato * 2 * i);
		
		for (var i = 0; i < palabras.length * 2; i++)
			patos_atras.push(0 - ancho_alto_pato - ancho_alto_pato * 2 * i);
	})();
	
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
		// Toldo
		
		for (var i = 0; i < num_olas; i++)
				contexto.drawImage(i % 2 == 0 ? graficos['img/palabras/toldo_1.png'] : graficos['img/palabras/toldo_2.png'], 
									tam_ola * i, 0, tam_ola, tam_ola);
		
		/* Patos traseros */
		
			// Barras
			
			var y_barras = y_atras + tam_ola;
			
			for (var i = 0; i < num_olas; i++)
			{
			    xuegu.Graficos.rectangulo(contexto, tam_ola * i, y_barras, tam_ola, alto - y_barras, i % 2 == 0 ? '#98002b' : '#e5e5e8');
			}
			
			for (var i = 0; i < num_olas + 1; i++)
				contexto.drawImage(graficos['img/palabras/ola_4.png'], tam_ola * i - tam_ola / 2, y_atras + tam_ola / 6, tam_ola, tam_ola);
			
			// Patos secundarios
			for (var i = 0; i < patos_atras.length; i++)
			{
				contexto.drawImage(graficos['img/palabras/pato_atras.png'], patos_atras[i], y_atras, ancho_alto_pato, ancho_alto_pato);
			
				//patos_atras[i]++;
			}
			
			// Olas frontales
			
			for (var i = 0; i < num_olas; i++)
				contexto.drawImage(i % 2 == 0 ? graficos['img/palabras/ola_2.png'] : graficos['img/palabras/ola_3.png'], 
									tam_ola * i, y_atras + tam_ola / 2, tam_ola, tam_ola);
		
			// Zócalo
			
		    xuegu.Graficos.rectangulo(contexto, 0, y_atras + tam_ola / 2 + tam_ola, ancho, tam_ola, '#405c9e');
		    
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
			    xuegu.Graficos.rectangulo(contexto, tam_ola * i, y_barras, tam_ola, alto - y_barras, i % 2 == 0 ? '#d10033' : '#ffffff');
			}
		
			// Olas traseras
			
			for (var i = 0; i < num_olas + 1; i++)
				contexto.drawImage(graficos['img/palabras/ola_4.png'], tam_ola * i - tam_ola / 2, y + tam_ola / 6, tam_ola, tam_ola);
			
			contexto.fillStyle = "#555";
			
			// Patos principales
			for (var i = 0; i < patos.length; i++)
			{
				contexto.drawImage(graficos['img/palabras/pato_frente.png'], patos[i], y, ancho_alto_pato, ancho_alto_pato);
				contexto.textAlign = 'center';
				contexto.fillText(palabras[i], patos[i] + ancho_alto_pato / 2, y + 4 / 5 * ancho_alto_pato);
			
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