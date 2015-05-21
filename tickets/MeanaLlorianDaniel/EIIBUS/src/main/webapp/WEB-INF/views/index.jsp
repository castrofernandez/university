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

	<div class="container">
		<div class="jumbotron confirmated">
			<p class="icon title">
				<span class="glyphicon glyphicon-flag"></span>
				<spring:message code="index.welcome" />
			</p>
			<p class="description">
				<spring:message code="index.description.survey" />
			</p>
			
			
			<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
			  <!-- Indicators -->
			  <ol class="carousel-indicators">
			    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
			    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
			    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
			    <li data-target="#carousel-example-generic" data-slide-to="3"></li>
			    <li data-target="#carousel-example-generic" data-slide-to="4"></li>
			  </ol>
			
			  <!-- Wrapper for slides -->
			  <div class="carousel-inner" role="listbox">
			    <div class="item active">
			      <img src="resources/img/captures/one.png" alt="">
			      <div class="carousel-caption"></div>
			    </div>
			    <div class="item">
			      <img src="resources/img/captures/two.png" alt="">
			      <div class="carousel-caption"></div>
			    </div>
			    <div class="item">
			      <img src="resources/img/captures/three.png" alt="">
			      <div class="carousel-caption"></div>
			    </div>
			    <div class="item">
			      <img src="resources/img/captures/four.png" alt="">
			      <div class="carousel-caption"></div>
			    </div>
			    <div class="item">
			      <img src="resources/img/captures/five.png" alt="">
			      <div class="carousel-caption"></div>
			    </div>
			  </div>
			
			  <!-- Controls -->
			  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
			    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
			    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
			
			<br />
			<p class="description">
				<spring:message code="index.description.survey2" />
			</p>
			<p class="score-description">
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span> = <spring:message code="survey.score.lowest" />
			</p>
			<p class="score-description">
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span>
				<span class="glyphicon glyphicon-star" aria-hidden="true"></span> = <spring:message code="survey.score.highest" />
			</p>
			
			<div class="alert alert-danger survey-alert" role="alert" id="survey-incomplete">
				<spring:message code="survey.incomplete" />
			</div>
			
			<form:form action="start" method="POST"
					commandName="StartSurveyDTO" class="form" role="form" id="survey-form">
				<form:hidden path="email" value="${StartSurveyDTO.email}" />
					
				<ul class="questions">
					<li>
						<span class="number">1</span>
						<div class="question"><spring:message code="presurvey.q1" /></div>
						<form:hidden path="answer1" id="answer1" value="${StartSurveyDTO.answer1}" data-audit="yes" />
						<div class="answer" data-answer="answer1"></div>
					</li>
					<li>
						<span class="number">2</span>
						<div class="question"><spring:message code="presurvey.q2" /></div>
						<form:hidden path="answer2" id="answer2" value="${StartSurveyDTO.answer2}" data-audit="yes" />
						<div class="answer" data-answer="answer2"></div>
					</li>
					<li>	
						<span class="number">3</span>
						<div class="question"><spring:message code="presurvey.q3" /></div>
						<form:hidden path="answer3" id="answer3" value="${StartSurveyDTO.answer3}" data-audit="yes" />
						<div class="answer" data-answer="answer3"></div>
					</li>
					<li>
						<span class="number">4</span>
						<div class="question"><spring:message code="presurvey.q4" /></div>
						<form:hidden path="answer4" id="answer4" value="${StartSurveyDTO.answer4}" data-audit="yes" />
						<div class="answer" data-answer="answer4"></div>
					</li>
					<li>
						<span class="number">5</span>
						<div class="question"><spring:message code="presurvey.q5" /></div>
						<form:hidden path="answer5" id="answer5" value="${StartSurveyDTO.answer5}" data-audit="yes" />
						<div class="answer" data-answer="answer5"></div>
					</li>
					<li>
						<span class="number">6</span>
						<div class="question"><spring:message code="presurvey.q6" /></div>
						<form:hidden path="answer6" id="answer6" value="${StartSurveyDTO.answer6}" data-audit="yes" />
						<div class="answer" data-answer="answer6"></div>
					</li>
					<li>
						<span class="number">7</span>
						<div class="question"><spring:message code="presurvey.q7" /></div>
						<form:hidden path="answer7" id="answer7" value="${StartSurveyDTO.answer7}" data-audit="yes" />
						<div class="answer" data-answer="answer7"></div>
					</li>
					
					<li>
						<span class="number">8</span>
						<div class="question"><spring:message code="presurvey.q8" /></div>
						<form:hidden path="answer8" id="answer8" value="${StartSurveyDTO.answer8}" data-audit="yes" />
						<div class="answer" data-answer="answer8"></div>
					</li>
					<li>
						<span class="number">9</span>
						<div class="question"><spring:message code="presurvey.q9" /></div>
						<form:hidden path="answer9" id="answer9" value="${StartSurveyDTO.answer9}" data-audit="yes" />
						<div class="answer" data-answer="answer9"></div>
					</li>
					<li>
						<span class="number">10</span>
						<div class="question"><spring:message code="presurvey.q10" /></div>
						<form:hidden path="answer10" id="answer10" value="${StartSurveyDTO.answer10}" data-audit="yes" />
						<div class="answer" data-answer="answer10"></div>
					</li>
				</ul>
			
				<button class="btn btn-primary btn-lg large" id="survey" data-audit="yes" type="submit" id="survey-submit">
						<span class="glyphicon glyphicon-share-alt"></span>
						<spring:message code="survey.submit" />
				</button>
			</form:form>
		</div>
	</div>

	<jsp:include page="footer.jsp" />
	<script type="text/javascript" src="resources/js/survey.js"></script>
</body>

</html>