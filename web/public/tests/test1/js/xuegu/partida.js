xuegu.Partida = function(canvas, nivel, idioma, accionFinal, partidaAnterior, auditoriaUsuario, inicio)
{
	var contexto = null;
	var ancho = canvas.width;
	var alto = canvas.height;

	var velocidad = 30;

	var graficos = {};

	var registroAuditoria = new auditoria.Prueba(nivel.identificador, inicio);
	this.auditoria = auditoriaUsuario;
	this.auditoriaPrueba = registroAuditoria;

	var manejadores = this.manejadores = new xuegu.Manejadores(canvas, registroAuditoria);

	this.idioma = idioma;

	this.elementos = [];
	var partida = this;

	var intervalo = null;

	this.graficos = function()
	{
		return graficos;
	}

	this.iniciar = function()
	{
		contexto = canvas.getContext('2d');

		contexto.fillStyle = "#666";
		contexto.font = "18px Verdana";
		contexto.textAlign = 'center';

		if (nivel.velocidad)
			velocidad = nivel.velocidad;

		this.cargarImagenes(nivel.imagenes);
	}

	this.cargarImagenes = function(imagenes)
	{
		if (!imagenes || imagenes.length == 0)
		{
			iniciarNivel();

			return;
		}

		var numero = imagenes.length;

		for (var i = 0; i < imagenes.length; i++)
		{
			var imagen = new Image();

			imagen.onload = function() {
				numero--;

				if (numero == 0)
					iniciarNivel();
			}

			imagen.src = imagenes[i];

			graficos[imagenes[i]] = imagen;
		}
	}

	function iniciarNivel()
	{
		if (nivel.iniciar)
			nivel.iniciar(partida, partidaAnterior);

		intervalo = setInterval(bucleJuego, velocidad);
	}

	this.crearElemento = function(x, y, ancho, alto, opciones)
	{
		var elemento = new xuegu.Elemento(this, x, y, ancho, alto, opciones);

		this.elementos.push(elemento);

		return elemento;
	}

	this.crearElementoRotable = function(x, y, ancho, alto, opciones)
	{
		var elemento = new xuegu.ElementoRotable(this, x, y, ancho, alto, opciones);

		this.elementos.push(elemento);

		return elemento;
	}

	this.dibujar = function()
	{
		for (var i = 0; i < this.elementos.length; i++)
			this.elementos[i].dibujar(contexto, ancho, alto, graficos, idioma, partidaAnterior);

		nivel.dibujar(contexto, ancho, alto, graficos, idioma, partidaAnterior);
	}

	function bucleJuego()
	{
		nivel.avanzar(partida);

		// Limpiar canvas
		contexto.clearRect(0, 0, ancho, alto);

		partida.dibujar();

		if (nivel.finalizado())
		{
			registroAuditoria.parar();
			manejadores.parar();
			auditoriaUsuario.incluirPrueba(registroAuditoria.data);

			clearInterval(intervalo);

			if (nivel.finalizar)
				nivel.finalizar(partida);

			accionFinal();
		}
	}
}
