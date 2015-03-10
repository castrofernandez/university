<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>


<head>
<title><spring:message code="reserve.title" />: <spring:message
		code="seats.title" /> - <spring:message code="site.name" /></title>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/style.css">
</head>

<body id="body-seats">
	<jsp:include page="header.jsp" />
	
	<nav class="navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-audit="yes" id="seats-navbar"
					data-toggle="collapse" data-target="#navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"> <spring:message code="reserve.title" />
				</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index" data-audit="yes" id="seats-index"><spring:message code="index.title" /></a></li>
					<li class="active"><a><spring:message code="reserve.title" /></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<c:choose>
						<c:when test="${empty userName}">
							<li><a href="login" data-audit="yes" id="seats-login"><spring:message code="login.title" /></a></li>
						</c:when>
						<c:otherwise>
							<li><a href="profile" data-audit="yes" id="seats-profile"><spring:message
										code="profile.title" /></a></li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container">
		<ol class="breadcrumb">
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
					<input type="submit" class="link-submit" value="${searchTitle}" data-audit="yes" id="seats-search-submit" />
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
					<input type="submit" class="link-submit" value="${schedulesTitle}" data-audit="yes" id="seats-schedules-submit" />
				</form:form></li>
			<li class="active"><spring:message code="seats.title" /></li>
		</ol>
		<div class="progress">
			<div class="progress-bar progress-bar-custom" role="progressbar"
				aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
				style="width: 75%">
				<spring:message code="reserve.step" />
				3
				<spring:message code="reserve.of" />
				4
			</div>
		</div>
		<form:form id="form" action="summary" method="GET"
			commandName="ReserveDTO" class="form" role="form">
			<div class="row">
				<div class="col-sm-6">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">
								<spring:message code="seats.title" />
							</h3>
						</div>
						<div class="panel-body">
							<div class="col-xs-6">
								<div class="row">
									<h4>
										<spring:message code="field.seats.departure" />
									</h4>
								</div>
								<c:forEach var="seatRow" items="${departureSeats}">
									<div class="row">
										<c:forEach var="seat" items="${seatRow}">
											<c:set var="prefix" value="" />
											<c:if test="${seat.id < 10}">
												<c:set var="prefix" value="0" />
											</c:if>
											<c:choose>
												<c:when test="${seat.free}">
													<span class="hidden-lg hidden-md">
														<button class="seat btn btn-seat-free btn-xs"
															type="button" data-type="departure"
															data-seat="${seat.id}" data-audit="yes" id="seats-seat-xs-${seat.id}">${prefix}${seat.id}</button>
													</span>
													<span class="hidden-sm hidden-xs">
														<button class="seat btn btn-seat-free" type="button"
															data-type="departure" data-seat="${seat.id}" data-audit="yes" id="seats-seat-${seat.id}">
															${prefix}${seat.id}</button>
													</span>
												</c:when>
												<c:otherwise>
													<span class="hidden-lg hidden-md">
														<button class="btn btn-seat-no-free btn-xs" type="button"
															disabled="disabled" data-audit="yes" id="seats-seat-xs-disabled-${seat.id}">${prefix}${seat.id}</button>
													</span>
													<span class="hidden-sm hidden-xs">
														<button class="btn btn-seat-no-free" type="button"
															disabled="disabled" data-audit="yes" id="seats-seat-disabled-${seat.id}">${prefix}${seat.id}</button>
													</span>
												</c:otherwise>
											</c:choose>
										</c:forEach>
									</div>
								</c:forEach>
								<c:set var="departureSeatsErrors">
									<form:errors path="departureSeats" />
								</c:set>
								<c:if test="${not empty departureSeatsErrors}">
									<div class="row">
										<p class="text-danger">${departureSeatsErrors}</p>
									</div>
								</c:if>
							</div>
							<c:if test="${not empty returnSeats}">
								<div class="col-xs-6">
									<div class="row">
										<h4>
											<spring:message code="field.seats.return" />
										</h4>
									</div>
									<c:forEach var="seatRow" items="${returnSeats}">
										<div class="row">
											<c:forEach var="seat" items="${seatRow}">
												<c:set var="prefix" value="" />
												<c:if test="${seat.id < 10}">
													<c:set var="prefix" value="0" />
												</c:if>
												<c:choose>
													<c:when test="${seat.free}">
														<span class="hidden-lg hidden-md">
															<button class="seat btn btn-seat-free btn-xs"
																type="button" data-type="return" data-seat="${seat.id}" data-audit="yes" id="seats-seat-ret-xs-${seat.id}">
																${prefix}${seat.id}</button>
														</span>
														<span class="hidden-sm hidden-xs">
															<button class="seat btn btn-seat-free" data-type="return"
																type="button" data-seat="${seat.id}" data-audit="yes" id="seats-seat-ret-${seat.id}">${prefix}${seat.id}</button>
														</span>
													</c:when>
													<c:otherwise>
														<span class="hidden-lg hidden-md">
															<button class="btn btn-seat-no-free btn-xs" type="button"
																disabled="disabled" data-audit="yes" id="seats-seat-ret-xs-disabled-${seat.id}">${prefix}${seat.id}</button>
														</span>
														<span class="hidden-sm hidden-xs">
															<button class="btn btn-seat-no-free" type="button"
																disabled="disabled" data-audit="yes" id="seats-seat-ret-disabled${seat.id}">${prefix}${seat.id}</button>
														</span>
													</c:otherwise>
												</c:choose>
											</c:forEach>
										</div>
									</c:forEach>
									<c:set var="returnSeatsErrors">
										<form:errors path="returnSeats" />
									</c:set>
									<c:if test="${not empty returnSeatsErrors}">
										<div class="row">
											<p class="text-danger">${returnSeatsErrors}</p>
										</div>
									</c:if>
								</div>
							</c:if>
							<div class="clearfix hidden-md"></div>
							<div class="col-md-12">
								<div class="row">
									<h4>
										<spring:message code="seats.legend" />
									</h4>
									<table class="legend-table legend-table-free">
										<tr>
											<td class="legend-color legend-color-free"></td>
											<td class="legend-text legend-text-free"><spring:message
													code="seats.status.free" /></td>
										</tr>
									</table>
									<table class="legend-table legend-table-no-free">
										<tr>
											<td class="legend-color legend-color-no-free"></td>
											<td class="legend-text legend-text-no-free"><spring:message
													code="seats.status.no.free" /></td>
										</tr>
									</table>
									<table class="legend-table legend-table-selected">
										<tr>
											<td class="legend-color legend-color-selected"></td>
											<td class="legend-text legend-text-selected"><spring:message
													code="seats.status.selected" /></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6">

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
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">
								<spring:message code="seats.extras.title" />
							</h3>
						</div>
						<div class="panel-body">
							<c:forEach var="extra" items="${extras}">
								<div class="checkbox">
									<label> <form:checkbox path="extras"
											value="${extra.type}" data-audit="yes" id="seats-extra-${extra.type}" /> <spring:message
											code="reserve.extra.${fn:toLowerCase(extra.type)}" />
										(+${extra.price}&euro;)
									</label>
								</div>
							</c:forEach>
						</div>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">
								<spring:message code="seats.extras.personal.data" />
							</h3>
						</div>
						<div class="panel-body">
							<c:choose>
								<c:when test="${empty user}">
									<p>
										<spring:message code="seats.message.1" />
										<a href="login"><spring:message code="login.title" /></a>
										<spring:message code="seats.message.2" />
									</p>
								</c:when>
								<c:otherwise>
									<p>
										<strong><spring:message code="field.name" />: </strong>
										<c:out value="${user.name}" />
									</p>
									<p>
										<strong><spring:message code="field.lastname" />: </strong>
										<c:out value="${user.lastname}" />
									</p>
									<p>
										<strong><spring:message
												code="field.document.${fn:toLowerCase(user.documentType)}" />:
										</strong>
										<c:out value="${user.documentNumber}"></c:out>
									</p>
									<p>
										<strong><spring:message code="field.email" />: </strong>
										<c:out value="${user.email}" />
									</p>
								</c:otherwise>
							</c:choose>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-xs-12">
							<c:choose>
								<c:when test="${empty user}">
									<button type="submit" class="btn btn-custom pull-right" data-audit="yes" id="seats-submit-disabled"
										disabled="disabled">
										<spring:message code="summary.title" />
									</button>
								</c:when>
								<c:otherwise>
									<button id="summary-btn" type="submit" data-audit="yes"
										class="btn btn-custom pull-right">
										<spring:message code="summary.title" />
									</button>
								</c:otherwise>
							</c:choose>
						</div>
					</div>
				</div>
			</div>
		</form:form>
	</div>

	<jsp:include page="footer.jsp" />

	<script type="text/javascript">
		$(function() {
			var maxSeats = parseInt("${ReserveDTO.passengers}")
			var reserveType = "${ReserveDTO.type}"
			var departureSeatsFromModel = "${ReserveDTO.departureSeats}"
			if (departureSeatsFromModel == null
					|| departureSeatsFromModel.length == 0)
				departureSeatsFromModel = "[]"
			var returnSeatsFromModel = "${ReserveDTO.returnSeats}"
			if (returnSeatsFromModel == null
					|| returnSeatsFromModel.length == 0)
				returnSeatsFromModel = "[]"
			var departureSeats = $.parseJSON(departureSeatsFromModel)
			var returnSeats = $.parseJSON(returnSeatsFromModel)
			departureSeats.forEach(function(seat) {
				var button = $("button[data-type='departure'][data-seat='"
						+ seat + "']")
				onSeatFreeAnyTypeButtonClick(button, seat)
			});
			returnSeats.forEach(function(seat) {
				var button = $("button[data-type='return'][data-seat='" + seat
						+ "']")
				onSeatFreeAnyTypeButtonClick(button, seat)
			});

			function onSeatSelectedDepartureButtonClick(button, seat) {
				var index = departureSeats.indexOf(seat)
				departureSeats.splice(index, 1)
				$(
						"input[type='hidden'][name='departureSeats'][value='"
								+ seat + "']").remove()
				onSeatSelectedAnyTypeButtonClick(button)
			}

			function onSeatSelectedReturnButtonClick(button, seat) {
				var index = returnSeats.indexOf(seat)
				returnSeats.splice(index, 1)
				$(
						"input[type='hidden'][name='returnSeats'][value='"
								+ seat + "']").remove()
				onSeatSelectedAnyTypeButtonClick(button)
			}

			function onSeatSelectedAnyTypeButtonClick(button) {
				button.removeClass("btn-custom")
				button.addClass("btn-seat-free")
				button.unbind("click")
				button.click(onSeatFreeClick)
			}

			function onSeatFreeDepartureButtonClick(button, seat) {
				departureSeats.push(seat)
				$("#form")
						.append(
								"<input type='hidden' name='departureSeats' value='" + seat + "'/>")
				onSeatFreeAnyTypeButtonClick(button)
			}

			function onSeatFreeReturnButtonClick(button, seat) {
				returnSeats.push(seat)
				$("#form")
						.append(
								"<input type='hidden' name='returnSeats' value='" + seat + "'/>")
				onSeatFreeAnyTypeButtonClick(button)
			}

			function onSeatFreeAnyTypeButtonClick(button) {
				button.removeClass("btn-seat-free")
				button.addClass("btn-custom")
				button.unbind("click")
				button.click(onSeatSelectedClick)
			}

			function onSeatSelectedClick() {
				var type = $(this).data("type")
				var seat = $(this).data("seat")
				if (type == "departure")
					onSeatSelectedDepartureButtonClick($(this), seat)
				else if (type == "return")
					onSeatSelectedReturnButtonClick($(this), seat)
				checkNumberOfSeats()
			}
			function onSeatFreeClick() {
				var type = $(this).data("type")
				var seat = $(this).data("seat")
				if (type == "departure" && departureSeats.length < maxSeats)
					onSeatFreeDepartureButtonClick($(this), seat)
				else if (type == "return" && returnSeats.length < maxSeats)
					onSeatFreeReturnButtonClick($(this), seat)
				checkNumberOfSeats()
			}
			function checkNumberOfSeats() {
				if (reserveType == "RETURN") {
					if (departureSeats.length == maxSeats
							&& returnSeats.length == maxSeats)
						$("#summary-btn").removeAttr("disabled")
					else
						$("#summary-btn").attr("disabled", "disabled")
				} else {
					if (departureSeats.length == maxSeats)
						$("#summary-btn").removeAttr("disabled")
					else
						$("#summary-btn").attr("disabled", "disabled")
				}
			}
			$(".btn-seat-free").click(onSeatFreeClick)
			checkNumberOfSeats()
		})
	</script>
</body>

</html>