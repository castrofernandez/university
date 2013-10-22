xuegu.Elemento = function(partida, x, y, ancho, alto, opciones)
{
	this.partida = partida;
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.alto = alto;

	this.colision = function(coordenada)
	{
		return (this.x <= coordenada.x && this.x + this.ancho >= coordenada.x 
				&& this.y <= coordenada.y && this.y + this.alto >= coordenada.y);
	}
	
	this.coordenadaEnElemento = function(coordenada)
	{
		return {
			x: coordenada.x - this.x,
			y: coordenada.y - this.y
		}
	}		
	
	this.dibujar = function()
	{

	}
	
	this.registrarClick = function(manejador)
	{
		if (manejador)
			this.onclick = manejador;

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.click.registrarElemento(this);
	}
	
	this.registrarDblClick = function(manejador)
	{
		if (manejador)
			this.ondblclick = manejador;

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.dblclick.registrarElemento(this);
	}
	
	this.registrarMouseDown = function(manejador)
	{
		if (manejador)
			this.onmousedown = manejador;

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mousedown.registrarElemento(this);
	}
	
	this.registrarMouseUp = function(manejador)
	{
		if (manejador)
			this.onmouseup = manejador;

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mouseup.registrarElemento(this);
	}
	
	this.registrarMouseMove = function(manejador)
	{
		if (manejador)
			this.onmousemove = manejador;

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mousemove.registrarElemento(this);
	}
	
	this.registrarMouseOver = function(manejador)
	{
		if (manejador)
			this.onmouseover = manejador;

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mouseover.registrarElemento(this);
	}
	
	this.registrarMouseOut = function(manejador)
	{
		if (manejador)
			this.onmouseout = manejador;

		if (this.partida && this.partida.manejadores)
			this.partida.manejadores.mouseout.registrarElemento(this);
	}
	
	this.registrarManejadores = function(manejadores)
	{
	//	if (this.onclick)
			this.registrarClick();
			
	//	if (this.ondblclick)
			this.registrarDblClick();
		
	//	if (this.onmousedown)
			this.registrarMouseDown();
			
	//	if (this.onmouseup)
			this.registrarMouseUp();						
			
	//	if (this.onmousemove)
			this.registrarMouseMove();
			
	//	if (this.onmouseover)
			this.registrarMouseOver();
			
	//	if (this.onmouseout)
			this.registrarMouseOut();
	}
	
	if (opciones)
	{
		for (var opcion in opciones)
		{
			this[opcion] = opciones[opcion];
		}

		this.registrarManejadores(partida.manejadores);
	}
};