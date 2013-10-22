if (!auditoria)
	var auditoria = new Object();

auditoria.Movimiento = new function(funcion)
{
	var manejador = null;

	// Position Variables
	var x = 0;
	var y = 0;
	var z = 0;

	// Speed - Velocity
	var vx = 0;
	var vy = 0;
	var vz = 0;

	// Acceleration
	var ax = 0;
	var ay = 0;
	var az = 0;
	var ai = 0;
	var arAlpha = 0;
	var arBeta = 0;
	var arGamma = 0;

	var delay = 100;
	var vMultiplier = 0.01;

	var alpha = 0;
	var beta = 0;
	var gamma = 0;
	
	var repeticion = null;
	var datos_acelerometro = '';
	var datos_giroscopio = '';
	var dx = '', dy = '', dz = '', dalpha = '', dbeta = '', dgamma = '';
	
	this.iniciar = function(funcion)
	{
		manejador = funcion;
	
		if (window.DeviceMotionEvent != undefined)  
		{
			if (window.attachEvent)
			{
				window.attachEvent('devicemotion', this.ondevicemotion);
				window.attachEvent('deviceorientation', this.ondeviceorientation);
			}
			else
			{
				window.addEventListener('devicemotion', this.ondevicemotion, false);
				window.addEventListener('deviceorientation', this.ondeviceorientation, false);
			}
			
								
			/*
				Alfa: 180 - -180
				Beta: 90 - -90
				Gama: 180 - -180
			*/
			
			repeticion = setInterval(this.captura, 500);	
		} 
	};
	
	this.ondevicemotion = function(event) 
	{
		ax = Math.round(event.accelerationIncludingGravity.x * 1);
		ay = Math.round(event.accelerationIncludingGravity.y * 1);
		az = Math.round(event.accelerationIncludingGravity.z * 1);		
		ai = Math.round(event.interval * 100) / 100;
		rR = event.rotationRate;
		
		if (rR != null) 
		{
			arAlpha = Math.round(rR.alpha);
			arBeta = Math.round(rR.beta);
			arGamma = Math.round(rR.gamma);
		}		
	};
					
	this.ondeviceorientation = function(event) 
	{
		alpha = Math.round(event.alpha);
		beta = Math.round(event.beta);
		gamma = Math.round(event.gamma);
	};
	
	this.captura = function() 
	{ 
		if (dx != '')
		{
			dx += ',';
			dy += ',';
			dz += ',';
			dalpha += ',';
			dbeta += ',';
			dgamma += ',';
		}
		
		dx += ax;
		dy += ay;
		dz += az;
		dalpha += alpha;
		dbeta += beta;
		dgamma += gamma;

		manejador.call(this, obtener_datos());
	};
	
	this.parar = function()
	{
		clearInterval(repeticion);
		
        if (window.detachEvent)
		{
			window.detachEvent('devicemotion', this.ondevicemotion);
			window.detachEvent('deviceorientation', this.ondeviceorientation);
		}
		else
		{
			window.removeEventListener('devicemotion', this.ondevicemotion, false);
			window.removeEventListener('deviceorientation', this.ondeviceorientation, false);
		}
	};
	
	var obtener_datos = function()
	{
		var resultado = new Object();
		
		resultado.datos_acelerometro = dx + ';' + dy + ';' + dz;
		resultado.datos_giroscopio = dalpha + ';' + dbeta + ';' + dgamma;
		
		return resultado;
	};
}();		