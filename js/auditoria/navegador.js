if (!auditoria)
	var auditoria = new Object();

auditoria.Navegador = 
{
	iniciar: function () 
	{
		this.navegador = this.buscar_cadena(this.navegadores) || "Navegador desconocido";
		this.version = this.buscar_version(navigator.userAgent)
						|| this.buscar_version(navigator.appVersion)
						|| "Versión desconocida";
		this.SO = this.buscar_cadena(this.operativos) || "Sistema Operativo desconocido";
	},
	
	buscar_cadena: function (data) 
	{
		for (var i = 0; i < data.length; i++)	
		{
			var dataString = data[i].cadena;
			var dataProp = data[i].prop;
			
			this.cadena_busqueda_version = data[i].versionSearch || data[i].resultado;
			
			if (dataString) 
			{
				if (dataString.indexOf(data[i].subcadena) != -1)
					return data[i].resultado;
			}
			else if (dataProp)
				return data[i].resultado;
		}
	},
	
	buscar_version: function (dataString) 
	{
		var index = dataString.indexOf(this.cadena_busqueda_version);
		
		if (index == -1) 
			return;
			
		return parseFloat(dataString.substring(index + this.cadena_busqueda_version.length + 1));
	},
	
	navegadores: 
	[
		{
			cadena: navigator.userAgent,
			subcadena: "Chrome",
			resultado: "Chrome"
		},
		{ 	cadena: navigator.userAgent,
			subcadena: "OmniWeb",
			versionSearch: "OmniWeb/",
			resultado: "OmniWeb"
		},
		{
			cadena: navigator.vendor,
			subcadena: "Apple",
			resultado: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			resultado: "Opera",
			versionSearch: "Version"
		},
		{
			cadena: navigator.vendor,
			subcadena: "iCab",
			resultado: "iCab"
		},
		{
			cadena: navigator.vendor,
			subcadena: "KDE",
			resultado: "Konqueror"
		},
		{
			cadena: navigator.userAgent,
			subcadena: "Firefox",
			resultado: "Firefox"
		},
		{
			cadena: navigator.vendor,
			subcadena: "Camino",
			resultado: "Camino"
		},
		{		
			// for newer Netscapes (6+)
			cadena: navigator.userAgent,
			subcadena: "Netscape",
			resultado: "Netscape"
		},
		{
			cadena: navigator.userAgent,
			subcadena: "MSIE",
			resultado: "Explorer",
			versionSearch: "MSIE"
		},
		{
			cadena: navigator.userAgent,
			subcadena: "Gecko",
			resultado: "Mozilla",
			versionSearch: "rv"
		},
		{ 	
			// for older Netscapes (4-)
			cadena: navigator.userAgent,
			subcadena: "Mozilla",
			resultado: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	
	operativos : 
	[
		{
			cadena: navigator.platform,
			subcadena: "Win",
			resultado: "Windows"
		},
		{
			cadena: navigator.platform,
			subcadena: "Mac",
			resultado: "Mac"
		},
		{
			cadena: navigator.userAgent,
			subcadena: "iPhone",
			resultado: "iOS"
		},
		{
			cadena: navigator.platform,
			subcadena: "Android",
			resultado: "Android"
		},
		{
			cadena: navigator.platform,
			subcadena: "Linux",
			resultado: "Linux"
		}
	]
};