var answers = document.querySelectorAll(".answer");
var length = answers.length;

for (var i = 0; i < length; i++) {
	var answer = answers[i];
	var parent = answer.getAttribute("data-answer");
	
	document.getElementById(parent).value = 1;
	
	for (var j = 0; j < 7; j++) {
		var star = document.createElement("span");
		star.className = "glyphicon glyphicon-star star";
		star.value = j + 1;
		star.answer = parent;
		
		if (j === 0)
			star.setAttribute("status", "active");
		
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