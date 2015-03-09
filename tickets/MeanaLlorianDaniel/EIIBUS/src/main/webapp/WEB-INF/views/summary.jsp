<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>


<head>
<title><c:choose>
		<c:when test="${empty reserveId}">
			<spring:message code="reserve.title" />: <spring:message
				code="summary.title" /> - <spring:message code="site.name" />
		</c:when>
		<c:otherwise>
			<spring:message code="reserve.title" />: <spring:message
				code="summary.finish.reserve" /> - <spring:message code="site.name" />
		</c:otherwise>
	</c:choose></title>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/style.css">
</head>

<body>
	<jsp:include page="header.jsp" />

	<nav class="no-print navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"> <spring:message code="reserve.title" />
				</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index"><spring:message code="index.title" /></a></li>
					<li class="active"><a><spring:message code="reserve.title" /></a></li>
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
		<c:if test="${not empty reserveId}">
			<div class="jumbotron confirmated">
				<p class="icon">
					<span class="glyphicon glyphicon-ok"></span>
				</p>
				<p class="title">
					<spring:message code="summary.finish.reserve" />
				</p>
				<p>
					<strong><spring:message code="summary.reserve.identifier" />:
					</strong>${reserveId}
				</p>
				<p>
					<button type="button" id="print-confirmation"
						class="no-print btn btn-custom btn-lg">
						<span class="glyphicon glyphicon-print"></span>
						<spring:message code="summary.print.confimation" />
					</button>
				</p>
			</div>
		</c:if>
		<c:if test="${empty reserveId}">
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
						<input type="submit" class="link-submit" value="${searchTitle}" />
					</form:form></li>
				<li><form:form action="schedules" method="GET"
						commandName="ReserveDTO" class="form" role="form">
						<form:hidden path="origin" value="${ReserveDTO.origin}" />
						<form:hidden path="departureDate"
							value="${ReserveDTO.departureDate}" />
						<form:hidden path="departureSchedule"
							value="${ReserveDTO.departureSchedule}" />
						<form:hidden path="type" value="${ReserveDTO.type}" />
						<form:hidden path="destination" value="${ReserveDTO.destination}" />
						<form:hidden path="returnDate" value="${ReserveDTO.returnDate}" />
						<form:hidden path="returnSchedule"
							value="${ReserveDTO.returnSchedule}" />
						<form:hidden path="passengers" value="${ReserveDTO.passengers}" />
						<c:set var="schedulesTitle">
							<spring:message code="schedules.title" />
						</c:set>
						<input type="submit" class="link-submit" value="${schedulesTitle}" />
					</form:form></li>
				<li><form:form action="personalData" method="GET"
						commandName="ReserveDTO" class="form" role="form">
						<form:hidden path="origin" value="${ReserveDTO.origin}" />
						<form:hidden path="departureDate"
							value="${ReserveDTO.departureDate}" />
						<form:hidden path="departureSchedule"
							value="${ReserveDTO.departureSchedule}" />
						<form:hidden path="type" value="${ReserveDTO.type}" />
						<form:hidden path="destination" value="${ReserveDTO.destination}" />
						<form:hidden path="returnDate" value="${ReserveDTO.returnDate}" />
						<form:hidden path="returnSchedule"
							value="${ReserveDTO.returnSchedule}" />
						<form:hidden path="passengers" value="${ReserveDTO.passengers}" />
						<c:forEach var="extra" items="${ReserveDTO.extras}">
							<form:hidden path="extras" value="${extra}" />
						</c:forEach>
						<c:forEach var="departureSeat"
							items="${ReserveDTO.departureSeats}">
							<form:hidden path="departureSeats" value="${departureSeat}" />
						</c:forEach>
						<c:forEach var="returnSeat" items="${ReserveDTO.returnSeats}">
							<form:hidden path="returnSeats" value="${returnSeat}" />
						</c:forEach>
						<input type="submit" class="link-submit" value="Datos personales" />
					</form:form></li>
				<li class="active"><spring:message code="summary.title" /></li>
			</ol>
			<div class="no-print progress">
				<div class="progress-bar progress-bar-custom" role="progressbar"
					aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
					style="width: 100%">
					<spring:message code="reserve.step" />
					4
					<spring:message code="reserve.of" />
					4
				</div>
			</div>
		</c:if>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">
					<spring:message code="summary.reserve.data" />
				</h3>
			</div>
			<div class="panel-body">
				<p class="col-md-3 col-sm-6">
					<strong><spring:message code="field.name" />: </strong>
					<c:out value="${user.name}" />
				</p>
				<p class="col-md-3 col-sm-6">
					<strong><spring:message code="field.lastname" />: </strong>
					<c:out value="${user.lastname}" />
				</p>
				<p class="col-md-2 col-sm-6">
					<strong><spring:message
							code="field.document.${fn:toLowerCase(user.documentType)}" />: </strong>
					<c:out value="${user.documentNumber}"></c:out>
				</p>
				<p class="col-md-4 col-sm-6">
					<strong><spring:message code="field.email" />: </strong>
					<c:out value="${user.email}" />
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<spring:message code="reserve.outbound.travel" />
						</h3>
					</div>
					<div class="panel-body">
						<p class="col-sm-6">
							<strong><spring:message code="field.origin" />: </strong>${departureSchedule.origin}</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.destination" />: </strong>${departureSchedule.destination}</p>
						<p class="col-sm-12">
							<strong><spring:message code="field.date" />: </strong>${ReserveDTO.departureDate}</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.departure" />: </strong>${departureSchedule.departure}</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.arrival" />: </strong>${departureSchedule.arrival}</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.seats" />: </strong>
							<c:forEach var="seat" items="${departureSeats}">
								<c:out value="${seat} "></c:out>
							</c:forEach>
						</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.price.per.seat" />:
							</strong>${departureSchedule.price} &euro;
						</p>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<spring:message code="reserve.inbound.travel" />
						</h3>
					</div>
					<div class="panel-body">
						<c:choose>
							<c:when test="${empty returnSchedule}">
								<spring:message code="summary.no.return" />
							</c:when>
							<c:otherwise>
								<p class="col-sm-6">
									<strong><spring:message code="field.origin" />: </strong>${returnSchedule.origin}</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.destination" />:
									</strong>${returnSchedule.destination}</p>
								<p class="col-sm-12">
									<strong><spring:message code="field.date" />: </strong>${ReserveDTO.returnDate}</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.departure" />: </strong>${returnSchedule.departure}</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.arrival" />: </strong>${returnSchedule.arrival}</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.seats" />: </strong>
									<c:forEach var="seat" items="${returnSeats}">
										<c:out value="${seat} "></c:out>
									</c:forEach>
								</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.price.per.seat" />:
									</strong>${returnSchedule.price} &euro;
								</p>
							</c:otherwise>
						</c:choose>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8 col-md-offset-2">
				<div class="table-responsive">
					<table class="table table-striped prices">
						<thead>
							<tr>
								<th class="item"><spring:message code="field.description" /></th>
								<th class="price"><spring:message code="field.price" /></th>
							</tr>
						</thead>
						<tbody>
							<c:forEach var="item" items="${prices}">
								<tr>
									<td class="item"><spring:message code="${item.key}" /></td>
									<td class="price">${item.value}&euro;</td>
								</tr>
							</c:forEach>
						</tbody>
						<tfoot>
							<tr>
								<th class="item"><spring:message code="field.total" /></th>
								<th class="price">${total}&euro;</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
		<c:if test="${ empty reserveId}">
			<form:form action="confirm" method="POST" commandName="ReserveDTO"
				class="form" role="form">
				<form:hidden path="origin" value="${ReserveDTO.origin}" />
				<form:hidden path="departureDate"
					value="${ReserveDTO.departureDate}" />
				<form:hidden path="departureSchedule"
					value="${ReserveDTO.departureSchedule}" />
				<form:hidden path="type" value="${ReserveDTO.type}" />
				<form:hidden path="destination" value="${ReserveDTO.destination}" />
				<form:hidden path="returnDate" value="${ReserveDTO.returnDate}" />
				<form:hidden path="returnSchedule"
					value="${ReserveDTO.returnSchedule}" />
				<form:hidden path="passengers" value="${ReserveDTO.passengers}" />
				<c:forEach var="extra" items="${ReserveDTO.extras}">
					<form:hidden path="extras" value="${extra}" />
				</c:forEach>
				<c:forEach var="departureSeat" items="${ReserveDTO.departureSeats}">
					<form:hidden path="departureSeats" value="${departureSeat}" />
				</c:forEach>
				<c:forEach var="returnSeat" items="${ReserveDTO.returnSeats}">
					<form:hidden path="returnSeats" value="${returnSeat}" />
				</c:forEach>
				<button type="submit" class="no-print btn btn-custom pull-right">
					<spring:message code="summary.confirm.reserve" />
				</button>
			</form:form>
		</c:if>
	</div>

	<jsp:include page="footer.jsp" />

	<script type="text/javascript">
		$("#print-confirmation").click(function() {
			window.print()
		})
	</script>
</body>

</html>