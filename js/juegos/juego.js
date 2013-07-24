
// Obtener la altura de un elemento
function obtener_altura(obj)
{
	return obj.height;
}

// Obtener la anchura de un elemento
function obtener_anchura(obj)
{
	return obj.width;
}

// Dibujar línea
function linea(contexto, x1, y1, x2, y2, color, grosor, extremo)
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
function rectangulo(contexto, x, y, ancho, alto, color)
{
	contexto.beginPath();
    contexto.rect(x, y, ancho, alto);
    contexto.fillStyle = color;
    contexto.fill();
}

// Dibujar rectángulo redondeado
function rectanguloRedondeado(contexto, x, y, ancho, alto, radio, relleno, contorno, grosor) 
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
	
	if (contorno)
	{
		contexto.strokeStyle = contorno;
		contexto.lineWidth = grosor ? grosor : 1;
		contexto.stroke();
	}

	if (relleno)
	{
		contexto.fillStyle = relleno;
		contexto.fill();  
	}     
}

// Dibujar triángulo
function triangulo(contexto, x1, y1, x2, y2, x3, y3, color)
{
	contexto.beginPath();
    contexto.moveTo(x1, y1);
    contexto.lineTo(x2, y2);
    contexto.lineTo(x3, y3);
    contexto.closePath();
    contexto.fillStyle = color;
    contexto.fill();
}

// Dibujar imagen
function mostrarImagen(contexto, grafico, x, y, ancho, alto)
{
    mostrarImagenes(contexto, [grafico], [x], [y], ancho, alto)
}


function mostrarImagenes(contexto, graficos, x, y, ancho, alto)
{
	var imagenes = [];
	var cargadas = 0;
	
	var se_ha_cargado = function () 
	{
	    cargadas++;
	    
	    if (cargadas == graficos.length) 
	    {
	    	for(var i = 0; i < imagenes.length; i++)
	        	mostrarImagenDesdeImg(contexto, imagenes[i], x[i], y[i], ancho, alto);
	    }
	};
	
	for (var i = 0; i < graficos.length; i++) 
	{
	    imagenes[i] = new Image();
	    imagenes[i].addEventListener('load', se_ha_cargado, false);
	    imagenes[i].src = graficos[i];
	}
}

function mostrarImagenDesdeImg(contexto, imagen, x, y, ancho, alto)
{
	var ancho_imagen, alto_imagen;
	    
	if (imagen.width < imagen.height)
	{
    	ancho_imagen = ancho;
    	alto_imagen = imagen.height / (imagen.width / ancho_imagen);
	}
	else
	{
    	alto_imagen = alto;
    	ancho_imagen = imagen.width / (imagen.height / alto_imagen);
	}
	
	contexto.drawImage(imagen, x, y, ancho_imagen, alto_imagen);  
}


// Dimensiones de la pagina
function dimensiones_pagina() 
{
	/*
	var anchura, altura;
	
	if (self.innerHeight) // all except Explorer
	{
		anchura = self.innerWidth;
		altura = self.innerHeight;
	}
	else if (document.body) // other Explorers
	{
		anchura = document.body.clientWidth;
		altura = document.body.clientHeight;
	}

	return { anchura : anchura, altura : altura };
	*/
	return { anchura : 400, altura : 500 };
}
