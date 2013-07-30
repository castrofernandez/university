circo.juegos.Topos = function(canvas)
{
	this.imagenes = ['img/topos/golpea.png', 
					'img/topos/fondo_cuerpo.png', 
					'img/topos/hoyo.png', 
					'img/topos/topo.png', 
					'img/topos/semi_hoyo.png', 
					'img/topos/frente.png'];
	
	var alto_cabecera = 0;
	var alto_cuerpo = 0;
	var alto_pie = 0;
	
	var topos = [];
	var numToposActivos = 0;
	
	var instanteInicial = null;
	
	var fondo = null;
	
	var puntuacion = 0;
	
	var subidas = 	[
						{ topo: 0, instante: 1000 },
						{ topo: 2, instante: 2000 },
						{ topo: 1, instante: 4000 },
						{ topo: 3, instante: 6000 },
						{ topo: 4, instante: 8000 },
						{ topo: 1, instante: 8000 },
						{ topo: 5, instante: 10000 },
						{ topo: 0, instante: 12000 },
						{ topo: 1, instante: 12000 },
						{ topo: 2, instante: 14000 },
						{ topo: 3, instante: 16000 },
						{ topo: 4, instante: 17000 },
						{ topo: 5, instante: 18000 },
					];
	
	this.iniciar = function(partida)
	{
		var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
	
		// Calculamos alto de cabecera, cuerpo, y pie del juego
		alto_cabecera = parseInt((2 / 10) * lienzo.alto);
		alto_cuerpo = parseInt((7 / 10) * lienzo.alto);
		alto_pie = lienzo.alto - alto_cabecera - alto_cuerpo;
		
		fondo = new Fondo(partida, 0, 0, lienzo.ancho, lienzo.alto);
		
		crearTopos(partida, lienzo.ancho, alto_cuerpo);
		
		instanteInicial = new Date();
	}
	
	this.finalizado = function()
	{
		return subidas.length == 0 && numToposActivos == 0;
	}
	
	//var instante = 0;
	
	this.avanzar = function(coordenada)
	{
		var instante = (new Date()).getTime() - instanteInicial.getTime();
		
		if (subidas.length > 0 && instante >= subidas[0].instante)
		{
			topos[subidas[0].topo].mover();
			subidas.shift();
		}
	//	instante += 30;
	
		for(var i = 0; i < topos.length; i++)
			topos[i].avanzar();	
	}
	
	this.dibujar = function(contexto, ancho, alto, graficos)
	{
	//	dibujarCabecera(contexto, graficos, ancho, alto_cabecera);
	//	dibujarFondo(contexto, graficos, ancho, alto_cuerpo);
	//	dibujarPie(contexto, graficos, ancho, alto_pie);
		
		//for(var i = 0; i < topos.length; i++)
		//	topos[i].dibujar(contexto, graficos);
	}
	
	function Fondo(partida, x, y, ancho, alto)
	{
		var elemento = partida.crearElemento(x, y, ancho, alto); 
	
		elemento.dibujar = function(contexto, ancho, alto, graficos, idioma)
		{
			dibujarCabecera(contexto, graficos, ancho, alto_cabecera);
			dibujarFondo(contexto, graficos, ancho, alto_cuerpo);
			dibujarPie(contexto, graficos, ancho, alto_pie);
		}
	
		function dibujarFondo(contexto, graficos, ancho, alto)
	    {
	    	var x = 0;
		    var y = alto_cabecera;
	    
		    // Establecemos imagen de fondo
	    	contexto.drawImage(graficos['img/topos/fondo_cuerpo.png'], x, y, ancho, alto);
		    
		    // Triángulos laterales
		    var ancho_triangulo = parseInt(ancho / 40);
		    var alto_trinagulo = parseInt(alto / 1.5);
		    
			xuegu.Graficos.triangulo(contexto, x, y, x + ancho_triangulo, y, x, y + alto_trinagulo, '#bf376e');
			xuegu.Graficos.triangulo(contexto, ancho - ancho_triangulo, y, ancho, y, ancho, y + alto_trinagulo, '#bf376e');
			xuegu.Graficos.linea(contexto, x + ancho_triangulo, y, x, y + alto_trinagulo, '#a7762b');
			xuegu.Graficos.linea(contexto, ancho - ancho_triangulo, y, ancho, y + alto_trinagulo, '#a7762b');
			
			// Dibujamos línea superior
		    xuegu.Graficos.linea(contexto, x + ancho_triangulo, y, ancho - ancho_triangulo, y, '#a7762b');
	    };
	    
		function dibujarCabecera(contexto, graficos, ancho, alto)
		{
			var x = 0;
			var y = 0;
		
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
			contexto.drawImage(graficos['img/topos/golpea.png'], x + ancho_rectangulo + margen * 2, y + margen, 
				ancho_texto, alto_texto);
		  
		    dibujarMarcador(contexto, graficos, x, y, ancho, alto);
		}
		
		function dibujarMarcador(contexto, graficos, x, y, ancho, alto)
		{
			var alto_marcador = alto / 1.5;
			var margen = (alto - alto_marcador) / 2;
			var x_marcador = ancho - alto * 1.2;
			xuegu.Graficos.rectanguloRedondeado(contexto, x_marcador, y + margen, alto, alto_marcador, 8, '#581720', '#9f4865', 4); 
			
			var ancho_digito = alto / 3;
			var alto_digito = alto_marcador * 0.7;
			var margen_digito_x = ancho_digito / 4;
			var margen_digito_y = alto_marcador * 0.15
			
			var digito1 = parseInt(puntuacion / 10);
			var digito2 = puntuacion % 10;
			
			dibujarDigito(contexto, graficos, x_marcador + margen_digito_x, y + margen + margen_digito_y, 
								ancho_digito, alto_digito, digito(digito1));
			dibujarDigito(contexto, graficos, x_marcador + margen_digito_x * 3 + ancho_digito, y + margen + margen_digito_y, 
								ancho_digito, alto_digito, digito(digito2));
		}
		
		function dibujarDigito(contexto, graficos, x, y, ancho, alto, d)
		{
			var ancho_digito = ancho * 0.5;
			var margen_x = ancho * 0.25;
			var alto_digito = alto * 0.40;
			var margen_y = alto * 0.1;
			
			var color_marcado = '#f4f0a7';
			var color_desmarcado = '#a05e67';
			
			// Línea superior
			xuegu.Graficos.linea(contexto, x + margen_x, y, x + margen_x + ancho_digito, y, 
									d[0] ? color_marcado : color_desmarcado, 6, 'round');
			
			// Línea medio
			xuegu.Graficos.linea(contexto, x + margen_x, y + alto / 2, x + margen_x + ancho_digito, y + alto / 2, 
									d[1] ? color_marcado : color_desmarcado, 6, 'round');
			
			// Línea inferior
			xuegu.Graficos.linea(contexto, x + margen_x, y + alto, x + margen_x + ancho_digito, y + alto, 
									d[2] ? color_marcado : color_desmarcado, 6, 'round');
			
			// Líneas izquierda
			xuegu.Graficos.linea(contexto, x, y, x, y + alto_digito,  d[3] ? color_marcado : color_desmarcado, 4, 'round');
			xuegu.Graficos.linea(contexto, x, y + margen_y * 2 + alto_digito, x, y + margen_y * 2 + alto_digito * 2,  
									d[4] ? color_marcado : color_desmarcado, 6, 'round');
			
			// Líneas derecha
			xuegu.Graficos.linea(contexto, x + margen_x * 2 + ancho_digito, y, x + margen_x * 2 + ancho_digito, y + alto_digito,  
									d[5] ? color_marcado : color_desmarcado, 6, 'round');
			xuegu.Graficos.linea(contexto, x + margen_x * 2 + ancho_digito, y + margen_y * 2 + alto_digito, x + margen_x * 2 + 
									ancho_digito, y + margen_y * 2 + alto_digito * 2,  
									d[6] ? color_marcado : color_desmarcado, 6, 'round');
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
		
		function dibujarPie(contexto, graficos, ancho, alto)
		{
			var x = 0;
			var y = alto_cabecera + alto_cuerpo;
		
		    xuegu.Graficos.rectangulo(contexto, x, y, ancho, alto, '#cd9130');
		    
		    // Dibujamos línea superior
		    xuegu.Graficos.linea(contexto, x, y, ancho, y, '#a7762b', 2);
		    
		    // Texto "Golpea al topo"
		    var tam = parseInt(ancho / 4.5);
		    var margen = parseInt(alto / 6);
		    contexto.drawImage(graficos['img/topos/golpea.png'], x + margen, y + margen, tam, tam);
		    
		    // Texto
		    margen = parseInt(alto / 6);
		    contexto.drawImage(graficos['img/topos/frente.png'], ancho - alto * 3 - margen, y + margen, alto * 3, alto);
		}
	}
	
    function crearTopos(partida, ancho, alto)
    {
    	var x = 0;
    	var y = alto_cabecera;
    
	    // Creamos los topos
	    var ancho_topo = Math.min(ancho / 4, alto / 3);
	    var margen_x = ancho_topo / 2;
	    var alto_topo = alto / 4;
	    var margen_y = (alto - 3 * alto_topo) / 4;
	    
	    var margen_perspectiva = margen_x / 4;

	    // Arriba-Izquierda
	    topos[0] = new Topo(partida, x + margen_x, y + margen_y, ancho_topo, alto_topo);

	    // Arriba-Derecha
	    topos[1] = new Topo(partida, x + ancho - margen_x - ancho_topo, 
	    	y + margen_y, ancho_topo, alto_topo);
	    
	    // Medio-Izquierda
	    topos[2] = new Topo(partida, x + margen_x - margen_perspectiva, 
	    	y + margen_y * 2 + alto_topo, ancho_topo, alto_topo);
	    
	    // Medio-Derecha
	    topos[3] = new Topo(partida, x + ancho - margen_x - ancho_topo + margen_perspectiva, 
	    	y + margen_y * 2 + alto_topo, ancho_topo, alto_topo);
	    
	    // Medio-Izquierda
	    topos[4] = new Topo(partida, x + margen_x - margen_perspectiva * 2, y + margen_y * 3 + alto_topo * 2, 
	    	ancho_topo, alto_topo);
	    
	    // Medio-Derecha
	    topos[5] = new Topo(partida, x + ancho - margen_x - ancho_topo + margen_perspectiva * 2, 
	    	y + margen_y * 3 + alto_topo * 2, ancho_topo, alto_topo);
    };

	
	function Topo(partida, x, y, ancho, alto)
	{
		var elemento = partida.crearElemento(x, y, ancho, alto, { onclick: topoOnClick }); 
		//this.x = x;
		//this.y = y;
		//this.ancho = ancho;
		//this.alto = alto;
		
		var estados = { BAJANDO: -1, ARRIBA: 0, SUBIENDO: 1, ABAJO: 2 };
		
		var avance = 0;
		var avance_max = alto / 3.3;
		var paso = 1;
		var parado = true;
		var estado = estados.ABAJO;
		var tiempo = null;
		
		var imagen_hoyo = 'img/topos/hoyo.png';
		var imagen_topo = 'img/topos/topo.png';
		var imagen_semihoyo = 'img/topos/semi_hoyo.png';
		
		elemento.avanzar = function() 
		{
			switch(estado)
			{
				case estados.BAJANDO: // El topo está bajando
					if (avance <= 0)
						topoEnMadriguera();
					else
						avance -= paso;
					break;
				case estados.ARRIBA: // El topo está arriba, pasará a estar bajando
					if (new Date() - tiempo >= 2000)
					{
						estado = estados.BAJANDO;
					}
					break;
				case estados.SUBIENDO: // El topo está subiendo
					if (avance >= avance_max)
					{
						estado = estados.ARRIBA;
						tiempo = new Date();
					}
					else
						avance += paso;
					break;
				case estados.ABAJO: // El topo está abajo
					break;
			}	
		};
		
		elemento.mover = function()
		{
			if (!parado || estado != estados.ABAJO)
				return;
				
			parado = false;
			estado = estados.SUBIENDO;	
			numToposActivos++;
		};
		
		elemento.dibujar = function(contexto, ancho, alto, graficos, idioma) 
		{
			contexto.drawImage(graficos[imagen_hoyo], this.x, this.y, this.ancho, this.alto);
			contexto.drawImage(graficos[imagen_topo], this.x, this.y - avance, this.ancho, this.alto);
			contexto.drawImage(graficos[imagen_semihoyo], this.x, this.y, this.ancho, this.alto);
		};
		
		function topoEnMadriguera()
		{
			parado = true;
			avance = 0;
			estado = estados.ABAJO;
			numToposActivos--;
		}
		
		function topoOnClick(coordenada)
		{
			if (estado == estados.SUBIENDO || estado == estados.ARRIBA)
			{
				puntuacion++;
				
				topoEnMadriguera();
			}
		}
		
		return elemento;
	}
}
