xuegu.Manejadores = function(elemento, auditoria)
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
			
			var eventoRegistrado = false;

			for (var i = elementos.length - 1; i >= 0; i--)
			{
				var e = elementos[i];
		
				if (e && e.colision && e.colision(coordenada))
				{					
					// Registramos el evento
					registrarEvento(e, nombreEvento, coordenada);
					
					eventoRegistrado = true;	
					
					// Lanzamos manejador
					if (e[nombreEvento])
						e[nombreEvento](coordenada);
					
					return;	
				}
			}
			
			if (!eventoRegistrado)
				registrarEvento("<anonimo>", nombreEvento, coordenada);
		}
		
		this.parar = function() {
			if (elemento.detachEvent)
				elemento.detachEvent (evento, accion);
			else
				elemento.removeEventListener(evento, accion, false);
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
		
		function registrarEvento(elemento, evento, coordenada) {
			if (auditoria) {
				if (!auditoria.datos)
					auditoria.datos = new Object();
			
				if (!auditoria.datos.observaciones)
					auditoria.datos.observaciones = [];
					
				var observacione = {
					identificador: elemento.identificador ? elemento.identificador : elemento,
					evento: evento,
					coordenada: elemento.coordenadaEnElemento ? elemento.coordenadaEnElemento(coordenada) : coordenada,
					instante: auditoria.instante()
				}
				
				auditoria.datos.observaciones.push(observacione);
			}
		}
	}
	
	this.click = new Manejador(elemento, 'click');
	this.dblclick = new Manejador(elemento, 'dblclick');
	this.mousedown = new Manejador(elemento, 'mousedown');
	this.mouseup = new Manejador(elemento, 'mouseup');
	this.mousemove = new Manejador(elemento, 'mousemove');
	this.mouseover = new Manejador(elemento, 'mouseover');
	this.mouseout = new Manejador(elemento, 'mouseout');
	
	this.parar = function() {
		this.click.parar();
		this.dblclick.parar();
		this.mousedown.parar();
		this.mouseup.parar();
		this.mousemove.parar();
		this.mouseover.parar(); 
		this.mouseout.parar();
	}
}