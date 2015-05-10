<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>


<head>
<title>Reserva ${ReserveDTO.id} - <spring:message
		code="site.name" /></title>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/style.css">
</head>

<body id="body-reserve">
	<jsp:include page="header.jsp" />

	<nav class="no-print navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar-collapse" data-audit="yes" id="reserve-navbar">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"> <spring:message code="login.title" />
				</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index" data-audit="yes" id="reserve-index"><spring:message code="index.title" /></a></li>
					<li><a href="search" data-audit="yes" id="reserve-search"><spring:message code="search.title" /></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><a><spring:message code="profile.title" /></a></li>
				</ul>
			</div>
		</div>
	</nav>
	
	<jsp:include page="description.jsp" />

	<div class="container">
		<ol class="no-print breadcrumb">
			<li><a href="profile" data-audit="yes" id="reserve-profile"><spring:message code="profile.title" /></a></li>
			<li class="active"><spring:message code="summary.reserve" /> ${ReserveDTO.id}</li>
		</ol>
		<div class="panel panel-default">
			<div class="panel-heading">
				<spring:message code="summary.reserve.data" />
			</div>
			<div class="panel-body">
				<p class="col-md-3 col-sm-6">
					<strong><spring:message code="field.name" />: </strong>
					<c:out value="${ReserveDTO.user.name}" />
				</p>
				<p class="col-md-3 col-sm-6">
					<strong><spring:message code="field.lastname" />: </strong>
					<c:out value="${ReserveDTO.user.lastname}" />
				</p>
				<p class="col-md-2 col-sm-6">
					<strong><spring:message
							code="field.document.${fn:toLowerCase(ReserveDTO.user.documentType)}" />:
					</strong>
					<c:out value="${ReserveDTO.user.documentNumber}"></c:out>
				</p>
				<p class="col-md-4 col-sm-6">
					<strong><spring:message code="field.email" />: </strong>
					<c:out value="${ReserveDTO.user.email}" />
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Viaje de ida</h3>
					</div>
					<div class="panel-body">
						<p class="col-sm-6">
							<strong><spring:message code="field.origin" />: </strong>${ReserveDTO.origin}</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.destination" />: </strong>${ReserveDTO.destination}</p>
						<p class="col-sm-12">
							<strong><spring:message code="field.date" />: </strong>${ReserveDTO.departureDate}</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.departure" />: </strong>${ReserveDTO.outboundDeparture}</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.arrival" />: </strong>${ReserveDTO.outboundArrival}</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.seats" />: </strong>
							<c:forEach var="seat" items="${ReserveDTO.departureSeats}">
								<c:out value="${seat} "></c:out>
							</c:forEach>
						</p>
						<p class="col-sm-6">
							<strong><spring:message code="field.price.per.seat" />:
							</strong>${ReserveDTO.pricePerDepartureSeat} &euro;
						</p>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<spring:message code="reserve.inbound.travel" />
					</div>
					<div class="panel-body">
						<c:choose>
							<c:when test="${empty returnSchedule}">
								<spring:message code="summary.no.return" />
							</c:when>
							<c:otherwise>
								<p class="col-sm-6">
									<strong><spring:message code="field.origin" />: </strong>${ReserveDTO.destination}</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.destination" />:
									</strong>${ReserveDTO.origin}</p>
								<p class="col-sm-12">
									<strong><spring:message code="field.date" />: </strong>${ReserveDTO.returnDate}</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.departure" />: </strong>${ReserveDTO.inboundDeparture}</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.arrival" />: </strong>${ReserveDTO.inboundArrival}</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.seats" />: </strong>
									<c:forEach var="seat" items="${ReserveDTO.returnSeats}">
										<c:out value="${seat} "></c:out>
									</c:forEach>
								</p>
								<p class="col-sm-6">
									<strong><spring:message code="field.price.per.seat" />:
									</strong>${ReserveDTO.pricePerReturnSeat} &euro;
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
		<div class="no-print row">
			<form action="cancelReserve" method="post" class="form form-inline"
				role="form">
				<input type="hidden" value="${ReserveDTO.id}" name="id" />
				<div class="text-center">
					<button class="btn btn-custom btn-lg" id="print" data-audit="yes" type="button">
						<span class="glyphicon glyphicon-print"></span>
						<spring:message code="reserve.print" />
					</button>
					
					<c:if test="${not ReserveDTO.old}">
						<button class="btn btn-red btn-lg" type="submit" data-audit="yes" id="reserve-submit">
							<span class="glyphicon glyphicon-trash"></span>
							<spring:message code="reserve.cancel" />
						</button>
					</c:if>
				</div>
			</form>
		</div>

	</div>

	<jsp:include page="footer.jsp" />

	<script type="text/javascript">
		$(function() {
			$("#print").click(function() {
				window.print()
			})
		})
	</script>
</body>

</html>