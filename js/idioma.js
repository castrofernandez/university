var internacionalizacion = new Object();

internacionalizacion.Idioma = function(etiquetas, defecto, seleccionado)
{
	this.codigo = seleccionado || obtenerIdioma(); 

	function obtenerIdioma() {
		var codigo = navigator.language || navigator.userLanguage;
		
		if (codigo && codigo.indexOf("-") != - 1) {
			var partes = codigo.split("-");
			
			if (partes.length > 0)
				codigo = partes[0];
		}
		
		if (codigo && !(codigo in etiquetas))
			codigo = defecto;
		
		return codigo;
	}
	
	this.texto = function(t) {
		return etiquetas[this.codigo][t];
	}
};