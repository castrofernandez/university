if (!auditoria)
	var auditoria = new Object();

auditoria.Auditoria = function(canvas)
{
	this.datos = new Object();

	this.datos.canvas = xuegu.Utilidades.dimensionesJuego(canvas);
	
	this.datos.pruebas = [];
	
	this.incluirPrueba = function(prueba) {
		this.datos.pruebas.push(prueba);
	}
}