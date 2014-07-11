xuegu.Elemento = function(partida, x, y, ancho, alto, opciones)
{
	this.partida = partida;
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.alto = alto;

	this.onclick = new Array();
	this.ondblclick = new Array();
	this.onmousedown = new Array();
	this.onmouseup = new Array();
	this.onmousemove = new Array();
	this.onmouseover = new Array();
	this.onmouseout = new Array();

	this.ontouchstart = new Array();
	this.ontouchmove = new Array();
	this.ontouchend = new Array();

	this.onkeydown = new Array();
	this.onkeypress = new Array();
	this.onkeyup = new Array();

	this.colision = function(coordenada)
	{
		return (this.x <= coordenada.x && this.x + this.ancho >= coordenada.x
				&& this.y <= coordenada.y && this.y + this.alto >= coordenada.y);
	}

	this.coordenadaEnElemento = function(coordenada)
	{
		return {
			x: coordenada.x - this.x,
			y: coordenada.y - this.y,
			width: this.ancho,
			height: this.alto
		}
	}

	this.dibujar = function()
	{

	}

	this.registrarClick = function(manejador)
	{
		if (manejador)
			this.onclick.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.click.registrarElemento(this);
	}

	this.registrarDblClick = function(manejador)
	{
		if (manejador)
			this.ondblclick.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.dblclick.registrarElemento(this);
	}

	this.registrarMouseDown = function(manejador)
	{
		if (manejador)
			this.onmousedown.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mousedown.registrarElemento(this);
	}

	this.registrarMouseUp = function(manejador)
	{
		if (manejador)
			this.onmouseup.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mouseup.registrarElemento(this);
	}

	this.registrarMouseMove = function(manejador)
	{
		if (manejador)
			this.onmousemove.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mousemove.registrarElemento(this);
	}

	this.registrarMouseOver = function(manejador)
	{
		if (manejador)
			this.onmouseover.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mouseover.registrarElemento(this);
	}

	this.registrarMouseOut = function(manejador)
	{
		if (manejador)
			this.onmouseout.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mouseout.registrarElemento(this);
	}

	this.registrarTouchStart = function(manejador)
	{
		if (manejador)
			this.ontouchstart.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.touchstart.registrarElemento(this);
	}

	this.registrarTouchMove = function(manejador)
	{
		if (manejador)
			this.ontouchmove.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.touchmove.registrarElemento(this);
	}

	this.registrarTouchEnd = function(manejador)
	{
		if (manejador)
			this.ontouchend.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.touchend.registrarElemento(this);
	}

	// Teclado

	this.registrarKeyDown = function(manejador)
	{
		if (manejador)
			this.onkeydown.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.keydown.registrarElemento(this);
	}

	this.registrarKeyUp = function(manejador)
	{
		if (manejador)
			this.onkeyup.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.keyup.registrarElemento(this);
	}

	this.registrarKeyPress = function(manejador)
	{
		if (manejador)
			this.onkeypress.push(manejador);

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.keypress.registrarElemento(this);
	}

	this.registrarManejadores = function()
	{
		this.registrarClick();
		this.registrarDblClick();
		this.registrarMouseDown();
		this.registrarMouseUp();
		this.registrarMouseMove();
		this.registrarMouseOver();
		this.registrarMouseOut();

		this.registrarTouchStart();
		this.registrarTouchMove();
		this.registrarTouchEnd();

		this.registrarKeyDown();
		this.registrarKeyUp();
		this.registrarKeyPress();
	}

	if (opciones)
	{
		for (var opcion in opciones)
		{
			var objeto = opciones[opcion];

			switch(opcion) {
				case "onclick":
					this.registrarClick(objeto);
					break;
				case "ondblclick":
					this.registrarDblClick(objeto);
					break;
				case "onmousedown":
					this.registrarMouseDown(objeto);
					break;
				case "onmouseup":
					this.registrarMouseUp(objeto);
					break;
				case "onmousemove":
					this.registrarMouseMove(objeto);
					break;
				case "onmouseover":
					this.registrarMouseOver(objeto);
					break;
				case "onmouseout":
					this.registrarMouseOut(objeto);
					break;
				case "ontouchstart":
					this.registrarTouchStart(objeto);
					break;
				case "ontouchmove":
					this.registrarTouchMove(objeto);
					break;
				case "ontouchend":
					this.registrarTouchEnd(objeto);
					break;
				case "onkeydown":
					this.registrarKeyDown(objeto);
					break;
				case "onkeyup":
					this.registrarKeyUp(objeto);
					break;
				case "onkeypress":
					this.registrarKeyPress(objeto);
					break;
				default:
					this[opcion] = opciones[opcion];
			}
		}

		this.registrarManejadores();
	}
};
