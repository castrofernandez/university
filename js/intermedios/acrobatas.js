circo.intermedios.Acrobatas = function()
{
	this.velocidad = 150;
	
	var dimension_acrobata = { ancho : 145, alto : 200};
	var lienzo = xuegu.Utilidades.dimensionesJuego();
	
	var lado_triangulo = lienzo.ancho / 4;
	var lado_cuadrado = lienzo.ancho / 2;
	var diagonal_cuadrado = Math.sqrt(2 * lado_cuadrado * lado_cuadrado);
	
	// Calculamos la posición del suelo de los acróbatas
	// Para que el cuadrado quepa según su mayor longitud (es la diagonal)
	// Los otros cálculos (+ diagonal_cuadrado / 2 - lado_cuadrado / 2)
	// Restan la diferencia de altura entre los triángulos y el cuadrado
	// Restamos 10 al final para dar un pequeño margen.
	var suelo_y = lienzo.alto - diagonal_cuadrado + diagonal_cuadrado / 2 - lado_cuadrado / 2 - 10;
	
	var imagenes_acrobata = ['img/intermedios/acrobatas/acrobata1.png', 'img/intermedios/acrobatas/acrobata2.png', 'img/intermedios/acrobatas/acrobata3.png' ,'img/intermedios/acrobatas/acrobata4.png'];
	var imagenes_acrobata_inverso = ['img/intermedios/acrobatas/acrobata5.png', 'img/intermedios/acrobatas/acrobata6.png', 'img/intermedios/acrobatas/acrobata7.png' ,'img/intermedios/acrobatas/acrobata8.png'];
	
	this.imagenes = imagenes_acrobata.concat(imagenes_acrobata_inverso);
	
	var incremento_acrobata = 20;
	var recorrido = lienzo.ancho * 1.2;
	
	var acrobata1 = new Acrobata(lienzo.ancho - dimension_acrobata.ancho * 4 / 5, suelo_y - dimension_acrobata.alto + 10, dimension_acrobata.ancho, dimension_acrobata.alto, incremento_acrobata, recorrido, false, true);
	var acrobata2 = new Acrobata(0 - incremento_acrobata, suelo_y - dimension_acrobata.alto + 10, dimension_acrobata.ancho, dimension_acrobata.alto, incremento_acrobata, recorrido, true, false);
	var tablon = new Tablon(lienzo.ancho / 2, suelo_y + lado_triangulo, lienzo.ancho - 2 * lado_triangulo);
	
	var estados = {
					JUGANDO : 'JUGANDO', 
					FINALIZANDO : 'FINALIZANDO', 
					FINALIZADO : 'FINALIZADO'};
					
	var estado = estados.JUGANDO;
	/*
	function cargar_imagenes(imagenes)
	{
		var numero = imagenes.length;
		
		for (var i = 0; i < imagenes.length; i++)
		{
			var imagen = new Image();
			
			imagen.onload = function() {
				numero--;
				
				if (numero == 0)
					iniciar();
			}
			
			imagen.src = imagenes[i];
			
			graficos[imagenes[i]] = imagen;
		}
	}
	*/
	this.iniciar = function(partida)
	{
		canvas.onmousedown = function(event)
		{
			if (estado != estados.JUGANDO)
				return;
			
			var x = event.offsetX?(event.offsetX):event.pageX - canvas.offsetLeft;
		    var y = event.offsetY?(event.offsetY):event.pageY - canvas.offsetTop;
		    
		    tablon.mousedown(x, y);
		}
		
		canvas.onmouseup = function(event)
		{
			if (estado != estados.JUGANDO)
				return;
			
			var x = event.offsetX?(event.offsetX):event.pageX - canvas.offsetLeft;
		    var y = event.offsetY?(event.offsetY):event.pageY - canvas.offsetTop;
		    
		    tablon.mouseup(x, y);
		}
		
		canvas.onmousemove = function(event)
		{
			if (estado != estados.JUGANDO)
				return;
			
			var x = event.offsetX?(event.offsetX):event.pageX - canvas.offsetLeft;
		    var y = event.offsetY?(event.offsetY):event.pageY - canvas.offsetTop;
		    
		    tablon.mousemove(x, y);
		}
	
		//setInterval(bucle, 150);
	}
	
	this.avanzar = function(partida)
	{	

	}
	
	this.finalizado = function(partida)
	{
		return acrobata1.finalizado() && acrobata2.finalizado();
	}
	
	this.dibujar = function(contexto, ancho, alto, graficos, idioma)
	{
		// Limpiar canvas
		//contexto.clearRect (0, 0, ancho, alto);
		
		// Fondo
		
		var barra = ancho / 17;
		
		for (var i = 0; i < 17; i++)
		{
			contexto.beginPath();
			contexto.rect(barra * i, 0, barra, alto);
			contexto.fillStyle = i % 2 == 0 ? '#e25470' : '#f1f1f3';
			contexto.fill();
		}
		
		contexto.beginPath();
		contexto.rect(0, 0, ancho, alto / 12);
		contexto.fillStyle = "#f5f5d1";
		contexto.fill();
		
		contexto.beginPath();
		contexto.rect(0, alto / 12, ancho, 5);
		contexto.fillStyle = "#00979d";
		contexto.fill();
		
		contexto.fillStyle = "#694806";
		contexto.font = "14px Verdana";
		contexto.textAlign = 'center';
		contexto.fillText(idioma.texto("acrobata1"), ancho / 2, 20);
		contexto.fillText(idioma.texto("acrobata2"), ancho / 2, 35);
		
		// Triángulos
		
		xuegu.Graficos.triangulo(contexto, ancho, suelo_y, ancho - lado_triangulo, suelo_y, ancho, suelo_y + lado_triangulo, 
									"#00979d", false, null, true);
		xuegu.Graficos.triangulo(contexto, 0, suelo_y, lado_triangulo, suelo_y, 0, suelo_y + lado_triangulo, "#00979d", false, null, true);
		
		// Tablón
		
		tablon.dibujar(contexto, ancho, alto, graficos);
		
		// Acróbatas
		
		acrobata1.avanzar(estado).dibujar(contexto, ancho, alto, graficos);
		acrobata2.avanzar(estado).dibujar(contexto, ancho, alto, graficos);
	}
	
	function Tablon(centro_x, centro_y, lado)
	{
		var radio = Math.sqrt(lado * lado / 2);
		
		var eje = radio / 10;
		
		var angulo = 0;
		
		var punto_contacto = null;
		var moviendose = false;
		
		var umbral_colocacion = 3;
		
		this.dibujar = function(contexto, ancho, alto, graficos)
		{
			var puntos = obtener_vertices(angulo);
			
			var punto_1 = puntos[0];
			var punto_2 = puntos[1];
			var punto_3 = puntos[2];
			var punto_4 = puntos[3];
	
			// Cuadrado
			
			xuegu.Graficos.aplicarSombra(contexto);
			
			contexto.beginPath();
			contexto.fillStyle = "#00979d";
			
			contexto.moveTo(punto_1.x, punto_1.y);
			contexto.lineTo(punto_2.x, punto_2.y);
			contexto.lineTo(punto_3.x, punto_3.y);
			contexto.lineTo(punto_4.x, punto_4.y);
			contexto.lineTo(punto_1.x, punto_1.y);
		
			contexto.fill();
			
			// Eje
			
			contexto.beginPath();
			contexto.fillStyle = "#1a6264";
			contexto.arc(centro_x, centro_y, eje, 0, 2 * Math.PI);
			contexto.fill();
			
			xuegu.Graficos.limpiarSombra(contexto);
		}
	
		this.mousedown = function(x, y)
		{
			var vertices_poligono = obtener_vertices(angulo);	
			var punto = { x : x, y : y };
			
			if (esta_punto_en_poligono(vertices_poligono, punto))
			{
				punto_contacto = { x : x, y : y };
				moviendose = true;	
			}
		}
		
		this.mouseup = function(x, y)
		{
			moviendose = false;
		}
		
		this.mousemove = function(x, y)
		{
			if (!moviendose)
				return;
			
			var vertices_poligono = obtener_vertices(angulo);	
			var punto = { x : x, y : y };
			
			if (esta_punto_en_poligono(vertices_poligono, punto))
			{
				var p1 = punto_contacto;
				var p2 = {x: x, y: y};
		
				// Calculamos el ángulos entre las 2 rectas
				// 1º recta: centro - punto 1
				// 2º recta: centro - punto 2
				var angulo_1 = Math.atan2(centro_y - p1.y, centro_x - p1.x);
				var angulo_2 = Math.atan2(centro_y - p2.y, centro_x - p2.x);
				
		        var radianes = angulo_1 - angulo_2;
		        var grados = radianes * 180 / Math.PI;
		        
		        // Incrementamos el ángulo entre los 2 puntos   
				angulo -= grados;
				punto_contacto = p2; // p2 es el nuevo punto de contacto, para que no sea acumulativo
				
				if (cuadrado_colocado())
					estado = estados.FINALIZANDO;
			}
			else
				moviendose = false;
		}
		
		function cuadrado_colocado()
		{
			var vertices = obtener_vertices(angulo);
	
			return	arista_horizontal_o_vertical(vertices[0], vertices[1]) &&
					arista_horizontal_o_vertical(vertices[1], vertices[2]) &&
					arista_horizontal_o_vertical(vertices[2], vertices[3]) &&
					arista_horizontal_o_vertical(vertices[3], vertices[0]);
		}
		
		function arista_horizontal_o_vertical(punto_1, punto_2)
		{
			return 	Math.abs(punto_1.x - punto_2.x) < umbral_colocacion ||
					Math.abs(punto_1.y - punto_2.y) < umbral_colocacion;
		}
		
		function esta_punto_en_poligono(poligono, punto)
		{
		    for(var c = false, i = -1, l = poligono.length, j = l - 1; ++i < l; j = i)
		        ((poligono[i].y <= punto.y && punto.y < poligono[j].y) || (poligono[j].y <= punto.y && punto.y < poligono[i].y))
		        && (punto.x < (poligono[j].x - poligono[i].x) * (punto.y - poligono[i].y) / (poligono[j].y - poligono[i].y) + poligono[i].x)
		        && (c = !c);
		    
		    return c;
	    }
	
		function obtener_vertices(angulo)
		{
			var punto_1 = punto_en_angulo(angulo);
			var punto_2 = punto_en_angulo(angulo + 90);
			var punto_3 = punto_en_angulo(angulo + 180);
			var punto_4 = punto_en_angulo(angulo + 270);
			
			return [ punto_1, punto_2, punto_3, punto_4 ];
		}
	
		function punto_en_angulo(angulo)
		{
			var radianes = angulo * (Math.PI / 180)
		
			var x = centro_x + Math.sin(radianes) * radio;
			var y = centro_y - Math.cos(radianes) * radio;
			
			return { x : x, y : y };
		}
	}
	
	function Acrobata(x, y, ancho, alto, incremento_inicial, incremento_final, inverso, adelante)
	{
		var contador = -1;
		var pos_X = x;
		var avance_inicial = 5;
		var avance_final = 15;
		
		var movimiento_inicial = adelante;
		
		var finalizado = false;
	
		this.finalizado = function()
		{
			return finalizado;
		}
	
		this.avanzar = function(estado)
		{
			if (estado == estados.FINALIZANDO)
				adelante = movimiento_inicial;
		
			var avance = estado == estados.JUGANDO ? avance_inicial : avance_final;	
		
			if (adelante)
			{
				pos_X -= avance;
				
				if (pos_X < x - incrementar(estado))
					adelante = false;
				
				if (estado == estados.FINALIZANDO && pos_X < x)
					finalizado = true; 
			}
			else
			{
				pos_X += avance;
				
				if (pos_X > x)
					adelante = true;
					
				if (estado == estados.FINALIZANDO && pos_X > lienzo.ancho)
					finalizado = true;
			}
			
			if (adelante)
			{	
				contador++;
				
				if (contador == 4)
					contador = 0;	
			}
			else
			{
				contador--;
				
				if (contador == -1)
					contador = 3;
			}	
			
			return this;
		}
		
		function incrementar(estado)
		{
			return estado == estados.JUGANDO ? incremento_inicial : incremento_final;
		}
	
		this.dibujar = function(contexto, anchoLienzo, anchoLienzo, graficos)
		{
			var imagen = inverso ? imagenes_acrobata_inverso : imagenes_acrobata;
			contexto.drawImage(graficos[imagen[contador]], pos_X, y, ancho, alto);
			
			return this;
		}
	}
}