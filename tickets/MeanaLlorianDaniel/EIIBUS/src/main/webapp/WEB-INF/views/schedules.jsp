<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>

<head>
<title><spring:message code="reserve.title" />: <spring:message
		code="schedules.title" /> - <spring:message code="site.name" /></title>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/style.css">
</head>

<body id="body-schedules">
	<jsp:include page="header.jsp" />

	<nav class="no-print navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-audit="yes" id="schedules-navbar"
					data-toggle="collapse" data-target="#navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"> <spring:message code="reserve.title" />
				</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index" data-audit="yes" id="schedules-index"><spring:message code="index.title" /></a></li>
					<li class="active"><a><spring:message code="reserve.title" /></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<c:choose>
						<c:when test="${empty userName}">
							<li><a href="login" data-audit="yes" id="schedules-login"><spring:message code="login.title" /></a></li>
						</c:when>
						<c:otherwise>
							<li><a href="profile" data-audit="yes" id="schedules-profile"><spring:message
										code="profile.title" /></a></li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</div>
	</nav>
	
	<jsp:include page="description.jsp" />

	<div class="container">
		<ol class="no-print breadcrumb">
			<li><form:form action="search" method="GET"
					commandName="ReserveDTO" class="form" role="form">
					<form:hidden path="origin" value="${ReserveDTO.origin}" />
					<form:hidden path="departureDate"
						value="${ReserveDTO.departureDate}" />
					<form:hidden path="type" value="${ReserveDTO.type}" />
					<form:hidden path="destination" value="${ReserveDTO.destination}" />
					<form:hidden path="returnDate" value="${ReserveDTO.returnDate}" />
					<form:hidden path="passengers" value="${ReserveDTO.passengers}" />
					<c:set var="searchTitle">
						<spring:message code="search.title" />
					</c:set>
					<input type="submit" class="link-submit" value="${searchTitle}" data-audit="yes" id="schedules-search-submit" />
				</form:form></li>
			<li class="active"><spring:message code="schedules.title" /></li>
		</ol>
		<div class="no-print progress">
			<div class="progress-bar progress-bar-custom" role="progressbar"
				aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
				style="width: 50%">
				<spring:message code="reserve.step" />
				2
				<spring:message code="reserve.of" />
				4
			</div>
		</div>
		<c:if test="${not empty msgError}">
			<div class="no-print alert alert-danger alert-dismissible"
				role="alert">
				<button type="button" class="close" data-dismiss="alert" data-audit="yes" id="schedules-alert"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<spring:message code="${msgError}" />
			</div>
		</c:if>
		<legend>
			<spring:message code="schedules.departure.schedules" />
		</legend>
		<form:form action="seats" method="GET" commandName="ReserveDTO"
			class="form" role="form">
			<c:set var="departureScheduleErrors">
				<form:errors path="departureSchedule" />
			</c:set>
			<c:if test="${not empty departureScheduleErrors}">
				<div class="alert alert-danger alert-dismissible" role="alert">
					<button type="button" class="close" data-dismiss="alert" data-audit="yes" id="schedules-alert-departure"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<span class="glyphicon glyphicon-warning-sign"></span>
					${departureScheduleErrors}
				</div>
			</c:if>
			<form:hidden path="origin" value="${ReserveDTO.origin}" />
			<form:hidden path="departureDate" value="${ReserveDTO.departureDate}" />
			<form:hidden path="type" value="${ReserveDTO.type}" />
			<form:hidden path="destination" value="${ReserveDTO.destination}" />
			<form:hidden path="returnDate" value="${ReserveDTO.returnDate}" />
			<form:hidden path="passengers" value="${ReserveDTO.passengers}" />
			<div class="table-responsive">
				<table class="schedules table table-striped">
					<thead>
						<tr>
							<th class="no-print"></th>
							<th class="origin"><spring:message code="field.origin" /></th>
							<th class="destination"><spring:message
									code="field.destination" /></th>
							<th class="departure"><spring:message code="field.departure" /></th>
							<th class="arrival"><spring:message code="field.arrival" /></th>
							<th class="duration"><spring:message code="field.duration" /></th>
							<th class="days"><spring:message code="field.days" /></th>
							<th class="seats"><spring:message
									code="field.seats.available" /></th>
							<th class="price"><spring:message code="field.price" /></th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="schedule" items="${departureSchedules}"
							varStatus="index">
							<tr id="departure-${schedule.id}">
								<td class="no-print"><form:radiobutton
										path="departureSchedule" value="${schedule.id}" data-label="${schedule.origin}" data-audit="yes" /></td>
								<td class="origin">${schedule.origin}</td>
								<td class="destination">${schedule.destination}</td>
								<td class="departure">${schedule.departure}</td>
								<td class="arrival">${schedule.arrival}</td>
								<td class="duration">${schedule.duration}</td>
								<td class="days"><c:forEach var="day"
										items="${schedule.days}">
										<spring:message code="site.${fn:toLowerCase(day)}.abbr" />
									</c:forEach></td>
								<td class="seats">${schedule.seats}</td>
								<td class="price">${schedule.price}&euro;</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>
			<c:if test="${not empty returnSchedules}">
				<legend>
					<spring:message code="schedules.return.schedules" />
				</legend>
				<c:set var="returnScheduleErrors">
					<form:errors path="returnSchedule" />
				</c:set>
				<c:if test="${not empty returnScheduleErrors}">
					<div class="alert alert-danger alert-dismissible" role="alert">
						<button type="button" class="close" data-dismiss="alert" data-audit="yes" id="schedules-alert-return"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<span class="glyphicon glyphicon-warning-sign"></span>
						${returnScheduleErrors}
					</div>
				</c:if>
				<div class="table-responsive">
					<table class="schedules table table-striped">
						<thead>
							<tr>
								<th class="no-print"></th>
								<th class="origin"><spring:message code="field.origin" /></th>
								<th class="destination"><spring:message
										code="field.destination" /></th>
								<th class="departure"><spring:message
										code="field.departure" /></th>
								<th class="arrival"><spring:message code="field.arrival" /></th>
								<th class="duration"><spring:message code="field.duration" /></th>
								<th class="days"><spring:message code="field.days" /></th>
								<th class="seats"><spring:message
										code="field.seats.available" /></th>
								<th class="price"><spring:message code="field.price" /></th>
							</tr>
						</thead>
						<tbody>
							<c:forEach var="schedule" items="${returnSchedules}"
								varStatus="index">
								<tr id="return-${schedule.id}">
									<td class="no-print"><form:radiobutton
											path="returnSchedule" value="${schedule.id}" data-label="${schedule.origin}" data-audit="yes" /></td>
									<td class="origin">${schedule.origin}</td>
									<td class="destination">${schedule.destination}</td>
									<td class="departure">${schedule.departure}</td>
									<td class="arrival">${schedule.arrival}</td>
									<td class="duration">${schedule.duration}</td>
									<td class="days"><c:forEach var="day"
											items="${schedule.days}">
											<spring:message code="site.${fn:toLowerCase(day)}.abbr" />
										</c:forEach></td>
									<td class="seats">${schedule.seats}</td>
									<td class="price">${schedule.price}&euro;</td>
								</tr>

							</c:forEach>
						</tbody>
					</table>
				</div>
			</c:if>
			<div class="no-print form-group row">
				<div class="col-xs-6">
					<button id="print" class="btn btn-custom" type="button" data-audit="yes">
						<span class="glyphicon glyphicon-print"></span>
						<spring:message code="schedules.print.schedules" />
					</button>
				</div>
				<div class="col-xs-6">
					<button type="submit" class="btn btn-custom pull-right" data-audit="yes" id="schedules-submit">
						<spring:message code="schedules.choose.seats" />
					</button>
				</div>
			</div>
		</form:form>
	</div>

	<jsp:include page="footer.jsp" />

	<script type="text/javascript">
		$(function() {
			$('input[name=returnSchedule]:radio').change(function() {
				if ($(this).is(":checked")) {
					var radios = $('input[name=returnSchedule]:radio')
					for (var i = 0; i < radios.length; i++) {
						$('#return-' + (radios[i].value)).removeClass('info')
					}
					$('#return-' + $(this).attr('value')).addClass('info')
				}
			})
			$('input[name=departureSchedule]:radio')
					.change(
							function() {
								if ($(this).is(":checked")) {
									var value = $(this).attr('value')
									var radios = $('input[name=departureSchedule]:radio')
									for (var i = 0; i < radios.length; i++) {
										$('#departure-' + (radios[i].value))
												.removeClass('info')
									}
									$('#departure-' + value).addClass('info')
								}
							})
			$('input[name=returnSchedule]:radio').change()
			$('input[name=departureSchedule]:radio').change()
			$("#print").click(function() {
				window.print()
			})
		})
	</script>
</body>

</html>