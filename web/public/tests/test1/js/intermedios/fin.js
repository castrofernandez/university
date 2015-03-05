circo.intermedios.Fin = function(canvas)
{
	this.identificador = "fin";
	this.imagenes = ['img/intermedios/fin/facebook.png',
					'img/intermedios/fin/twitter.png'];

	var dimensionesBoton = null;
	var margen = null;
	var lienzo = null;

	var gracias = null;
	var comparte = null;

	var sitio = "http://www.circoneuronal.org";
	var twitter_url = null;
	var facebook_url = null;


	(function() {

	})();

	this.iniciar = function(partida)
	{
		// URL

		var texto = partida.idioma.texto("descubre_en");
		var gratis = partida.idioma.texto("es_gratis");

		twitter_url = "http://twitter.com/share?url=" + sitio + "&text=" + texto + sitio + gratis;
		facebook_url = "http://www.facebook.com/sharer.php?u=" + sitio;

		gracias = partida.idioma.texto("gracias");
		comparte = partida.idioma.texto("comparte");

		// Botones facebook y twitter

		var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);
		var dimension_icono = lienzo.ancho / 4;
		/*
		// twitter
		var opciones = { x: lienzo.ancho / 2 - dimension_icono / 2, y: lienzo.alto / 3, tipo: "personalizado",
							partida: partida, ancho: dimension_icono, alto: dimension_icono, dibujar: dibujarBoton,
							imagen: 'img/intermedios/fin/twitter.png' };

		opciones.onclick = pulsarTwitter;

		new circo.intermedios.util.Boton(opciones);

		// facebook
		var opciones = { x: lienzo.ancho / 2 - dimension_icono / 2, y: lienzo.alto / 3 + dimension_icono * 1.5, tipo: "personalizado",
							partida: partida, ancho: dimension_icono, alto: dimension_icono, dibujar: dibujarBoton,
							imagen: 'img/intermedios/fin/facebook.png' };

		opciones.onclick = pulsarFacebook;

		new circo.intermedios.util.Boton(opciones);
		*/
	}

	this.avanzar = function(partida)
	{

	}

	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		contexto.fillStyle = '#BC1B43';
		contexto.font = "25px Conv_Carnevalee Freakshow";
		//contexto.fillText(gracias, ancho / 2, alto / 6);
		contexto.fillText(gracias, ancho / 2, alto / 2);

		//contexto.fillStyle = '#580A1E';
		//contexto.fillText(comparte, ancho / 2, alto / 4);
	}

	function dibujarBoton(contexto, ancho, alto, graficos)
	{
		contexto.drawImage(graficos[this.imagen], this.x, this.y, this.ancho, this.alto);
	}

	this.finalizado = function()
	{
		return true;
	}

	function pulsarTwitter() {
		window.open(twitter_url);
	}

	function pulsarFacebook() {
		window.open(facebook_url);
	}
}
