xuegu.Utilidades = new function()
{
	var ancho = 600;
	var alto = 700;
	
	this.dimensionesJuego = function() {
		return { ancho: ancho, alto: alto };
	}

	this.obtenerCoordenadasEvento = function(evento, elemento)
	{
		var coordenadaX = 0;
		var coordenadaY = 0;
		  
		var pos = posicion(elemento);
		  
		if (!evento) 
			var evento = window.event;
		  
		if (evento.pageX || evento.pageY)
		{
			coordenadaX = evento.pageX;
			coordenadaY = evento.pageY;
		}
		else if (evento.clientX || evento.clientY)
		{
			coordenadaX = evento.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
			coordenadaY = evento.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
		}
		  
		coordenadaX = coordenadaX - pos.x;
		coordenadaY = coordenadaY - pos.y;
		
		return {x:coordenadaX, y:coordenadaY};
	}
	
	var posicion = function(elemento)
	{
		if (typeof(elemento.offsetParent) != "undefined")
		{
			for(var coordenadaX = 0, coordenadaY = 0; elemento; elemento = elemento.offsetParent)
			{
				coordenadaX += elemento.offsetLeft;
				coordenadaY += elemento.offsetTop;
			}
			
			return {x:coordenadaX, y:coordenadaY};
		}
		else
		{
			return {x:elemento.x, y:elemento.y};
		}
	}
}();