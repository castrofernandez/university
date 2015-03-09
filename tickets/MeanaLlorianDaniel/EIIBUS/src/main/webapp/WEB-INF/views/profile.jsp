<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>

<head>
<title><spring:message code="profile.title" /> - <spring:message
		code="site.name" /></title>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/style.css">
</head>

<body>
	<jsp:include page="header.jsp" />

	<nav class="navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"> <spring:message code="login.title" />
				</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index"><spring:message code="index.title" /></a></li>
					<li><a href="search"><spring:message code="search.title" /></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><a><spring:message code="profile.title" /></a></li>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container">
		<ol class="breadcrumb">
			<li class="active"><spring:message code="profile.title" /></li>
		</ol>
		<c:if test="${not empty msgSuccess}">
			<div class="alert alert-success alert-dismissible" role="alert">
				<button type="button" class="close" data-dismiss="alert"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<spring:message code="${msgSuccess}" />
			</div>
		</c:if>
		<div class="row">
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<spring:message code="profile.personal.information" />
						</h3>
					</div>
					<div class="panel-body">
						<form:form commandName="UserDTO" class="form" role="form">
							<div class="row">
								<c:set var="updateNameErrors">
									<form:errors path="name" />
								</c:set>
								<spring:message code="field.name" var="fieldName" />
								<c:choose>
									<c:when test="${empty updateNameErrors}">
										<div class="form-group col-sm-6">
											<form:label path="name" class="control-label">${fieldName}</form:label>
											<form:input path="name" type="text" class="form-control"
												placeholder="${fieldName}" />
										</div>
									</c:when>
									<c:otherwise>
										<div class="form-group col-sm-6 has-error">
											<form:label path="name" class="control-label">${fieldName}</form:label>
											<form:input path="name" type="text" class="form-control"
												placeholder="${fieldName}" />
											<p class="text-danger">${updateNameErrors}</p>
										</div>
									</c:otherwise>
								</c:choose>
								<c:set var="updateLastnameErrors">
									<form:errors path="lastname" />
								</c:set>
								<spring:message code="field.lastname" var="fieldLastname" />
								<c:choose>
									<c:when test="${empty updateLastnameErrors}">
										<div class="form-group col-sm-6">
											<form:label path="lastname" class="control-label">${fieldLastname}</form:label>
											<form:input path="lastname" type="text" class="form-control"
												placeholder="${fieldLastname}" />
										</div>
									</c:when>
									<c:otherwise>
										<div class="form-group col-sm-6 has-error">
											<form:label path="lastname" class="control-label">${fieldLastname}</form:label>
											<form:input path="lastname" type="text" class="form-control"
												placeholder="${loginLastname}" />
											<p class="text-danger">${updateLastnameErrors}</p>
										</div>
									</c:otherwise>
								</c:choose>
							</div>
							<div class="row">
								<div class="form-group col-sm-6">
									<form:label path="documentType">
										<spring:message code="field.document.type" />
									</form:label>
									<form:select path="documentType" class="form-control">
										<form:option value="DNI">
											<spring:message code="field.document.dni" />
										</form:option>
										<form:option value="NIE">
											<spring:message code="field.document.nie" />
										</form:option>
										<form:option value="PASSPORT">
											<spring:message code="field.document.passport" />
										</form:option>
									</form:select>
								</div>
								<c:set var="updateDocumentNumberErrors">
									<form:errors path="documentNumber" />
								</c:set>
								<spring:message code="field.document.number"
									var="fieldDocumentNumber" />
								<c:choose>
									<c:when test="${empty updateDocumentNumberErrors}">
										<div class="form-group col-sm-6">
											<form:label path="documentNumber" class="control-label">${fieldDocumentNumber}</form:label>
											<form:input path="documentNumber" type="text"
												class="form-control" placeholder="${fieldDocumentNumber}" />
										</div>
									</c:when>
									<c:otherwise>
										<div class="form-group col-sm-6 has-error">
											<form:label path="documentNumber" class="control-label">${fieldDocumentNumber}</form:label>
											<form:input path="documentNumber" type="text"
												class="form-control" placeholder="${fieldDocumentNumber}" />
											<p class="text-danger">${updateDocumentNumberErrors}</p>
										</div>
									</c:otherwise>
								</c:choose>
							</div>
							<div class="row">
								<div class="form-group col-sm-12">
									<label class="control-label"> <spring:message
											code="field.email" />
									</label>
									<p>${UserDTO.email}</p>
								</div>
							</div>
							<div class="row">
								<c:set var="updatePasswordErrors">
									<form:errors path="password" />
								</c:set>
								<spring:message code="field.password.new" var="fieldPasswordNew" />
								<c:choose>
									<c:when test="${empty updatePasswordErrors}">
										<div class="form-group col-sm-6">
											<form:label path="password" class="control-label">${fieldPasswordNew}</form:label>
											<form:input path="password" type="password"
												class="form-control" placeholder="${fieldPasswordNew}" />
										</div>
									</c:when>
									<c:otherwise>
										<div class="form-group col-sm-6 has-error">
											<form:label path="password" class="control-label">${fieldPasswordNew}</form:label>
											<form:input path="password" type="password"
												class="form-control" placeholder="${fieldPasswordNew}" />
											<p class="text-danger">${updatePasswordErrors}</p>
										</div>
									</c:otherwise>
								</c:choose>
								<c:set var="updateConfirmPasswordErrors">
									<form:errors path="confirmPassword" />
								</c:set>
								<spring:message code="field.password.confirm"
									var="fieldPasswordConfirm" />
								<c:choose>
									<c:when test="${empty updateConfirmPasswordErrors}">
										<div class="form-group col-sm-6">
											<form:label path="confirmPassword" class="control-label">
											${fieldPasswordConfirm}
										</form:label>
											<form:input path="confirmPassword" type="password"
												class="form-control" placeholder="${fieldPasswordConfirm}" />
										</div>
									</c:when>
									<c:otherwise>
										<div class="form-group col-sm-6 has-error">
											<form:label path="confirmPassword" class="control-label">
												${fieldPasswordConfirm}
											</form:label>
											<form:input path="confirmPassword" type="password"
												class="form-control" placeholder="${fieldPasswordConfirm}" />
											<p class="text-danger">${updateConfirmPasswordErrors}</p>
										</div>
									</c:otherwise>
								</c:choose>
							</div>
							<div class="row">
								<c:set var="updatePasswordOldErrors">
									<form:errors path="oldPassword" />
								</c:set>
								<spring:message code="field.password.old" var="fieldPasswordOld" />
								<c:choose>
									<c:when test="${empty updatePasswordOldErrors}">
										<div class="form-group col-sm-12">
											<form:label path="oldPassword" class="control-label">${fieldPasswordOld}</form:label>
											<form:input path="oldPassword" type="password"
												class="form-control" placeholder="${fieldPasswordOld}" />
										</div>
									</c:when>
									<c:otherwise>
										<div class="form-group col-sm-12 has-error">
											<form:label path="oldPassword" class="control-label">${fieldPasswordOld}</form:label>
											<form:input path="oldPassword" type="password"
												class="form-control" placeholder="${fieldPasswordOld}" />
											<p class="text-danger">${updatePasswordOldErrors}</p>
										</div>
									</c:otherwise>
								</c:choose>
							</div>
							<div class="row">
								<div class="form-group col-sm-12">
									<spring:message code="profile.update" var="profileUpdate" />
									<input type="submit" class="btn btn-custom"
										value="${profileUpdate}" />
								</div>
							</div>
						</form:form>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<spring:message code="profile.cities.visited" />
						</h3>
					</div>
					<div class="panel-body">
						<c:choose>
							<c:when test="${empty oldReserves}">
								<p>
									<spring:message code="profile.cities.visited.empty" />
								</p>
							</c:when>
							<c:otherwise>
								<table class="cities table table-striped">
									<thead>
										<tr>
											<th class="city"><spring:message code="field.city" /></th>
											<th class="cell-center"><spring:message code="field.date" /></th>
											<th class="cell-center"><spring:message code="field.time" /></th>
										</tr>
									</thead>
									<tbody>
										<c:forEach var="reserve" items="${oldReserves}">
											<tr>
												<td>${reserve.destination}</td>
												<td class="cell-center">${reserve.departureDate}</td>
												<td class="cell-center">${reserve.outboundDeparture}</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</c:otherwise>
						</c:choose>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<spring:message code="profile.reserves" />
						</h3>
					</div>
					<div class="panel-body">
						<div class="col-md-6 col-md-offset-3">
							<form class="form" role="form" action="reserve" method="get">
								<div class="input-group search-reserves">
									<spring:message code="field.identifier" var="fieldIdentifier" />
									<input type="text" class="form-control" name="id"
										id="identifier" placeholder="${fieldIdentifier}"> <span
										class="input-group-btn">
										<button class="btn btn-custom" type="submit"
											disabled="disabled" id="searchButton">
											<span class="glyphicon glyphicon-search"></span>
											<spring:message code="profile.reserves.search" />
										</button>
									</span>
								</div>
							</form>
						</div>
						<div class="col-md-6">
							<legend>
								<spring:message code="profile.reserves.remaining" />
							</legend>
							<c:choose>
								<c:when test="${empty reserves}">
									<p>
										<spring:message code="profile.reserves.empty" />
									</p>
								</c:when>
								<c:otherwise>
									<c:forEach var="reserve" items="${reserves}">
										<div class="well">
											<p>
												<strong><spring:message code="field.identifier" />:
												</strong>${reserve.id}</p>

											<div class="row">
												<p class="col-sm-6">
													<strong><spring:message code="field.origin" />: </strong>${reserve.origin}</p>
												<p class="col-sm-6">
													<strong><spring:message code="field.destination" />:
													</strong>${reserve.destination}</p>
											</div>
											<div class="row">
												<p class="col-sm-6">
													<strong><spring:message code="field.reserve.type" />:
													</strong>
													<spring:message
														code="field.reserve.type.${fn:toLowerCase(reserve.type)}" />
												</p>
												<p class="col-sm-6">
													<strong><spring:message code="field.passengers" />:
													</strong>${fn:length(reserve.departureSeats)}</p>
											</div>
											<div class="row">
												<p class="col-sm-6">
													<strong><spring:message
															code="field.departure.date" />: </strong>${reserve.departureDate}</p>
												<c:if test="${not empty reserve.returnDate}">
													<p class="col-sm-6">
														<strong><spring:message code="field.return.date" />:
														</strong>${reserve.returnDate}</p>
												</c:if>
											</div>
											<form class="form form-inline" role="form" action="reserve"
												method="get">
												<input type="hidden" name="id" value="${reserve.id}" />
												<button class="btn btn-custom btn-sm" type="submit">
													<spring:message code="profile.reserves.more" />
												</button>
											</form>
											<form class="form form-inline" role="form"
												action="cancelReserve" method="post">
												<input type="hidden" name="id" value="${reserve.id}" />
												<button class="btn btn-red btn-sm" type="submit">
													<span class="glyphicon glyphicon-trash"></span>
													<spring:message code="profile.reserves.cancel" />
												</button>
											</form>
										</div>
									</c:forEach>
								</c:otherwise>
							</c:choose>
						</div>
						<div class="col-md-6">
							<legend>
								<spring:message code="profile.reserves.old" />
							</legend>
							<c:choose>
								<c:when test="${empty oldReserves}">
									<p>
										<spring:message code="profile.reserves.old.empty" />
									</p>
								</c:when>
								<c:otherwise>
									<c:forEach var="reserve" items="${oldReserves}">
										<div class="well">
											<p>
												<strong><spring:message code="field.identifier" />:
												</strong>${reserve.id}</p>

											<div class="row">
												<p class="col-sm-6">
													<strong><spring:message code="field.origin" />: </strong>${reserve.origin}</p>
												<p class="col-sm-6">
													<strong><spring:message code="field.destination" />:
													</strong>${reserve.destination}</p>
											</div>
											<div class="row">
												<p class="col-sm-6">
													<strong><spring:message code="field.reserve.type" />:
													</strong>
													<spring:message
														code="field.reserve.type.${fn:toLowerCase(reserve.type)}" />
												</p>
												<p class="col-sm-6">
													<strong><spring:message code="field.passengers" />:
													</strong>${fn:length(reserve.departureSeats)}</p>
											</div>
											<div class="row">
												<p class="col-sm-6">
													<strong><spring:message
															code="field.departure.date" />: </strong>${reserve.departureDate}</p>
												<c:if test="${not empty reserve.returnDate}">
													<p class="col-sm-6">
														<strong><spring:message code="field.return.date" />:
														</strong>${reserve.returnDate}</p>
												</c:if>
											</div>
											<form class="form form-inline" role="form" action="reserve"
												method="get">
												<input type="hidden" name="id" value="${reserve.id}" />
												<button class="btn btn-custom btn-sm" type="submit">
													<spring:message code="profile.reserves.more" />
												</button>
											</form>
										</div>
									</c:forEach>
								</c:otherwise>
							</c:choose>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="footer.jsp" />

	<script type="text/javascript">
		$(function() {
			$("#identifier").bind("input", function() {
				var value = $(this).val()
				if (value.length == 0)
					$("#searchButton").attr("disabled", "disabled")
				else
					$("#searchButton").removeAttr("disabled")
			})
		})
	</script>
</body>
</html>