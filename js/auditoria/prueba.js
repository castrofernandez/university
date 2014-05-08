if (!auditoria)
	var auditoria = new Object();

auditoria.Prueba = function(identificador)
{
	this.datos = new Object();
	
	this.datos.identificador = identificador;

	var tiempo = new Date();
	this.datos.instante = tiempo;
	
	this.instante = function()
	{
		var ahora = new Date();
		var dif = tiempo.getTime() - ahora.getTime();

		return Math.abs(dif);
	};
	
	this.datos.acelerometro_disponible = window.DeviceMotionEvent != undefined ? 1 : 0;
	this.datos.giroscopio_disponible = window.DeviceOrientationEvent != undefined ? 1 : 0;
	
	var coordenadas_acelerometro = null;
	var coordenadas_giroscopio = null;
	
	// Obtenemos los valores del objeto Navigator
	this.datos.objeto_navigator = new Object();
	
	for (clave in navigator)
	{
		this.datos.objeto_navigator[clave] = navigator[clave] ? navigator[clave].toString() : null;
	}
	
	// A través del objeto Navegador (navegador.js) obtenemos las datos del navegador
	auditoria.Navegador.iniciar();
	this.datos.navegador = new Object();
	this.datos.navegador.nombre = auditoria.Navegador.navegador;
	this.datos.navegador.version = auditoria.Navegador.version;
	this.datos.navegador.SO = auditoria.Navegador.SO;
	
	auditoria.Movimiento.iniciar(
		function(coordenadas)
		{
			coordenadas_acelerometro = coordenadas.datos_acelerometro;
			coordenadas_giroscopio = coordenadas.datos_giroscopio;
		}
	);
	
	this.parar = function() {
		auditoria.Movimiento.parar();
		
		this.datos.coordenadas_acelerometro = coordenadas_acelerometro;
		this.datos.coordenadas_giroscopio = coordenadas_giroscopio;
	}
}