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
	
	var count = 1;
		
	var observations = [];
	
	var events = ["dblclick", "change", "input", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "touchstart", "touchmove", "touchend", "keydown", "keyup", "keypress"];
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
	
	function registerObservation(element, event, callback) {
		var time = getTime();
		
		event = event ? event : window.event;
console.log(event.type)		
		var id = element.id;
		
		if (!id) {
			id = element.tagName;
			
			if (element.value) {
				id += "_" + element.value;
			}
		}
		
		var value = element.value;
		
		var label = null;
		
		if (element.options) {
			label = element.options[element.selectedIndex]
			
			if (label)
				label = label.innerHTML;
			
			if (label && label.trim)
				label = label.trim();
		}
		else if (element.getAttribute("data-label")) {
			label = element.getAttribute("data-label");
		}
		
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
			"value": element.value,
			"label": label,
			"other_value": element.checked ? element.checked : null,
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
		        if (callback)
		        	callback(response);
		    }
		});
	}
	
	var elements = document.querySelectorAll("[data-audit='yes']")
	var length = elements.length;
	
	for (var i = 0; i < length; i++) {
		var element = elements[i];
		
		handleEvent(element, "click", function(e) {
			var href = this.getAttribute("href");
			var callback = null;
			
			if (href) {
				e.preventDefault();
				
				callback = function(response) {
					window.location.href = href;
				}
			}
			
			registerObservation(this, e, callback);
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
