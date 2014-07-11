if (!auditoria)
	var auditoria = new Object();

auditoria.host = "http://localhost:3000";
auditoria.user = -1;
auditoria.audit = -1;

auditoria.Auditoria = function(canvas)
{
	this.data = new Object();

	this.data.canvas = xuegu.Utilidades.dimensionesJuego(canvas);

	this.data.observations = [];
	this.data.tests = [];

	this.incluirPrueba = function(prueba) {
		this.data.tests.push(prueba);
	}

	this.clear = function() {
		this.data.observations = [];
		this.data.tests = [];
	}

	var parameters = getUrlParameters();
	var code = parameters.parameters["code"];

	// Obtener id de usuario
	wesCountry.ajax.load({
		url: auditoria.host + "/users",
		parameters: '{ "code": "' + code + '" }',
		method: "POST",
		content_type: "application/json",
		callback: function(info) {
			info = JSON.parse(info);
			auditoria.user = info.user;
			auditoria.audit = info.audit;
		}
	});

  function getUrlParameters() {
    var parameters = {};

    var url = document.URL;

    var queryString = url.split('?');

    var host = queryString[0];

    if (queryString.length > 1) {
      queryString = queryString[1];

      queryString = queryString.split('&');

      for (var i = 0; i < queryString.length; i++) {
        var parameter = queryString[i].split("=");

        var name = parameter[0];
        var value = parameter[1] ? parameter[1] : "";

        parameters[name] = value;
      }
    }

    return {
      host: host,
      parameters: parameters
    };
  }
}
