var answers = document.querySelectorAll(".answer");
var length = answers.length;

for (var i = 0; i < length; i++) {
	var answer = answers[i];
	var parent = answer.getAttribute("data-answer");
	
	var p = document.getElementById(parent)
	p.value = 0;
	p.setAttribute("data-input-hidden", true);
	
	for (var j = 0; j < 7; j++) {
		var star = document.createElement("span");
		star.className = "glyphicon glyphicon-star star";
		star.value = j + 1;
		star.answer = parent;
		
		//if (j === 0)
		//	star.setAttribute("status", "active");
		
		answer.appendChild(star);
		
		star.onclick = function(event) {
			var previous = this.previousSibling;
			var next = this.nextSibling;
			
			while (previous) {
				previous.setAttribute("status", "active");
				previous = previous.previousSibling;
			}
			
			this.setAttribute("status", "active");
			
			while (next) {
				next.setAttribute("status", "inactive");
				next = next.nextSibling;
			}
			
			// Set value
			var value = this.value;
			var answer = this.answer;
		
			document.getElementById(answer).value = value;
		}
	}
}

document.getElementById("survey-form").onsubmit = function() {
	var inputs = document.querySelectorAll("[data-input-hidden]");
	var length = inputs.length;

	var count = 0;
	
	for (var i = 0; i < length; i++) {
		var input = inputs[i];
		var value = input.value;
	
		if (value === "0")
			count++;
		
		input.parentNode.className = value === "0" ? 'incorrect' : 'correct';
	}
	
	document.getElementById("survey-incomplete").style.display = count > 0 ? 'block' : 'none';

	return count === 0;
}