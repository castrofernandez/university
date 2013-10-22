circo.juegos.Anillas = function()
{
	this.identificador = "anillas";
	this.imagenes = ['img/anillas/fondo.png', 'img/anillas/esquina_izquierda.png', 'img/anillas/esquina_derecha.png',
					'img/anillas/fondo_invertido.png', 'img/anillas/toldo_1.png', 'img/anillas/toldo_2.png', 
					'img/anillas/botellas.png', 'img/anillas/cartel.png'];
	
	this.avanzar = function(coordenada)
	{
	
	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		dibujarFondo(contexto, ancho, alto, graficos);
	}
	
	var dibujarFondo =  function(contexto, ancho, alto, graficos)
	{
		// Pared fondo
		
		xuegu.Graficos.rectangulo(contexto, 0, 0, ancho, alto * 1 / 6, '#62471b');
	    
	    contexto.drawImage(graficos['img/anillas/cartel.png'], ancho * 1 / 4, alto * 1 / 24, ancho * 1 / 2, alto * 2 / 24);
	    
	    // Mesa fondo
	    
	    contexto.drawImage(graficos['img/anillas/fondo.png'], 0, alto * 1 / 6, ancho, alto * 1 / 6);
	    
	    // Esquinas
	    
	    xuegu.Graficos.rectangulo(contexto, 0, 0, ancho * 1 / 20, alto * 1 / 6, '#765626');
	    xuegu.Graficos.rectangulo(contexto, ancho * 19 / 20, 0, ancho * 1 / 20, alto * 1 / 6, '#765626');
	    
	    contexto.drawImage(graficos['img/anillas/esquina_izquierda.png'], 0, alto * 1 / 6, ancho * 1 / 20, alto * 1 / 6);
	    contexto.drawImage(graficos['img/anillas/esquina_derecha.png'], ancho * 19 / 20, alto * 1 / 6, ancho * 1 / 20, alto * 1 / 6);
	    
	    // Botellas
	    
	    var pos_y = alto * 1 / 6 - alto * 1 / 40;
	    
	    contexto.drawImage(graficos['img/anillas/botellas.png'], ancho * 1 / 12, pos_y, ancho * 3 / 9, alto * 1 / 6);
	    
	    var pos_x = ancho - ancho * 1 / 12 - ancho * 3 / 9; 
	    
	    contexto.drawImage(graficos['img/anillas/botellas.png'], pos_x, pos_y, ancho * 3 / 9, alto * 1 / 6);
	    
	    // Canto mesa
	    
	    xuegu.Graficos.rectangulo(contexto, 0, alto * 2 / 6, ancho, alto * 1 / 24, '#966e35');
	 
	 	// Patas mesa
	 	
	 	contexto.drawImage(graficos['img/anillas/fondo_invertido.png'], 0, alto * 9 / 24, ancho, alto * 2 / 24);   
	 	
	 	// Toldos
	 	
	 	contexto.drawImage(graficos['img/anillas/toldo_1.png'], 0, alto * 9 / 24, ancho * 1 / 6, alto * 1 / 24); 
	 	contexto.drawImage(graficos['img/anillas/toldo_2.png'], ancho * 1 / 6, alto * 9 / 24, ancho * 1 / 6, alto * 1 / 24);
	 	contexto.drawImage(graficos['img/anillas/toldo_1.png'], ancho * 2 / 6, alto * 9 / 24, ancho * 1 / 6, alto * 1 / 24);
	 	contexto.drawImage(graficos['img/anillas/toldo_2.png'], ancho * 3 / 6, alto * 9 / 24, ancho * 1 / 6, alto * 1 / 24);
	 	contexto.drawImage(graficos['img/anillas/toldo_1.png'], ancho * 4 / 6, alto * 9 / 24, ancho * 1 / 6, alto * 1 / 24);
	 	contexto.drawImage(graficos['img/anillas/toldo_2.png'], ancho * 5 / 6, alto * 9 / 24, ancho * 1 / 6, alto * 1 / 24); 
	 	
	 	// Mesa frontal
	 	
	 	contexto.drawImage(graficos['img/anillas/fondo.png'], 0, alto * 18 / 24, ancho, alto * 5 / 24);
	 	
	 	// Esquinas
	 	
	 	contexto.drawImage(graficos['img/anillas/esquina_izquierda.png'], 0, alto * 18 / 24, ancho * 1 / 40, alto * 5 / 24);
	    contexto.drawImage(graficos['img/anillas/esquina_derecha.png'], ancho * 39 / 40, alto * 18 / 24, ancho * 1 / 40, alto * 5 / 24);
	    
	    // Canto mesa
	    
	    xuegu.Graficos.rectangulo(contexto, 0, alto * 23 / 24, ancho, alto * 1 / 24, '#7c5a29');
	}
}