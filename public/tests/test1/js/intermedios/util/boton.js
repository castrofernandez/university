circo.intermedios.util.Boton = function(opciones)
{		
	function botonOnMouseDown(coordenada)
	{
		this.pulsado = true;
	}	
	
	function botonOnMouseUp(coordenada)
	{
		this.pulsado = false;
	}	
	
	function dibujarBotonRecto(contexto)
	{
		xuegu.Graficos.rectangulo(contexto, this.x, this.y, this.ancho, this.alto, 
									this.pulsado ? this.sombra : this.relleno, this.contorno, this.grosor, this.sombra, this.sombraInterna);
		
		escribirTexto(contexto, this);
	}
	
	function dibujarBotonRedondeado(contexto)
	{
		xuegu.Graficos.rectanguloRedondeado(contexto, this.x, this.y, this.ancho, this.alto, this.alto / 3.5, 
											this.pulsado ? this.sombra : this.relleno, this.contorno, this.grosor, this.sombra, this.sombraInterna);
		
		escribirTexto(contexto, this);
	}
	
	function dibujarBotonRedondo(contexto)
	{
		var radio = this.ancho / 2;
		
		xuegu.Graficos.circulo(contexto, this.x + radio, this.y + radio, radio, 
											this.pulsado ? this.sombra : this.relleno, this.contorno, this.grosor, true)
		
		escribirTexto(contexto, this);
	}
	
	function escribirTexto(contexto, elemento)
	{
		contexto.fillStyle = elemento.colorTexto;
		contexto.font = elemento.fuente ? elemento.fuente : "26px Conv_Carnevalee Freakshow";
		contexto.fillText(elemento.texto, elemento.x + elemento.ancho / 2, elemento.y + elemento.alto / 1.8);
	}
	
	switch(opciones.tipo)
	{
		case "recto": 
			opciones.dibujar = dibujarBotonRecto;
			break;
		case "redondeado":
			opciones.dibujar = dibujarBotonRedondeado;
			break; 
		case "redondo":
			opciones.dibujar = dibujarBotonRedondo;
			break; 	
	}
	
	opciones.onmousedown = botonOnMouseDown;
	opciones.onmouseup = botonOnMouseUp;
	
	return opciones.partida.crearElemento(opciones.x, opciones.y, opciones.ancho, opciones.alto, opciones);
}