circo.intermedios.Resultado1 = function(canvas)
{		
	this.identificador = "resultado1";
	this.imagenes = ['img/intermedios/resultado/fondo_cabina.png', 
					'img/intermedios/resultado/adivino1.png', 
					'img/intermedios/resultado/adivino2.png', 
					'img/intermedios/resultado/adivino3.png'];
					
	this.velocidad = 150;
	
	var dimensiones_fondo = {
		ancho: 197,
		alto: 286,
		x: 0
	}
	
	// Relación respecto al fondo
	var dimensiones_adivino = {
		ancho: 0.58,
		alto: 0.82,
		x: 0,
		y: 0
	}

	var lienzo = xuegu.Utilidades.dimensionesJuego(canvas);

	var resultadoRecibido = false;

	var adivino = null;

	(function() {

	})();

	this.iniciar = function(partida)
	{				
		var alto = lienzo.alto * 9/10;
	
		// Ajustar tamaño del fondo al tamaño del lienzo
		if (alto > lienzo.ancho) {
			var factor = dimensiones_fondo.alto / alto;
			
			dimensiones_fondo.alto = alto;
			dimensiones_fondo.ancho = dimensiones_fondo.ancho / factor;
		}
		else {
			var factor = dimensiones_fondo.ancho / lienzo.ancho;
			
			dimensiones_fondo.ancho = lienzo.ancho;
			dimensiones_fondo.alto = dimensiones_fondo.alto / factor;
		}
		
		dimensiones_fondo.x = lienzo.ancho / 2 - dimensiones_fondo.ancho / 2;
		
		// Dimensiones adivino
		dimensiones_adivino.ancho *= dimensiones_fondo.ancho;
		dimensiones_adivino.alto *= dimensiones_fondo.alto;
		dimensiones_adivino.x = lienzo.ancho / 2 - dimensiones_adivino.ancho / 2;
		dimensiones_adivino.y = lienzo.alto  - dimensiones_adivino.alto;
		
		// Crear adivino
		adivino = new Adivino();
		
		// Etiquetas
		
		tu_edad_mental = partida.idioma.texto("tu_edad_mental");
		pulsa_finalizar = partida.idioma.texto("pulsa_finalizar");
		
		// Enviar auditoría
		enviarDatos(partida.auditoria);
	}
		
	this.avanzar = function(partida)
	{	
		adivino.avanzar();
	}
	
	this.dibujar =  function(contexto, ancho, alto, graficos)
	{
		// Fondo
		contexto.drawImage(graficos['img/intermedios/resultado/fondo_cabina.png'], 
			dimensiones_fondo.x, 0, dimensiones_fondo.ancho, dimensiones_fondo.alto);
			
		// Adivino
		adivino.dibujar(contexto, ancho, alto, graficos);
	}
	
	this.finalizado = function()
	{
		return resultadoRecibido;
	}
	
	function Adivino() {
		var contador = 0;
		
		this.avanzar = function() {
			contador++;
		}
		
		this.dibujar =  function(contexto, ancho, alto, graficos) {
			if (contador < 6) {
				var grafico = graficos['img/intermedios/resultado/adivino1.png'];
			}
			else {
				var grafico = (contador % 5 == 0) ? 
							graficos['img/intermedios/resultado/adivino2.png'] : 
							graficos['img/intermedios/resultado/adivino3.png']	
			}
			
			contexto.drawImage(grafico, dimensiones_adivino.x, dimensiones_adivino.y, 
					dimensiones_adivino.ancho, dimensiones_adivino.alto);
		}
	}
	
	function enviarDatos(auditoria) {
		console.log(auditoria.datos)
	}
}