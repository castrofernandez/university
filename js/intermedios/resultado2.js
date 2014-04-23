circo.intermedios.Resultado2 = function(canvas)
{		
	this.identificador = "resultado2";
	this.imagenes = [];
					
	this.velocidad = 150;

	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);

	var pulsado = false;
	
	var tu_edad_mental = null;
	var pulsa_finalizar = null;
	var si = null;
	var no = null;
	var hombre = null;
	var eres = null;
	var diestro = null;
	var zurdo = null;
	var cualEsTuEdad = null;
	
	var edadOriginal = aleatorio(15, 55);
	
	var resultado = {
		edad: edadOriginal,
		sexo: aleatorio(0, 1),
		lateralidad: aleatorio(0, 1)
	};
	
	var abertura = null;
	var ranura =  null;
	var papel = null;
	
	var botonSiEdad = null;

	(function() {

	})();

	this.iniciar = function(partida)
	{						
		// Etiquetas
		
		tu_edad_mental = partida.idioma.texto("tu_edad_mental");
		pulsa_finalizar = partida.idioma.texto("pulsa_finalizar");
		si = partida.idioma.texto("si");
		no = partida.idioma.texto("no");
		hombre = partida.idioma.texto("hombre");
		mujer = partida.idioma.texto("mujer");
		eres = partida.idioma.texto("eres");
		diestro = partida.idioma.texto("diestro");
		zurdo = partida.idioma.texto("zurdo");
		cualEsTuEdad = partida.idioma.texto("cual_es_tu_edad");
		
		// Papel
		
		abertura = {
			ancho: lienzo.ancho * 9 / 10,
			alto: lienzo.alto / 10,
			x: lienzo.ancho / 2 - (lienzo.ancho * 9 / 10)	/ 2,
			y: lienzo.alto / 10
		};
		
		ranura = {
			ancho: abertura.ancho - abertura.alto / 2,
			alto: abertura.alto / 2,
			x: lienzo.ancho / 2 - (abertura.ancho - abertura.alto / 2) / 2,	
			y: abertura.y + abertura.alto / 4
		};
		
		papel = {
			ancho: ranura.ancho * 9 / 10,
			alto: lienzo.alto - 1.2 * ranura.y,
			x: lienzo.ancho / 2 - (ranura.ancho * 9 / 10) / 2,
			y: ranura.y	
		};
		
		// Creamos el fondo
		partida.crearElemento(0, 0, lienzo.ancho, lienzo.alto, 
										{ dibujar: dibujarFondo });
		
		// Botón
		
		var ancho = lienzo.ancho * 2 / 4;
		var alto = lienzo.alto / 10;
		var posY = papel.y + papel.alto - alto * 1.2;
		
		var opciones = { x: lienzo.ancho / 2 - ancho / 2, y: posY, tipo: "redondeado", 
							partida: partida, ancho: ancho, alto: alto, relleno: '#c8113f', 
							contorno: false, grosor: 3, texto: pulsa_finalizar, colorTexto: '#fff', sombra: '#B6945E' };
		
		opciones.onclick = botonPulsado;
			
		new circo.intermedios.util.Boton(opciones);
		
		// Sí / No de edad
		
		var ancho = lienzo.ancho / 8;
		var alto = lienzo.alto / 12;
		var posY = papel.y + papel.alto / 9;
		
		var posX = papel.ancho - ancho / 5;
		
		var opciones = { x: posX, y: posY, tipo: "redondeado", 
							partida: partida, ancho: ancho, alto: alto, relleno: '#E7C185', 
							contorno: false, grosor: 3, texto: si, colorTexto: '#302a1b', sombraInterna: '#8B724A', fuente: "24px Verdana" };
		
		opciones.estaPulsado = true;
		
		opciones.onclick = pulsarBotonSiNoEdad;
		
		var botonSi = botonSiEdad = new circo.intermedios.util.Boton(opciones);
		
		var opciones = { x: posX, y: posY + alto * 1.2, tipo: "redondeado", 
							partida: partida, ancho: ancho, alto: alto, relleno: '#F7D89B', 
							contorno: false, grosor: 0.5, texto: no, colorTexto: '#4E4430', sombra: '#B6945E', fuente: "24px Verdana" };
		
		opciones.estaPulsado = false;
		
		opciones.onclick = pulsarBotonSiNoEdad;		
		
		var botonNo = new circo.intermedios.util.Boton(opciones);
		
		botonSi.otroBoton = botonNo;
		botonNo.otroBoton = botonSi;
		
		// Sí / No de sexo
		
		var ancho = lienzo.ancho / 8;
		var alto = lienzo.alto / 12;
		var posY = papel.y + papel.alto / 2.7;
		
		var posX = papel.ancho - ancho / 5;
		
		var opciones = { x: posX, y: posY, tipo: "redondeado", 
							partida: partida, ancho: ancho, alto: alto, relleno: '#E7C185', 
							contorno: false, grosor: 3, texto: si, colorTexto: '#302a1b', sombraInterna: '#8B724A', fuente: "24px Verdana" };
		
		opciones.estaPulsado = true;
		
		opciones.onclick = pulsarBotonSiNoSexo;
		
		var botonSi = new circo.intermedios.util.Boton(opciones);
		
		var opciones = { x: posX, y: posY + alto * 1.2, tipo: "redondeado", 
							partida: partida, ancho: ancho, alto: alto, relleno: '#F7D89B', 
							contorno: false, grosor: 3, texto: no, colorTexto: '#302a1b', sombra: '#B6945E', fuente: "24px Verdana" };
		
		opciones.estaPulsado = false;
		
		opciones.onclick = pulsarBotonSiNoSexo;
		
		var botonNo = new circo.intermedios.util.Boton(opciones);
		
		botonSi.otroBoton = botonNo;
		botonNo.otroBoton = botonSi;
		
		// Sí / No de lateralidad
		
		var ancho = lienzo.ancho / 8;
		var alto = lienzo.alto / 12;
		var posY = papel.y + papel.alto / 1.6;
		
		var posX = papel.ancho - ancho / 5;
		
		var opciones = { x: posX, y: posY, tipo: "redondeado", 
							partida: partida, ancho: ancho, alto: alto, relleno: '#E7C185', 
							contorno: false, grosor: 3, texto: si, colorTexto: '#302a1b', sombraInterna: '#8B724A', fuente: "24px Verdana" };
		
		opciones.estaPulsado = true;
		
		opciones.onclick = pulsarBotonSiNoLateralidad;
		
		var botonSi = new circo.intermedios.util.Boton(opciones);
		
		var opciones = { x: posX, y: posY + alto * 1.2, tipo: "redondeado", 
							partida: partida, ancho: ancho, alto: alto, relleno: '#F7D89B', 
							contorno: false, grosor: 3, texto: no, colorTexto: '#302a1b', sombra: '#B6945E', fuente: "24px Verdana" };
		
		opciones.estaPulsado = false;
		
		opciones.onclick = pulsarBotonSiNoLateralidad;
		
		var botonNo = new circo.intermedios.util.Boton(opciones);
		
		botonSi.otroBoton = botonNo;
		botonNo.otroBoton = botonSi;
	}
		
	this.avanzar = function(partida)
	{	

	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos) {
		
	}
	
	function botonPulsado() {
		pulsado = true;
	}
	
	function dibujarFondo(contexto, ancho, alto, graficos)
	{
		// Fondo
		xuegu.Graficos.rectangulo(contexto, 0, 0, lienzo.ancho, lienzo.alto, '#c8002d');

		// Abertura
		
		var ancho_abertura = ancho * 9 / 10;
		xuegu.Graficos.rectangulo(contexto, abertura.x, abertura.y, abertura.ancho, abertura.alto, '#810000');
		
		xuegu.Graficos.rectangulo(contexto, ranura.x, ranura.y, ranura.ancho, ranura.alto, '#302a1b');
		
		// Papel 
		
		xuegu.Graficos.rectangulo(contexto, papel.x, papel.y, papel.ancho, papel.alto, '#ffdda7');
		
		contexto.fillStyle = '#302a1b';
		contexto.font = "24px Verdana";
		contexto.fillText(tu_edad_mental, ancho / 2, papel.y + papel.alto / 15);
		
		contexto.font = categorizr.isMobile ? "120px Conv_Carnevalee Freakshow" : "200px Conv_Carnevalee Freakshow";
		contexto.fillText(resultado.edad, ancho / 2, papel.y + papel.alto / 3.2);
		
		contexto.fillStyle = '#302a1b';
		contexto.font = "24px Verdana";
		contexto.fillText(eres, ancho / 2, papel.y + papel.alto / 2.3);
		
		contexto.font = categorizr.isMobile ? "28px Conv_Carnevalee Freakshow" : "50px Conv_Carnevalee Freakshow";
		contexto.fillText(resultado.sexo == 0 ? hombre : mujer, ancho / 2, papel.y + papel.alto / 1.9);
		
		contexto.fillStyle = '#302a1b';
		contexto.font = "24px Verdana";
		contexto.fillText(eres, ancho / 2, papel.y + papel.alto / 1.5);
		
		contexto.font = categorizr.isMobile ? "28px Conv_Carnevalee Freakshow" : "50px Conv_Carnevalee Freakshow";
		contexto.fillText(resultado.lateralidad == 0 ? diestro : zurdo, ancho / 2, papel.y + papel.alto / 1.3);
	}
	
	this.finalizado = function()
	{
		return pulsado;
	}

	function pulsarBotonSiNoEdad() {
		if (pulsarBotonSiNo.call(this)) {
			if (botonSiEdad.estaPulsado)
				resultado.edad = edadOriginal;
			else {
				var edad = prompt(cualEsTuEdad, resultado.edad);
				
				if (edad && edad < 100)
					resultado.edad = edad;
				
				if (resultado.edad == edadOriginal) {
					pulsarBotonSiNo.call(botonSiEdad);	
				}
			}
		}
	};
	
	function pulsarBotonSiNoSexo() {
		if (pulsarBotonSiNo.call(this))
			resultado.sexo = resultado.sexo == 0 ? 1 : 0;
	};
	
	function pulsarBotonSiNoLateralidad() {
		if (pulsarBotonSiNo.call(this))
			resultado.lateralidad = resultado.lateralidad == 0 ? 1 : 0;
	};
	
	function pulsarBotonSiNo() {
		if (this.estaPulsado)
			return false;
		
		pulsarBoton(this);
		pulsarBoton(this.otroBoton);
		
		return true;
	};
	
	function pulsarBoton(boton) {
		if (boton.estaPulsado) {
			boton.relleno = '#F7D89B';
			boton.sombraInterna = false;
			boton.sombra = '#B6945E';
			boton.colorTexto = '#4E4430';
			
			boton.estaPulsado = false;
		}
		else {
			boton.relleno = '#E7C185';
			boton.sombraInterna = '#8B724A';
			boton.sombra = false;
			boton.colorTexto = '#302a1b';
			
			boton.estaPulsado = true;
		}
	};
	
	function aleatorio(min, max)
	{
    	return Math.floor(Math.random() * (max - min + 1) + min);
    }
}