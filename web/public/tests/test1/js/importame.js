var importame = new function() 
{
	var ruta = "";
	var inicio = "";
	
	var cargarScript = function(fichero, disparador) 
	{
		var marcarFicheroCargado = function()
		{
			disparador.marcarFicheroCargado(fichero);
		};
		
		new function() 
		{
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = fichero;
			
			script.onreadystatechange = marcarFicheroCargado;
			script.onload = marcarFicheroCargado;
			
			head.appendChild(script);
		}();
	}
	
	var Disparador = function(modulos, retorno) 
	{
		var listaComprobacion = [];
		var contador = modulos.length;
		
		this.marcarFicheroCargado = function(modulo) 
		{
			if (listaComprobacion[modulo] == false) 
			{
				listaComprobacion[modulo] = true;
				contador--;
				
				if (contador == 0 && retorno != undefined && retorno.call)
					retorno.call();
			}
		}
		
		for (var i = 0; i < modulos.length; i++)
		{
			listaComprobacion[modulos[i]] = false;
			cargarScript(modulos[i], this);
		}
	}
	
	var DisparadorSecuencial = function(modulos, retorno) 
	{
		var indice = 0;
		
		this.marcarFicheroCargado = function(modulo) 
		{
			indice++;
			
			if (indice < modulos.length)
				cargarScript(modulos[indice], this);
			else if (retorno != undefined && retorno.call)
				retorno.call();
		}
		
		cargarScript(modulos[indice], this);
	}
	
	var cargar = function(modulos, retorno, cargaSecuencial) 
	{
		if (! (modulos instanceof Array))
			modulos = [ modulos ];
		
		for (var i = 0; i < modulos.length; i++)
			modulos[i] = ruta + modulos[i];
		
		var disparador = cargaSecuencial ? new DisparadorSecuencial(modulos, retorno) : new Disparador(modulos, retorno);
	};
	
	this.cargar = function(modulos, retorno) 
	{
		cargar(modulos, retorno, false);
	}
	
	this.cargarSecuencialmente = function(modulos, retorno) 
	{
		cargar(modulos, retorno, true);
	}
	
	new function() 
	{
		var scripts = document.getElementsByTagName('script');
		
		 for(var i = 0, l = scripts.length; i < l; i++)
		 {
		 	if(scripts[i].getAttribute('ruta'))
		 		ruta = scripts[i].getAttribute('ruta');
		 		
		 	if(scripts[i].getAttribute('inicio'))
		 		inicio = scripts[i].getAttribute('inicio');
		 }
		 
		 if (ruta)
		 {
		 	// Trim
		 	ruta.replace(/^\s+|\s+$/g, '');
		 	
		 	if (ruta.length > 0 && ruta.charAt(ruta.length - 1) != '\\')
		 		ruta += '\\';
		 }
		 
		 if (inicio && inicio != "")
		 	cargar(inicio);
	}();
}();
