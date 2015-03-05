xuegu.Graficos = new function()
{
	this.aplicarSombra = function(contexto, color)
	{
		if (typeof color != 'string' && !(color instanceof String))
			color = '#666';
	
		contexto.shadowColor   = color;
        contexto.shadowOffsetX = 3;
        contexto.shadowOffsetY = 3;
        contexto.shadowBlur    = 6;
	}
	
	this.aplicarSombraInterna = function(contexto, color)
	{
		if (typeof color != 'string' && !(color instanceof String))
			color = '#666';	
	
		contexto.shadowColor   = color;
        contexto.shadowOffsetX = 0;
        contexto.shadowOffsetY = 0;
        contexto.shadowBlur    = 6;
	}
	
	this.limpiarSombra = function(contexto)
	{
       	contexto.shadowOffsetX = 0;
        contexto.shadowOffsetY = 0;
        contexto.shadowBlur    = 0;	
    }

	// Dibujar línea
	this.linea = function(contexto, x1, y1, x2, y2, color, grosor, extremo)
	{
	    contexto.beginPath();
	    contexto.moveTo(x1, y1);
	    contexto.lineTo(x2, y2);
	    contexto.lineWidth = grosor ? grosor : 1;
	    contexto.lineCap = extremo ? extremo : 'butt';
	    contexto.strokeStyle = color;
	    contexto.stroke();
	}
	
	// Dibujar rectángulo
	this.rectangulo = function(contexto, x, y, ancho, alto, relleno, contorno, grosor, sombra, sombraInterna)
	{
		contexto.beginPath();
	    contexto.rect(x, y, ancho, alto);
	    contexto.fillStyle = relleno;
	    
	    if (!contorno && sombra)
	    	this.aplicarSombra(contexto, sombra);
	    	
		if (!contorno && sombraInterna)
			this.aplicarSombraInterna(contexto, sombraInterna);	
	    
	    contexto.fill();
	    
	    if (contorno)
		{
			contexto.strokeStyle = contorno;
			contexto.lineWidth = grosor ? grosor : 1;
			
			if (sombra)
				this.aplicarSombra(contexto, sombra);
				
			if (sombraInterna)
				this.aplicarSombraInterna(contexto, sombraInterna);	
				
			contexto.stroke();
		}

		this.limpiarSombra(contexto);
	}
	
	// Dibujar rectángulo redondeado
	this.rectanguloRedondeado = function(contexto, x, y, ancho, alto, radio, relleno, contorno, grosor, sombra, sombraInterna) 
	{
		contexto.beginPath();
		contexto.moveTo(x + radio, y);
		contexto.lineTo(x + ancho - radio, y);
		contexto.quadraticCurveTo(x + ancho, y, x + ancho, y + radio);
		contexto.lineTo(x + ancho, y + alto - radio);
		contexto.quadraticCurveTo(x + ancho, y + alto, x + ancho - radio, y + alto);
		contexto.lineTo(x + radio, y + alto);
		contexto.quadraticCurveTo(x, y + alto, x, y + alto - radio);
		contexto.lineTo(x, y + radio);
		contexto.quadraticCurveTo(x, y, x + radio, y);
		contexto.closePath();
	
		if (relleno)
		{
			contexto.fillStyle = relleno;
			
		    if (!contorno && sombra)
		    	this.aplicarSombra(contexto, sombra);		
		    	
		    if (!contorno && sombraInterna)
				this.aplicarSombraInterna(contexto, sombraInterna);	
			
			contexto.fill();  
		}    
		
		if (contorno)
		{
			contexto.strokeStyle = contorno;
			contexto.lineWidth = grosor ? grosor : 1;
			
			if (sombra)
				this.aplicarSombra(contexto, sombra);
				
			if (sombraInterna)
				this.aplicarSombraInterna(contexto, sombraInterna);
			
			contexto.stroke();
		}
		
		this.limpiarSombra(contexto);
	}
	
	// Dibujar triángulo
	this.triangulo = function(contexto, x1, y1, x2, y2, x3, y3, color, contorno, grosor, sombra)
	{
		contexto.beginPath();
	    contexto.moveTo(x1, y1);
	    contexto.lineTo(x2, y2);
	    contexto.lineTo(x3, y3);
	    contexto.closePath();
	    contexto.fillStyle = color;
	    
	    if (!contorno && sombra)
		    this.aplicarSombra(contexto);
	    
	    contexto.fill();
	    
	    this.limpiarSombra(contexto);
	}
	
	// Dibujar círculo
	this.circulo = function(contexto, x, y, radio, relleno, contorno, grosor, sombra)
	{
		contexto.beginPath();
		contexto.arc(x, y, radio, 0, 2 * Math.PI);
	    
		if (relleno)
		{
			contexto.fillStyle = relleno;
			
			if (!contorno && sombra)
		    	this.aplicarSombra(contexto);
			
			contexto.fill();  
		}    
		
		if (contorno)
		{
			contexto.strokeStyle = contorno;
			contexto.lineWidth = grosor ? grosor : 1;
			
			if (sombra)
				this.aplicarSombra(contexto);
			
			contexto.stroke();
		}
		
		this.limpiarSombra(contexto);
	}
}();