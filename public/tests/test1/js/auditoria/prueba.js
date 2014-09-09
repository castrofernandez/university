if (!auditoria)
	var auditoria = new Object();

auditoria.Prueba = function(identificador)
{
	var data = this.data = new Object();

	this.data.identifier = identificador;
	this.data.observations = [];

	var tiempo = new Date();
	this.data.instant = tiempo;

	this.instante = obtenerInstante

	function obtenerInstante()
	{
		var ahora = new Date();
		var dif = tiempo.getTime() - ahora.getTime();

		return Math.abs(dif);
	};

	this.data.acelerometro_disponible = window.DeviceMotionEvent != undefined ? 1 : 0;
	this.data.giroscopio_disponible = window.DeviceOrientationEvent != undefined ? 1 : 0;

	var coordenadas_acelerometro = null;
	var coordenadas_giroscopio = null;

	// Obtenemos los valores del objeto Navigator
	/*
	this.data.objeto_navigator = new Object();

	for (clave in navigator)
	{
		this.data.objeto_navigator[clave] = navigator[clave] ? navigator[clave].toString() : null;
	}

	// A trav�s del objeto Navegador (navegador.js) obtenemos las datos del navegador
	auditoria.Navegador.iniciar();
	this.data.navegador = new Object();
	this.data.navegador.nombre = auditoria.Navegador.navegador;
	this.data.navegador.version = auditoria.Navegador.version;
	this.data.navegador.SO = auditoria.Navegador.SO;
	*/

	auditoria.Movimiento.iniciar(
		function(coordenadas)
		{
			coordenadas_acelerometro = coordenadas.datos_acelerometro;
			coordenadas_giroscopio = coordenadas.datos_giroscopio;

			// Acelerometro
			var observacion = {
				element: "MOVEMENT",
				event: "accelerometer",
				value: coordenadas_acelerometro,
				instant: obtenerInstante()
			};

			data.observations.push(observacion);

			// Giroscopio
			var observacion = {
				element: "MOVEMENT",
				event: "gyroscope",
				value: coordenadas_giroscopio,
				instant: obtenerInstante()
			};

			data.observations.push(observacion);
		}
	);

	this.parar = function() {
		auditoria.Movimiento.parar();

		this.data.coordenadas_acelerometro = coordenadas_acelerometro;
		this.data.coordenadas_giroscopio = coordenadas_giroscopio;
	}
}
