circo.juegos.Topos = function()
{
	this.imagenes = ['img/topos/golpea.png', 'img/topos/fondo_cuerpo.png', 'img/topos/hoyo.png', 'img/topos/topo.png', 'img/topos/semi_hoyo.png'];
	
	var cuerpo;
	
	(function ()
	{
		var lienzo = document.getElementById('canvas-juego');
	
		// Calculamos ancho y alto del lienzo
		// Si damos ancho en CSS (100%) distorsiona la imagen
		var dimensiones = xuegu.Utilidades.dimensionesJuego();
		var ancho_lienzo = dimensiones.anchura;
		var alto_lienzo = dimensiones.altura;
		lienzo.width = ancho_lienzo;
		lienzo.height = alto_lienzo;
		
		// Calculamos alto de cabecera, cuerpo, y pie del juego
		var alto_cabecera = parseInt((2 / 10) * alto_lienzo);
		var alto_cuerpo = parseInt((7 / 10) * alto_lienzo);
		var alto_pie = alto_lienzo - alto_cabecera - alto_cuerpo;
	
		// Obtenemos contexto del lienzo
		var contexto = lienzo.getContext('2d');
		
		// Crear cabecera
		crearCabecera(contexto, 0, 0, ancho_lienzo, alto_cabecera);
		
		// Crear cuerpo
		cuerpo = new Cuerpo(contexto, 0, alto_cabecera, ancho_lienzo, alto_cuerpo);
		
		// Crear pie
		crearPie(contexto, 0, alto_cabecera + alto_cuerpo, ancho_lienzo, alto_pie);
		
		// Comienza el juego
		cuerpo.topos[0].tiempos = [0, 2000, 4000];
		cuerpo.topos[3].tiempos = [1000, 3000];
	})();
	
	function crearCabecera(contexto, graficos, x, y, ancho, alto)
	{
	    xuegu.Graficos.rectangulo(contexto, x, y, ancho, alto, '#d9aa41');
	    
	    // rectángulos laterales
	    var ancho_rectangulo = parseInt(ancho / 40);
	    xuegu.Graficos.rectangulo(contexto, x, y, ancho_rectangulo, alto, '#bf376e');
	    xuegu.Graficos.rectangulo(contexto, ancho - ancho_rectangulo, y, ancho_rectangulo, alto, '#bf376e');
	    xuegu.Graficos.linea(contexto, x + ancho_rectangulo, y, x + ancho_rectangulo, y + alto, '#a7762b');
	    xuegu.Graficos.linea(contexto, ancho - ancho_rectangulo, y, ancho - ancho_rectangulo, y + alto, '#a7762b');
	    
	    // Texto "Golpea al topo"
		var alto_texto = parseInt(alto / 1.2);
		var ancho_texto = parseInt(ancho / 2);
		var margen = (alto - alto_texto) / 2;
		contexto.drawImage(graficos['img/topos/golpea.png'], x + ancho_rectangulo + margen * 2, y + margen, ancho_texto, alto_texto);
	  
	    crearMarcador(contexto, graficos, x, y, ancho, alto);
	}
	
	
	function crearMarcador(contexto, graficos, x, y, ancho, alto)
	{
		var alto_marcador = alto / 1.5;
		var margen = (alto - alto_marcador) / 2;
		var x_marcador = ancho - alto * 1.5;
		xuegu.Graficos.rectanguloRedondeado(contexto, x_marcador, y + margen, alto, alto_marcador, 8, '#581720', '#9f4865', 4); 
		
		var ancho_digito = alto / 3;
		var alto_digito = alto_marcador * 0.7;
		var margen_digito_x = ancho_digito / 4;
		var margen_digito_y = alto_marcador * 0.15
		crearDigito(contexto, graficos, x_marcador + margen_digito_x, y + margen + margen_digito_y, ancho_digito, alto_digito, digito(7));
		crearDigito(contexto, graficos, x_marcador + margen_digito_x * 3 + ancho_digito, y + margen + margen_digito_y, ancho_digito, alto_digito, digito(9));
	}
	
	function crearDigito(contexto, graficos, x, y, ancho, alto, d)
	{
		var ancho_digito = ancho * 0.5;
		var margen_x = ancho * 0.25;
		var alto_digito = alto * 0.40;
		var margen_y = alto * 0.1;
		
		var color_marcado = '#f4f0a7';
		var color_desmarcado = '#a05e67';
		
		// Línea superior
		xuegu.Graficos.linea(contexto, x + margen_x, y, x + margen_x + ancho_digito, y, d[0] ? color_marcado : color_desmarcado, 4, 'round');
		
		// Línea medio
		xuegu.Graficos.linea(contexto, x + margen_x, y + alto / 2, x + margen_x + ancho_digito, y + alto / 2, d[1] ? color_marcado : color_desmarcado, 4, 'round');
		
		// Línea inferior
		xuegu.Graficos.linea(contexto, x + margen_x, y + alto, x + margen_x + ancho_digito, y + alto, d[2] ? color_marcado : color_desmarcado, 4, 'round');
		
		// Líneas izquierda
		xuegu.Graficos.linea(contexto, x, y, x, y + alto_digito,  d[3] ? color_marcado : color_desmarcado, 4, 'round');
		xuegu.Graficos.linea(contexto, x, y + margen_y * 2 + alto_digito, x, y + margen_y * 2 + alto_digito * 2,  d[4] ? color_marcado : color_desmarcado, 4, 'round');
		
		// Líneas derecha
		xuegu.Graficos.linea(contexto, x + margen_x * 2 + ancho_digito, y, x + margen_x * 2 + ancho_digito, y + alto_digito,  d[5] ? color_marcado : color_desmarcado, 4, 'round');
		xuegu.Graficos.linea(contexto, x + margen_x * 2 + ancho_digito, y + margen_y * 2 + alto_digito, x + margen_x * 2 + ancho_digito, y + margen_y * 2 + alto_digito * 2,  d[6] ? color_marcado : color_desmarcado, 4, 'round');
	}
	
	function digito(numero)
	{
		switch(numero)
		{
			case 0:
				return [true, false, true, true, true, true, true];
			case 1:
				return [false, false, false, false, false, true, true];
			case 2:
				return [true, true, true, false, true, true, false];
			case 3:
				return [true, true, true, false, false, true, true];
			case 4:
				return [false, true, false, true, false, true, true];
			case 5:
				return [true, true, true, true, false, false, true];
			case 6:
				return [true, true, true, true, true, false, true];
			case 7:
				return [true, false, false, false, false, true, true];
			case 8:
				return [true, true, true, true, true, true, true];
			case 9:
				return [true, true, true, true, false, true, true];
		}
	}
	
	function Cuerpo(contexto, graficos, x, y, ancho, alto)
	{
		this.contexto = contexto;
		this.x = x;
		this.y = y;
		this.ancho = ancho;
		this.alto = alto;
	
		this.topos = [];
	    
		this.finalizado = function()
		{
			for(var i = 0; i < this.topos.length; i++)
				if (!this.topos[i].finalizado())
					return false;
			
			return true;
		};
		
	    this.dibujar_fondo = function(contexto, ancho, alto, graficos)
	    {
		    // Establecemos imagen de fondo
	    	this.contexto.drawImage(graficos['img/topos/fondo_cuerpo.png'], this.x, this.y, this.ancho, this.alto);
		    
		    // Triángulos laterales
		    var ancho_triangulo = parseInt(this.ancho / 40);
		    var alto_trinagulo = parseInt(this.alto / 1.5);
			xuegu.Graficos.triangulo(this.contexto, this.x, this.y, this.x + ancho_triangulo, this.y, this.x, this.y + alto_trinagulo, '#bf376e');
			xuegu.Graficos.triangulo(this.contexto, this.ancho - ancho_triangulo, this.y, this.ancho, this.y, this.ancho, this.y + alto_trinagulo, '#bf376e');
			xuegu.Graficos.linea(this.contexto, this.x + ancho_triangulo, this.y, this.x, this.y + alto_trinagulo, '#a7762b');
			xuegu.Graficos.linea(this.contexto, this.ancho - ancho_triangulo, this.y, this.ancho, this.y + alto_trinagulo, '#a7762b');
			
			// Dibujamos línea superior
		    xuegu.Graficos.linea(this.contexto, this.x + ancho_triangulo, this.y, this.ancho - ancho_triangulo, this.y, '#a7762b');
	    };
	    
	    this.crear_topos = function()
	    {
		    // Creamos los topos
		    var ancho_topo = Math.min(ancho / 4, alto / 3);
		    var margen_x = ancho_topo / 2;
		    var alto_topo = alto / 4;
		    var margen_y = (alto - 3 * alto_topo) / 4;
		    
		    var margen_perspectiva = margen_x / 4;
	
		    // Arriba-Izquierda
		    this.topos[0] = new Topo(contexto, x + margen_x, y + margen_y, ancho_topo, alto_topo);
	
		    // Arriba-Derecha
		    this.topos[1] = new Topo(contexto, x + ancho - margen_x - ancho_topo, 
		    	y + margen_y, ancho_topo, alto_topo);
		    
		    // Medio-Izquierda
		    this.topos[2] = new Topo(contexto, x + margen_x - margen_perspectiva, 
		    	y + margen_y * 2 + alto_topo, ancho_topo, alto_topo);
		    
		    // Medio-Derecha
		    this.topos[3] = new Topo(contexto, x + ancho - margen_x - ancho_topo + margen_perspectiva, 
		    	y + margen_y * 2 + alto_topo, ancho_topo, alto_topo);
		    
		    // Medio-Izquierda
		    this.topos[4] = new Topo(contexto, x + margen_x - margen_perspectiva * 2, y + margen_y * 3 + alto_topo * 2, ancho_topo, alto_topo);
		    
		    // Medio-Derecha
		    this.topos[5] = new Topo(contexto, x + ancho - margen_x - ancho_topo + margen_perspectiva * 2, 
		    	y + margen_y * 3 + alto_topo * 2, ancho_topo, alto_topo);
	    };
	    
	    this.dibujar = function(contexto, ancho, alto, graficos)
	    {
			this.dibujar_fondo(contexto, ancho, alto, graficos);
			
			for(var i = 0; i < this.topos.length; i++)
				this.topos[i].dibujar(contexto, ancho, alto, graficos);
	    };
	    
	    this.crear_topos();
	}
	/*
	function animar(instante)
	{
		if(!cuerpo.finalizado())
		{
			instante += 30;
			
			mostrar_fotograma(instante);
			setTimeout('animar(' + instante + ');', instante);	
		}
	}
	*/
	var instante = 0;
	
	this.avanzar = function(coordenada)
	{
		instante += 30;
	
		for(var i = 0; i < cuerpo.topos.length; i++)
			cuerpo.topos[i].avanzar(instante);	
	}
	
	this.dibujar = function(contexto, ancho, alto, graficos)
	{
		cuerpo.dibujar(contexto, ancho, alto, graficos);
	}
	
	function Topo(contexto, graficos, x, y, ancho, alto)
	{
		this.contexto = contexto;
		this.x = x;
		this.y = y;
		this.ancho = ancho;
		this.alto = alto;
		
		this.avance = 0;
		this.avance_max = alto / 3.3;
		this.paso = 1;
		this.parado = true;
		this.estado = 2;
		this.tiempo = null;
		
		this.imagen_hoyo = new Image();
		this.imagen_hoyo.src = 'img/topos/hoyo.png';
		
		this.imagen_topo = new Image();
		this.imagen_topo.src = 'img/topos/topo.png';
		
		this.imagen_semihoyo = new Image();
		this.imagen_semihoyo.src = 'img/topos/semi_hoyo.png';
		
		this.tiempos = [];
		
		this.finalizado = function()
		{
			return this.parado && this.tiempos.length == 0;
		};
		
		this.avanzar = function(instante) 
		{
			//if (this.parado)
			//	return;
	
			switch(this.estado)
			{
				case -1: // El topo está bajando
					if (this.avance <= 0)
					{
						this.parado = true;
						this.avance = 0;
						this.estado = 2;
					}
					else
						this.avance -= this.paso;
					break;
				case 0: // El topo está arriba, pasará a estar bajando
					if (new Date() - this.tiempo >= 2000)
					{
						this.estado = -1;
					}
					break;
				case 1: // El topo está subiendo
					if (this.avance >= this.avance_max)
					{
						this.estado = 0;
						this.tiempo = new Date();
					}
					else
						this.avance += this.paso;
					break;
				case 2: // El topo está abajo
					if (this.tiempos.length > 0 && instante >= this.tiempos[0])
					{
						this.mover();
						this.tiempos.shift();
					}
					break;
			}	
		};
		
		this.mover = function()
		{
			if (!this.parado || this.estado != 2)
				return;
				
			this.parado = false;
			this.estado = 1;	
		};
		
		this.dibujar = function() 
		{
			mostrarImagenDesdeImg(contexto, this.imagen_hoyo, this.x, this.y, this.ancho, this.alto)
			mostrarImagenDesdeImg(contexto, this.imagen_topo, this.x, this.y - this.avance, this.ancho, this.alto)
			mostrarImagenDesdeImg(contexto, this.imagen_semihoyo, this.x, this.y, this.ancho, this.alto)
		};
		
		//this.dibujar(0);
	}
	
	function crearPie(contexto, graficos, x, y, ancho, alto)
	{
	    xuegu.Graficos.rectangulo(contexto, x, y, ancho, alto, '#cd9130');
	    
	    // Dibujamos línea superior
	    linea(contexto, x, y, ancho, y, '#a7762b', 2);
	    
	    // Texto "Golpea al topo"
	    var tam = parseInt(ancho / 4.5);
	    var margen = parseInt(alto / 6);
	    mostrarImagen(contexto, graficos['img/topos/golpea.png'], x + margen, y + margen, tam, tam);
	    
	    // Texto
	    margen = parseInt(alto / 6);
	    mostrarImagen(contexto, graficos['img/topos/frente.png'], ancho - alto * 3 - margen, y + margen, alto * 3, alto);
	}
}
