xuegu.Manejadores = function(elemento, auditoria)
{
	function Manejador(elemento, evento, disparador)
	{
		var valores = [];
		var elementos = [];
		var nombreEvento = 'on' + evento;

		if (elemento.attachEvent)
			elemento.attachEvent(evento, accion);
		else
			elemento.addEventListener(evento, accion, false);

		var manejador = this;

		function accion(evt)
		{
			var coordenada = xuegu.Utilidades.obtenerCoordenadasEvento(evt, elemento);

			valores.push(coordenada);

			var eventoRegistrado = false;

			// Multi touch
			var value = null;

			if (evt.touches)
				value = obtenerDatosTouch(evt);

			for (var i = elementos.length - 1; i >= 0; i--)
			{
				var e = elementos[i];

				if (disparador)
					disparador.call(manejador, manejador, evt, coordenada)

				if (e && e.colision && e.colision(coordenada))
				{
					// Registramos el evento
					registrarEvento(e, nombreEvento, coordenada, value);

					eventoRegistrado = true;

					// Lanzamos manejadores (Es un array)
					if (e[nombreEvento]) {
						var acciones = e[nombreEvento];

						for (var i = 0; i < acciones.length; i++)
							acciones[i].call(e, coordenada);
					}

					return;
				}
			}

			if (!eventoRegistrado)
				registrarEvento("MOVEMENT", nombreEvento, coordenada);
		}

		function obtenerDatosTouch(evt) {
			var touches = evt.touches;
			var targetTouches = evt.targetTouches;
			var changedTouches = evt.changedTouches;

			touches = obtenerDatosTouchArray(touches);
			targetTouches = obtenerDatosTouchArray(targetTouches);
			changedTouches = obtenerDatosTouchArray(changedTouches);

			return JSON.stringify({
				touches: touches,
				targetTouches: targetTouches,
				changedTouches: changedTouches
			});
		}

		function obtenerDatosTouchArray(array) {
			var elements = ["clientX", "clientY", "identifier", "pageX", "pageY", "screenX", "screenY"];

			var obj = [];

			for (var i = 0; i < array.length; i++) {
				var e = {};

				for (var j = 0; j < elements.length; j++) {
					var element = elements[j];
					e[element] = array[i][element];
				}

				obj.push(e);
			}

			return obj;
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

		this.registrarEvento = registrarEvento

		function registrarEvento(elemento, evento, coordenada, value) {
			if (auditoria) {
				if (!auditoria.data)
					auditoria.data = new Object();

				if (!auditoria.data.observations)
					auditoria.data.observations = [];

				var observacion = {
					element: elemento.identificador ? elemento.identificador : elemento,
					event: evento,
					coordinate: elemento.coordenadaEnElemento ? elemento.coordenadaEnElemento(coordenada) : coordenada,
					instant: auditoria.instante(),
					instant_global: auditoria.instante_global(),
					value: value
				};

				auditoria.data.observations.push(observacion);
			}
		}
	}

	this.click = new Manejador(elemento, 'click');
	this.dblclick = new Manejador(elemento, 'dblclick');
	this.mousedown = new Manejador(elemento, 'mousedown');
	this.mouseup = new Manejador(elemento, 'mouseup');

	this.mousemove = new Manejador(elemento, 'mousemove', function(manejador, evt, coordenada) {
		mouseover.accion(manejador, evt, coordenada);
		mouseout.accion(manejador, evt, coordenada);
	});

	//this.mouseover = new Manejador(elemento, 'mouseover');
	//this.mouseout = new Manejador(elemento, 'mouseout');

	// Mouse over y mouse out se registran a través de mouse move

	var mouseover = this.mouseover = new (function() {
		var elementos = [];

		var nombreEvento = "onmouseover";

		this.registrarElemento = function(elemento) {
			if (!(elemento in elementos))
				elementos.push(elemento);
		}

		this.accion = function(manejador, evt, coordenada) {
			for (var i = elementos.length - 1; i >= 0; i--)
			{
				var e = elementos[i];

				if (e && e.colision && e.colision(coordenada) && !e.over) {
					e.over = true;
					manejador.registrarEvento(e, nombreEvento, coordenada, null);

					// Lanzamos manejadores (Es un array)
					if (e[nombreEvento]) {
						var acciones = e[nombreEvento];

						for (var i = 0; i < acciones.length; i++)
							acciones[i].call(e, coordenada);
					}
				}
			}
		}
	})();

	var mouseout = this.mouseout = new (function() {
		var elementos = [];

		var nombreEvento = "onmouseout";

		this.registrarElemento = function(elemento) {
			if (!(elemento in elementos))
				elementos.push(elemento);
		}

		this.accion = function(manejador, evt, coordenada) {
			for (var i = elementos.length - 1; i >= 0; i--)
			{
				var e = elementos[i];

				if (e && e.colision && !e.colision(coordenada) && e.over) {
					e.over = false;
					manejador.registrarEvento(e, nombreEvento, coordenada, null);

					// Lanzamos manejadores (Es un array)
					if (e[nombreEvento]) {
						var acciones = e[nombreEvento];

						for (var i = 0; i < acciones.length; i++)
							acciones[i].call(e, coordenada);
					}
				}
			}
		}
	})();

	this.touchstart = new Manejador(elemento, 'touchstart');
	this.touchmove = new Manejador(elemento, 'touchmove');
	this.touchend = new Manejador(elemento, 'touchend');

	this.keydown = new Manejador(elemento, 'keydown');
	this.keyup = new Manejador(elemento, 'keyup');
	this.keypress = new Manejador(elemento, 'keypress');

	this.parar = function() {
		this.click.parar();
		this.dblclick.parar();
		this.mousedown.parar();
		this.mouseup.parar();
		this.mousemove.parar();

		//this.mouseover.parar();
		//this.mouseout.parar();

		this.touchstart.parar();
		this.touchmove.parar();
		this.touchend.parar();
	}
}
