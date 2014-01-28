xuegu.ElementoRotable = function(partida, x, y, ancho, alto, opciones)
{
	this.base = xuegu.Elemento;
	this.base(partida, x, y, ancho, alto, opciones);
	
	this.anguloAnterior = 0;
	this.angulo = 0;
	this.rotacion = 0; // Ángulo acumulativo
	
	var moviendose = false;
	
	var centro_x = x + ancho / 2;
	var centro_y = y + alto / 2;

	var posicion_inicial = [
		{ x : x, y : y },
		{ x : x + ancho, y : y },
		{ x : x + ancho, y : y + alto },
		{ x : x, y : y + alto }
	];
		
	var vertices = clone(posicion_inicial);
	
	// Distancia del centro a un vértice
	var radio = Math.sqrt(Math.pow(ancho / 2, 2) + Math.pow(alto / 2, 2));
	
	function iniciarMovimiento(coordenada) {
		punto_contacto = { x : coordenada.x, y : coordenada.y };
		moviendose = true;
		
		this.angulo = 0;
		this.anguloAnterior = 0;
	};
	
	this.registrarMouseDown(iniciarMovimiento);
	this.registrarTouchStart(iniciarMovimiento);
	
	function finalizarMovimiento(coordenada) {
		moviendose = false;
	};
	
	this.registrarMouseUp(finalizarMovimiento);
	this.registrarTouchEnd(finalizarMovimiento);
	
	function mover(coordenada) {
		if (!moviendose)
			return;
			
		var p1 = punto_contacto;
		var p2 = {x: coordenada.x, y: coordenada.y};

		// Calculamos el ángulos entre las 2 rectas
		// 1º recta: centro - punto 1
		// 2º recta: centro - punto 2
		var angulo_1 = Math.atan2(centro_y - p1.y, centro_x - p1.x);
		var angulo_2 = Math.atan2(centro_y - p2.y, centro_x - p2.x);
		
        var radianes = angulo_1 - angulo_2;
        
        // Incrementamos el ángulo entre los 2 puntos   
        this.anguloAnterior = this.angulo;
		//this.angulo -= grados;
		this.angulo = -1 * radianes;
		this.rotacion -= radianes;
		
		punto_contacto = p2; // p2 es el nuevo punto de contacto, para que no sea acumulativo
		
		this.rotarVertices();
	};
	
	this.registrarMouseMove(mover);
	this.registrarTouchMove(mover);
	
	this.dibujar = function(contexto, ancho, alto, graficos, idioma, partidaAnterior) {
		contexto.beginPath();
		contexto.fillStyle = "#000";
		
		contexto.moveTo(vertices[0].x, vertices[0].y);
		contexto.lineTo(vertices[1].x, vertices[1].y);
		contexto.lineTo(vertices[2].x, vertices[2].y);
		contexto.lineTo(vertices[3].x, vertices[3].y);
		contexto.lineTo(vertices[0].x, vertices[0].y);
	
		contexto.stroke();

		opciones.dibujar.call(this, contexto, ancho, alto, graficos, idioma, partidaAnterior);
	}

	this.colision = function(coordenada)
	{
		for (var i = 0; i < vertices.length; i++) {
			var siguiente = i == vertices.length - 1 ? 0 : i + 1;
			
			var vertice1 = vertices[i];
			var vertice2 = vertices[siguiente];
			
			if (!compruebaLado(vertice1.x, vertice1.y, vertice2.x, vertice2.y, coordenada.x, coordenada.y)) {
				moviendose = false;
				
				return false;
			}
		}
		
		return true;
	}
	
	this.rotarVertices = function() {	
		var cos = Math.cos(this.angulo);
		var sin = Math.sin(this.angulo);
	
		for (var i = 0; i < vertices.length; i++) {
			var vertice = vertices[i];	
			vertice.x -= centro_x;
			vertice.y -= centro_y;
			
			var rotado = {
				x: centro_x + vertice.x * cos - vertice.y * sin,
				y: centro_y +  vertice.x * sin + vertice.y * cos	
			};
			
			vertices[i] = rotado;
		}
	};
	
	this.reiniciar = function() {
		this.anguloAnterior = 0;
		this.angulo = 0;
		this.rotacion = 0;
		vertices = clone(posicion_inicial); // Clone
		
		this.rotarVertices();
	}
	
	function compruebaLado(x1, y1, x2, y2, x, y) {
		var a = -(y2 - y1);
		var b = x2 - x1;
		var c = -(a * x1 + b * y1);

		var d = a * x + b * y + c;
		
		return d > 0;
	};
	
	function clone(obj) {
		return (JSON.parse(JSON.stringify(obj)));
	}
};