circo.intermedios.Resultado3 = function(canvas)
{
	this.identificador = "resultado3";
	this.imagenes = [];

	this.velocidad = 150;

	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);

	var pulsado = false;

	var tu_edad_mental = null;
	var pulsa_finalizar = null;
	var si = null;
	var no = null;
	var hombre = null;
	var mujer = null;
	var eres = null;
	var diestro = null;
	var zurdo = null;
	var cualEsTuEdad = null;
	var acertado = null;

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

	var auditoria = null;

	(function() {

	})();

	this.iniciar = function(partida)
	{
		auditoria = partida.auditoriaPrueba

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
		acertado = partida.idioma.texto("acertado");

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
										{ dibujar: dibujarFondo, identificador: "fondo" });

		// Botón

		// Sí / No de edad

		var ancho = lienzo.ancho * 2 / 4;
		var alto = lienzo.alto / 10;
		var posY = papel.y + papel.alto - alto * 2.8;

		var opciones = { x: lienzo.ancho / 2 - ancho / 2, y: posY, tipo: "redondeado",
							partida: partida, ancho: ancho, alto: alto, relleno: '#c8113f',
							contorno: false, grosor: 3, texto: si, colorTexto: '#fff', sombra: '#B6945E', fuente: "24px Verdana",
							"identificador": "SiSexo" };

		opciones.onclick = pulsarBotonSi;

		var botonSi = botonSiEdad = new circo.intermedios.util.Boton(opciones);

		var posY = papel.y + papel.alto - alto * 1.5;

		var opciones = { x: lienzo.ancho / 2 - ancho / 2, y: posY, tipo: "redondeado",
							partida: partida, ancho: ancho, alto: alto, relleno: '#c8113f',
							contorno: false, grosor: 3, texto: no, colorTexto: '#fff', sombra: '#B6945E', fuente: "24px Verdana",
							"identificador": "NoSexo" };

		opciones.onclick = pulsarBotonNo;

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
		contexto.fillText(eres, ancho / 2, papel.y + papel.alto / 15);

		contexto.font = categorizr.isMobile ? "50px Conv_Carnevalee Freakshow" : "70px Conv_Carnevalee Freakshow";
		contexto.fillText(resultado.sexo == 0 ? hombre : mujer, ancho / 2, papel.y + papel.alto / 3.2);

		contexto.font = "24px Verdana";
		contexto.fillText(acertado, ancho / 2, papel.y + papel.alto / 2);
	}

	this.finalizado = function()
	{
		return pulsado;
	}

	function pulsarBotonSi() {
		registrarDato("GENDER_SUCCESS", "TRUE");
		registrarDato("GENDER_VALUE", resultado.sexo == 0 ? "MAN" : "WOMAN");
		pulsado = true;
	};

	function pulsarBotonNo() {
		registrarDato("GENDER_SUCCESS", "FALSE");
		registrarDato("GENDER_VALUE", resultado.sexo == 0 ? "WOMAN" : "MAN");
		pulsado = true;
	};

	function registrarDato(identificador, valor) {
		var observacion = {
			element: identificador,
			event: "answer",
			value: valor,
			instant: auditoria.instante()
		};

		auditoria.data.observations.push(observacion);
	}

	function aleatorio(min, max)
	{
  	return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
