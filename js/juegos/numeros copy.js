window.onload = function() 
{
	cargar_imagenes(imagenes);
};

var canvas = null;
var context = null;

var patos = [
				{x : 110, y : 33, imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: true},
				{x : 10, y : 13, imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false},
				{x : 300, y : 10, imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: true},
				{x : 210, y : 10, imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: true},
				{x : 300, y : 110, imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false},
				{x : 50, y : 110, imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: false},
				{x : 110, y : 190, imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: true},
				{x : 200, y : 100, imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false},
				{x : 20, y : 200, imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: true},
				{x : 20, y : 290, imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false},
				{x : 200, y : 200, imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: true},
				{x : 310, y : 300, imagen : 'img/numeros/pato3.png', oscilacion: +0, avance_oscilacion: false},
				{x : 300, y : 200, imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: true},
				{x : 100, y : 300, imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: true},
				{x : 90, y : 400, imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: true},
				{x : 230, y : 365, imagen : 'img/numeros/pato1.png', oscilacion: +0, avance_oscilacion: false},
				{x : 210, y : 280, imagen : 'img/numeros/pato6.png', oscilacion: +0, avance_oscilacion: false},
				{x : 180, y : 410, imagen : 'img/numeros/pato5.png', oscilacion: +0, avance_oscilacion: true},
				{x : 310, y : 410, imagen : 'img/numeros/pato4.png', oscilacion: +0, avance_oscilacion: false},
				{x : 10, y : 400, imagen : 'img/numeros/pato2.png', oscilacion: +0, avance_oscilacion: true}
			];

var ancho = 400;
var alto = 500;
var ancho_alto_pato = 80;

var ancho_gancho = 30;
var alto_gancho = 250;

var angulo_oscilacion = 0.05;

var imagenes = ['img/numeros/pato1.png', 'img/numeros/pato2.png', 'img/numeros/pato3.png', 
				'img/numeros/pato4.png', 'img/numeros/pato5.png', 'img/numeros/pato6.png', 'img/numeros/gancho.png'];

var graficos = {}

function cargar_imagenes(imagenes)
{
	var numero = imagenes.length;
	
	for (var i = 0; i < imagenes.length; i++)
	{
		var imagen = new Image();
		
		imagen.onload = function() {
			numero--;
			
			if (numero == 0)
				iniciar();
		}
		
		imagen.src = imagenes[i];
		
		graficos[imagenes[i]] = imagen;
	}
}

function iniciar()
{
	canvas = document.getElementById('canvas-juego');
	context = canvas.getContext('2d');

	context.fillStyle = "#666";
	context.font = "18px Verdana";
	context.textAlign = 'center';

	setInterval(bucle_juego, 30);
}

function rotar_pato(imagen, x, y, ancho, alto, angulo, numero)
{
	var mitad_ancho = Math.floor(ancho / 2);
    var mitad_alto = Math.floor(alto / 2);
	
	context.save();
	
	context.translate(x, y);
	context.translate(mitad_ancho, mitad_alto);
	context.rotate(angulo);
	context.drawImage(imagen, - mitad_ancho, - mitad_alto, ancho, alto);
	context.fillText(numero, - mitad_ancho + 1 / 2 * ancho_alto_pato, - mitad_alto + 8 / 10 * ancho_alto_pato, ancho, alto);
	context.restore();
}

function incrementar_oscilacion(pato)
{
	pato.oscilacion += pato.avance_oscilacion ? 0.005 : -0.005;

	if (Math.abs(pato.oscilacion) >= angulo_oscilacion)
		pato.avance_oscilacion = ! pato.avance_oscilacion;
	
	return pato;
}

function bucle_juego()
{
	// Limpiar canvas
	context.clearRect (0, 0, ancho, alto);
	
	// Patos
	
	// Patos secundarios
	for (var i = 0; i < patos.length; i++)
	{
		var pato = patos[i];
		var numero = i + 1;

		rotar_pato(graficos[pato.imagen], pato.x, pato.y, ancho_alto_pato, ancho_alto_pato, pato.oscilacion, numero);
		
		patos[i] = incrementar_oscilacion(pato);
	}
	
	// Gancho
	
	context.drawImage(graficos['img/numeros/gancho.png'], 180, -50, ancho_gancho, alto_gancho);
}