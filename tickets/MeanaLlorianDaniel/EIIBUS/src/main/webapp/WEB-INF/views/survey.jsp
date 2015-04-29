<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>


<head>
<title><spring:message code="survey.title" /> - <spring:message
		code="site.name" /></title>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/style.css">
</head>

<body id="body-error">
	<jsp:include page="header.jsp" />

	<nav class="navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"><spring:message code="error.title" /></a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index"><spring:message code="index.title" /></a></li>
					<li><a href="search"><spring:message code="search.title" /></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<c:choose>
						<c:when test="${empty userName}">
							<li><a href="login"><spring:message code="login.title" /></a></li>
						</c:when>
						<c:otherwise>
							<li><a href="profile"><spring:message
										code="profile.title" /></a></li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container">
		<div class="jumbotron confirmated">
			<p class="icon">
				<span class="glyphicon glyphicon-pencil"></span> <spring:message code="survey.title" />
			</p>
			<ul class="questions">
				<li>
					<div class="question"><spring:message code="survey.q1" /></div>
					<div class="answer"></div>
				</li>
				<li>
					<div class="question"><spring:message code="survey.q1" /></div>
					<div class="answer"></div>
				</li>
			</ul>
		</div>
	</div>

	<jsp:include page="footer.jsp" />
</body>
	<script>
		var answers = document.querySelectorAll(".answer");
		var length = answers.length;
		
		for (var i = 0; i < length; i++) {
			var answer = answers[i];
			
			for (var j = 0; j < 7; j++) {
				var star = document.createElement("span");
				star.className = "glyphicon glyphicon-star star";
				
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
				}
			}
		}
	</script>
</html>