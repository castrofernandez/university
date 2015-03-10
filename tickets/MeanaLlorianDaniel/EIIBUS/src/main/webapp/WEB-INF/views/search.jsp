<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>

<head>
<title><spring:message code="reserve.title" />: <spring:message
		code="search.title" /> - <spring:message code="site.name" /></title>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/style.css">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap-datetimepicker.min.css">
</head>

<body id="body-search">
	<jsp:include page="header.jsp" />

	<nav class="navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-audit="yes" id="search-navbar"
					data-toggle="collapse" data-target="#navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"> <spring:message code="reserve.title" />
				</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index" data-audit="yes" id="search-index"><spring:message code="index.title" /></a></li>
					<li class="active"><a><spring:message code="reserve.title" /></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<c:choose>
						<c:when test="${empty userName}">
							<li><a href="login" data-audit="yes" id="search-login"><spring:message code="login.title" /></a></li>
						</c:when>
						<c:otherwise>
							<li><a href="profile" data-audit="yes" id="search-profile"><spring:message
										code="profile.title" /></a></li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container">
		<ol class="breadcrumb">
			<li class="active"><spring:message code="search.title" /></li>
		</ol>
		<div class="progress">
			<div class="progress-bar progress-bar-custom" role="progressbar"
				aria-valuenow="1" aria-valuemin="0" aria-valuemax="4"
				style="width: 25%">
				<spring:message code="reserve.step" />
				1
				<spring:message code="reserve.of" />
				4
			</div>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">
					<spring:message code="search.title" />
				</h3>
			</div>
			<div class="panel-body">
				<form:form action="schedules" commandName="ReserveDTO" method="GET"
					class="form" role="form">
					<div class="row">
						<c:set var="originErrors">
							<form:errors path="origin" />
						</c:set>
						<c:choose>
							<c:when test="${empty originErrors}">
								<c:set var="originClass" value="form-group" />
							</c:when>
							<c:otherwise>
								<c:set var="originClass" value="form-group has-error" />
							</c:otherwise>
						</c:choose>
						<div class="${originClass} col-sm-6">
							<form:label path="origin" class="control-label">
								<spring:message code="field.origin" />
							</form:label>
							<form:select path="origin" class="form-control" data-audit="yes">
								<c:forEach var="origin" items="${cities}">
									<c:choose>
										<c:when test="${origin.id == ReserveDTO.origin}">
											<form:option value="${origin.id}" checked="checked">
												<c:out value="${origin.name}" />
											</form:option>
										</c:when>
										<c:otherwise>
											<form:option value="${origin.id}">
												<c:out value="${origin.name}" />
											</form:option>
										</c:otherwise>
									</c:choose>
								</c:forEach>
							</form:select>
							<c:if test="${not empty originErrors}">
								<p class="text-danger">${originErrors}</p>
							</c:if>
						</div>
						<c:set var="departureDateErrors">
							<form:errors path="departureDate" />
						</c:set>
						<c:choose>
							<c:when test="${empty departureDateErrors}">
								<c:set var="departureDateClass" value="form-group" />
							</c:when>
							<c:otherwise>
								<c:set var="departureDateClass" value="form-group has-error" />
							</c:otherwise>
						</c:choose>
						<div class="${departureDateClass} col-sm-6">
							<form:label path="departureDate" class="control-label">
								<spring:message code="field.departure.date" />
							</form:label>
							<div class="input-group date" id="departureDateDiv">
								<form:input type="text" class="form-control" data-audit="yes" id="search-departure-date"
									path="departureDate" />
								<span class="input-group-addon"> <span
									class="glyphicon glyphicon-calendar"></span>
								</span>
							</div>
							<input type="hidden" id="search-departure-date-hidden" data-audit="yes" />
							<c:if test="${not empty departureDateErrors}">
								<p class="text-danger">${departureDateErrors}</p>
							</c:if>
						</div>
					</div>
					<div class="row">
						<c:set var="typeErrors">
							<form:errors path="type" />
						</c:set>
						<c:choose>
							<c:when test="${empty typeErrors}">
								<c:set var="typeClass" value="form-group" />
							</c:when>
							<c:otherwise>
								<c:set var="typeClass" value="form-group has-error" />
							</c:otherwise>
						</c:choose>
						<div class="${typeClass} col-sm-6">
							<form:label path="type" class="control-label">
								<spring:message code="field.reserve.type" />
							</form:label>
							<br> <label class="radio-inline"><form:radiobutton data-audit="yes" id="search-type-one-way"
									path="type" value="ONEWAY" /> <spring:message
									code="field.reserve.type.oneway" /></label> <label
								class="radio-inline"><form:radiobutton path="type" data-audit="yes" id="search-type-return"
									value="RETURN" /> <spring:message
									code="field.reserve.type.return" /></label> <label
								class="radio-inline"><form:radiobutton path="type" data-audit="yes" id="search-type-open-return"
									value="OPENRETURN" /> <spring:message
									code="field.reserve.type.openreturn" /></label>
							<c:if test="${not empty typeErrors}">
								<p class="text-danger">${typeErrors}</p>
							</c:if>
						</div>
						<c:set var="passengersErrors">
							<form:errors path="passengers" />
						</c:set>
						<c:choose>
							<c:when test="${empty passengersErrors}">
								<c:set var="passengersClass" value="form-group" />
							</c:when>
							<c:otherwise>
								<c:set var="passengersClass" value="form-group has-error" />
							</c:otherwise>
						</c:choose>
						<div class="${passengersClass} col-sm-6">
							<form:label path="passengers" class="control-label">
								<spring:message code="field.passengers" />
							</form:label>
							<c:choose>
								<c:when test="${ReserveDTO.passengers > 0}">
									<form:input type="number" class="form-control" data-audit="yes" id="search-number"
										path="passengers" value="${ReserveDTO.passengers}" />
								</c:when>
								<c:otherwise>
									<form:input type="number" class="form-control" data-audit="yes" id="search-number"
										path="passengers" value="1" />
								</c:otherwise>
							</c:choose>
							<c:if test="${not empty passengersErrors}">
								<p class="text-danger">${passengersErrors}</p>
							</c:if>
						</div>
					</div>
					<div class="row">
						<c:set var="destinationErrors">
							<form:errors path="destination" />
						</c:set>
						<c:choose>
							<c:when test="${empty destinationErrors}">
								<c:set var="destinationClass" value="form-group" />
							</c:when>
							<c:otherwise>
								<c:set var="destinationClass" value="form-group has-error" />
							</c:otherwise>
						</c:choose>
						<div class="${destinationClass} col-sm-6">
							<form:label path="destination" class="control-label">
								<spring:message code="field.destination" />
							</form:label>
							<form:select path="destination" class="form-control" data-audit="yes">
							</form:select>
							<c:if test="${not empty destinationErrors}">
								<p class="text-danger">${destinationErrors}</p>
							</c:if>
						</div>
						<c:set var="returnDateErrors">
							<form:errors path="returnDate" />
						</c:set>
						<c:choose>
							<c:when test="${empty returnDateErrors}">
								<c:set var="returnDateClass" value="form-group" />
							</c:when>
							<c:otherwise>
								<c:set var="returnDateClass" value="form-group has-error" />
							</c:otherwise>
						</c:choose>
						<div class="${returnDateClass} col-sm-6">
							<form:label path="returnDate" class="control-label">
								<spring:message code="field.return.date" />
							</form:label>
							<div class="input-group date" id="returnDateDiv">
								<form:input type="text" class="form-control" path="returnDate" data-audit="yes" id="search-return-date" />
								<span class="input-group-addon"><span
									class="glyphicon glyphicon-calendar"></span> </span>
							</div>
							<input type="hidden" id="search-return-date-hidden" data-audit="yes" />
							<c:if test="${not empty returnDateErrors}">
								<p class="text-danger">${returnDateErrors}</p>
							</c:if>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-sm-12">
							<button type="submit" class="btn btn-custom pull-right" data-audit="yes" id="search-submit">
								<span class="glyphicon glyphicon-search"></span>
								<spring:message code="search.search" />
							</button>
						</div>
					</div>
				</form:form>
			</div>
		</div>
	</div>

	<jsp:include page="footer.jsp" />

	<script type="text/javascript" src="resources/js/moment.js"></script>
	<script type="text/javascript" src="resources/js/es.js"></script>
	<script type="text/javascript" src="resources/js/en.js"></script>
	<script type="text/javascript"
		src="resources/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript">
		$(function() {
			function fire(element, action) {
				if ("createEvent" in document) {
				    var evt = document.createEvent("HTMLEvents");
				    evt.initEvent(action, false, true);
				    element.dispatchEvent(evt);
				}
				else
				    element.fireEvent("on" + action);
			}
			
			var locale = "${pageContext.response.locale.language}"
			if (locale != 'es')
				locale = 'en'
			if (!$('input[name=type][value="RETURN"]:radio').attr("checked"))
				$("#returnDate").attr("disabled", "disabled")
			$('#origin').change(
					function() {
						var originId = $("#origin").val()
						$.ajax({
							url : "findDestinations",
							data : ({
								id : originId
							}),
							type : "POST",
							success : function(data) {
								var cities = $.parseJSON(data)
								cities.sort(function(a, b) {
									return a.name.localeCompare(b.name)
								})
								
								$("#destination").empty()
								var destinationId = "${ReserveDTO.destination}"
								$.each(cities, function(i, city) {
									if (city.id == destinationId) {
										$("#destination").append(
												'<option value="' + city.id
													+ '" selected="selected">'
														+ city.name
														+ '</option>')
									} else {
										$("#destination").append(
												'<option value="' + city.id + '">'
														+ city.name
														+ '</option>')
									}
								})
							}
						})
					})
			$('#departureDateDiv').datetimepicker({
				pickTime : false,
				defaultDate : moment().format('DD/MM/YYYY'),
				minDate : moment().format('DD/MM/YYYY'),
				language : locale
			})
			$('#returnDateDiv').datetimepicker({
				pickTime : false,
				defaultDate : moment().format('DD/MM/YYYY'),
				minDate : moment().format('DD/MM/YYYY'),
				language : locale
			})
			$('#departureDateDiv').on(
					'dp.change',
					function(e) {
						var dateReturn = $('#returnDateDiv').data(
								'DateTimePicker').date
						
						$("#search-departure-date-hidden").val(e.date.format('DD/MM/YYYY'));
						fire(document.getElementById("search-departure-date-hidden"), "change");
							
						if (dateReturn < e.date) {
							$('#returnDateDiv').data('DateTimePicker').setDate(
									e.date)
						}
						$('#returnDateDiv').data('DateTimePicker').setMinDate(
								e.date)
					})
					
			$('#returnDateDiv').on(
					'dp.change',
					function(e) {
						$("#search-return-date-hidden").val(e.date.format('DD/MM/YYYY'));
						fire(document.getElementById("search-return-date-hidden"), "change");
					})
					
			$('#passengers').change(function() {
				var value = $('#passengers').val()
				if (value < 1)
					$("#passengers").val(1)
			})
			$('input[name=type]:radio').change(function() {
				if ($(this).val() == 'RETURN') {
					$('#returnDate').removeAttr('disabled')
				} else {
					$('#returnDate').attr('disabled', 'disabled')
				}
			})
			$("#origin").change()
		})
	</script>
</body>

</html>