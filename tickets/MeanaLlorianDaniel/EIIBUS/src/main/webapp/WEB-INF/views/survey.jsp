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

<body id="body-survey">
	<jsp:include page="header.jsp" />

	<nav class="navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"><spring:message code="survey.title" /></a>
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
			<p class="description">
				<spring:message code="survey.description" />
			</p>
			<br />
			
			<form:form action="save_survey" method="POST"
					commandName="SurveyDTO" class="form" role="form">
				<form:hidden path="email" value="${SurveyDTO.email}" />
				
				<p class="descripcion">
					<spring:message code="survey.subtitle1" />
				</p>
				<ul class="questions">
					<li>
						<div class="question"><spring:message code="survey.q1" /></div>
						<form:hidden path="answer1" id="answer1" value="${SurveyDTO.answer1}" />
						<div class="answer" data-answer="answer1"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q2" /></div>
						<form:hidden path="answer2" id="answer2" value="${SurveyDTO.answer2}" />
						<div class="answer" data-answer="answer2"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q3" /></div>
						<form:hidden path="answer3" id="answer3" value="${SurveyDTO.answer3}" />
						<div class="answer" data-answer="answer3"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q4" /></div>
						<form:hidden path="answer4" id="answer4" value="${SurveyDTO.answer4}" />
						<div class="answer" data-answer="answer4"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q5" /></div>
						<form:hidden path="answer5" id="answer5" value="${SurveyDTO.answer5}" />
						<div class="answer" data-answer="answer5"></div>
					</li>
				</ul>
				<p class="descripcion">
					<spring:message code="survey.subtitle2" />
				</p>
				<ul class="questions">
					<li>
						<div class="question"><spring:message code="survey.q6" /></div>
						<form:hidden path="answer6" id="answer6" value="${SurveyDTO.answer6}" />
						<div class="answer" data-answer="answer6"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q7" /></div>
						<form:hidden path="answer7" id="answer7" value="${SurveyDTO.answer7}" />
						<div class="answer" data-answer="answer7"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q8" /></div>
						<form:hidden path="answer8" id="answer8" value="${SurveyDTO.answer8}" />
						<div class="answer" data-answer="answer8"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q9" /></div>
						<form:hidden path="answer9" id="answer9" value="${SurveyDTO.answer9}" />
						<div class="answer" data-answer="answer9"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q10" /></div>
						<form:hidden path="answer10" id="answer10" value="${SurveyDTO.answer10}" />
						<div class="answer" data-answer="answer10"></div>
					</li>
				</ul>
				<p class="descripcion">
					<spring:message code="survey.subtitle3" />
				</p>
				<ul class="questions">
					<li>
						<div class="question"><spring:message code="survey.q11" /></div>
						<form:hidden path="answer11" id="answer11" value="${SurveyDTO.answer11}" />
						<div class="answer" data-answer="answer11"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q12" /></div>
						<form:hidden path="answer12" id="answer12" value="${SurveyDTO.answer12}" />
						<div class="answer" data-answer="answer12"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q13" /></div>
						<form:hidden path="answer13" id="answer13" value="${SurveyDTO.answer13}" />
						<div class="answer" data-answer="answer13"></div>
					</li>
				</ul>
				<p class="descripcion">
					<spring:message code="survey.subtitle4" />
				</p>
				<ul class="questions">
					<li>
						<div class="question"><spring:message code="survey.q14" /></div>
						<form:hidden path="answer14" id="answer14" value="${SurveyDTO.answer14}" />
						<div class="answer" data-answer="answer14"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q15" /></div>
						<form:hidden path="answer15" id="answer15" value="${SurveyDTO.answer15}" />
						<div class="answer" data-answer="answer15"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q16" /></div>
						<form:hidden path="answer16" id="answer16" value="${SurveyDTO.answer16}" />
						<div class="answer" data-answer="answer16"></div>
					</li>
				</ul>
				<p class="descripcion">
					<spring:message code="survey.subtitle5" />
				</p>
				<ul class="questions">
					<li>
						<div class="question"><spring:message code="survey.q17" /></div>
						<form:hidden path="answer17" id="answer17" value="${SurveyDTO.answer17}" />
						<div class="answer" data-answer="answer17"></div>
					</li>
				</ul>
				<p class="descripcion">
					<spring:message code="survey.subtitle6" />
				</p>
				<ul class="questions">
					<li>
						<div class="question"><spring:message code="survey.q18" /></div>
						<form:hidden path="answer18" id="answer18" value="${SurveyDTO.answer18}" />
						<div class="answer" data-answer="answer18"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q19" /></div>
						<form:hidden path="answer19" id="answer19" value="${SurveyDTO.answer19}" />
						<div class="answer" data-answer="answer19"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q20" /></div>
						<form:hidden path="answer20" id="answer20" value="${SurveyDTO.answer20}" />
						<div class="answer" data-answer="answer20"></div>
					</li>
					
					<li>
						<div class="question"><spring:message code="survey.q21" /></div>
						<form:hidden path="answer21" id="answer21" value="${SurveyDTO.answer21}" />
						<div class="answer" data-answer="answer21"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q22" /></div>
						<form:hidden path="answer22" id="answer22" value="${SurveyDTO.answer22}" />
						<div class="answer" data-answer="answer22"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q23" /></div>
						<form:hidden path="answer23" id="answer23" value="${SurveyDTO.answer23}" />
						<div class="answer" data-answer="answer23"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q24" /></div>
						<form:hidden path="answer24" id="answer24" value="${SurveyDTO.answer24}" />
						<div class="answer" data-answer="answer24"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q25" /></div>
						<form:hidden path="answer25" id="answer25" value="${SurveyDTO.answer25}" />
						<div class="answer" data-answer="answer25"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q26" /></div>
						<form:hidden path="answer26" id="answer26" value="${SurveyDTO.answer26}" />
						<div class="answer" data-answer="answer26"></div>
					</li>
					<li>
						<div class="question"><spring:message code="survey.q27" /></div>
						<form:hidden path="answer27" id="answer27" value="${SurveyDTO.answer27}" />
						<div class="answer" data-answer="answer27"></div>
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