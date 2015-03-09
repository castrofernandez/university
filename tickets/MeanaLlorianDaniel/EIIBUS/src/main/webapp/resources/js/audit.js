var user = document.getElementById("user-id");

if (user && user.value) {
	user = user.value;
	
	$.ajax({
	    url: "http://bus.circoneuronal.org/users",
	    jsonp: "callback",
	    dataType: "jsonp",
	    data: {
	        width: window.innerWidth,
	        height: window.innerHeight,
	        info: user
	    },
	    success: function (response) {
	        if (response.success)
	        	startAudit(response.id);
	    }
	});
}

function startAudit(user_id) {
	var hash = (function() {
		function s4() {
		   return Math.floor((1 + Math.random()) * 0x10000)
		     .toString(16)
		     .substring(1);
	  }
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		    s4() + '-' + s4() + s4() + s4();
	})();
	
	console.log(hash)
	
	var count = 1;
		
	var observations = [];
	
	var events = ["dblclick", "change", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "touchstart", "touchmove", "touchend", "keydown", "keyup", "keypress"];
	var eventLength = events.length;
	
	function handleEvent (element, event, handler) {
		if (element.attachEvent)
			element.attachEvent("on" + event, function() { handler.call(element); });
		else
			element.addEventListener(event, handler, false);
	}
	
	var start = new Date();
	
	function getTime() {
		var now = new Date();
		var diff = start.getTime() - now.getTime();
		return Math.abs(diff);
	}
	
	function getNumericStyleProperty(style, prop) {
	    return parseInt(style.getPropertyValue(prop), 10);
	}
	 
	function getInnerCoordinates(element, event) {
	    var x = 0, y = 0;
	    var inner = true;
	    
	    while (element = element.offsetParent) {
	        x += element.offsetLeft;
	        y += element.offsetTop;
	        
	        var style = getComputedStyle(element, null);
	        var borderTop = getNumericStyleProperty(style, "border-top-width");
	        var borderLeft = getNumericStyleProperty(style, "border-left-width");
	        
	        y += borderTop ;
	        x += borderLeft ;
	        
	        if (inner){
	          var paddingTop = getNumericStyleProperty(style, "padding-top");
	          var paddingLeft = getNumericStyleProperty(style, "padding-left");
	          y += paddingTop ;
	          x += paddingLeft ;
	        }
	        inner = false ;
	    }
	    
	    return { x: event.pageX - x, y: event.pageY - y };
	}
	
	function registerObservation(element, event) {
		var time = getTime();
		
		event = event ? event : window.event;
		
		var id = element.id ? element.id : element.tagName;
		var innerCoordinates = getInnerCoordinates(element, event);
		
		var observation = {
			"identifier": document.URL,
			"test": hash,
			"element": id,
			"width": element.offsetWidth,
			"height": element.offsetHeight,
			"x": innerCoordinates.x,
			"y": innerCoordinates.y,
			"sx": event.pageX,
			"sy": event.pageY,
			"instant": getTime(),
			"type": event.type,
			"value": element.value ? element.value : null,
			"user_id": user_id,
			"count": count
		};

		observations.push(observation);
		
		count++;

		$.ajax({
		    url: "http://bus.circoneuronal.org/observations",
		    jsonp: "callback",
		    dataType: "jsonp",
		    data: observation,
		    success: function (response) {
		        console.log(response);
		    }
		});
	}
	
	var elements = document.querySelectorAll("[data-audit='yes']")
	var length = elements.length;
	
	for (var i = 0; i < length; i++) {
		var element = elements[i];
		
		handleEvent(element, "click", function(e) {
			e.preventDefault();
			
			registerObservation(e);
			
			var href = this.getAttribute("href");
			
			if (href)
				window.location.href = href;
		});
		
		for (var j = 0; j < eventLength; j++) {
			event = events[j];
			handleEvent(element, event, function(e) {
				registerObservation(this, e);
			});
		}
	}
	
	handleEvent(document.body, "mousemove", function(e) {
		registerObservation(this, e);
	});
}
