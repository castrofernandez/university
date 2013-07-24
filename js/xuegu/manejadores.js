xuegu.Manejadores = function(elemento)
{
	function Manejador(elemento, evento)
	{
		var valores = [];
		var elementos = [];
		var nombreEvento = 'on' + evento;
		
		if (elemento.attachEvent)
			elemento.attachEvent(evento, accion);
		else
			elemento.addEventListener(evento, accion, false);
	
		function accion(evt)
		{
			var coordenada = xuegu.Utilidades.obtenerCoordenadasEvento(evt, elemento);
			
			valores.push(coordenada);

			for (var i = 0; i < elementos.length; i++)
			{
				var e = elementos[i];
				
				if (e && e.colision && e[nombreEvento] && e.colision(coordenada))
				{
					e[nombreEvento](coordenada);
				
					break;	
				}
			}
		}
		
		this.obtenerValor = function()
		{
			var coordenada = null;
		
			if (valores.length > 0)
			{
				coordenada = valores[0];
				valores.shift();
			}
			
			return coordenada;
		}
		
		this.registrarElemento = function(elemento)
		{
			if (!(elemento in elementos))
				elementos.push(elemento);
		}
	}
	
	this.click = new Manejador(elemento, 'click');
	this.dblclick = new Manejador(elemento, 'dblclick');
	this.mousedown = new Manejador(elemento, 'mousedown');
	this.mouseup = new Manejador(elemento, 'mouseup');
	this.mousemove = new Manejador(elemento, 'mousedown');
	this.mouseover = new Manejador(elemento, 'mouseover');
	this.mouseout = new Manejador(elemento, 'mouseout');
}