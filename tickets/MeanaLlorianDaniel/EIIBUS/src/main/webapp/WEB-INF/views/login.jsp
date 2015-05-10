<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>

<head>
<title><spring:message code="login.title" /> - <spring:message
		code="site.name" /></title>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css"
	href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/style.css">
</head>

<body id="body-login">
	<jsp:include page="header.jsp" />

	<nav class="navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar-collapse" data-audit="yes" id="login-navbar">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand"> <spring:message code="login.title" />
				</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="index" data-audit="yes" id="login-index"><spring:message code="index.title" /></a></li>
					<li><a href="search" data-audit="yes" id="login-search"><spring:message code="search.title" /></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="active"><a><spring:message code="login.title" /></a></li>
				</ul>
			</div>
		</div>
	</nav>
	
	<jsp:include page="description.jsp" />

	<div class="container">
		<div class="row">
			<div class="col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<spring:message code="login.login" />
						</h3>
					</div>
					<div class="panel-body">
						<form:form action="login" commandName="LoginDTO"
							class="form-horizontal col-sm-12" role="form">
							<c:set var="loginEmailErrors">
								<form:errors path="email" />
							</c:set>
							<spring:message code="field.email" var="fieldEmail" />
							<c:choose>
								<c:when test="${empty loginEmailErrors}">
									<div class="form-group">
										<form:label path="email"
											class="col-md-3 col-sm-4 control-label">${fieldEmail}</form:label>
										<div class="col-md-9 col-sm-8">
											<form:input path="email" type="email" class="form-control"  data-audit="yes" id="login-login-email"
												placeholder="${fieldEmail}" />
										</div>
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group has-error">
										<form:label path="email"
											class="col-md-3 col-sm-4 control-label">${fieldEmail}</form:label>
										<div class="col-md-9 col-sm-8">
											<form:input path="email" type="email" class="form-control"  data-audit="yes" id="login-login-email"
												placeholder="${fieldEmail}" />
											<p class="text-danger">${loginEmailErrors}</p>
										</div>
									</div>
								</c:otherwise>
							</c:choose>
							<c:set var="loginPasswordErrors">
								<form:errors path="password" />
							</c:set>
							<spring:message code="field.password" var="fieldPassword" />
							<c:choose>
								<c:when test="${empty loginPasswordErrors}">
									<div class="form-group">
										<form:label path="password"
											class="col-md-3 col-sm-4 control-label">
											${fieldPassword}
										</form:label>
										<div class="col-md-9 col-sm-8">
											<form:input path="password" type="password"  data-audit="yes" id="login-login-password"
												class="form-control" placeholder="${fieldPassword}" />
										</div>
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group has-error">
										<form:label path="password"
											class="col-md-3 col-sm-4 control-label">
											${fieldPassword}
										</form:label>
										<div class="col-md-9 col-sm-8">
											<form:input path="password" type="password"  data-audit="yes" id="login-login-password"
												class="form-control" placeholder="${fieldPassword}" />
											<p class="text-danger">${loginPasswordErrors}</p>
										</div>
									</div>
								</c:otherwise>
							</c:choose>
							<div class="form-group">
								<div class="col-md-offset-3 col-md-9 col-sm-offset-4 col-sm-8">
									<spring:message code="login.login" var="loginLogin" />
									<input type="submit" class="btn btn-custom"  data-audit="yes" id="login-login-submit"
										value="${loginLogin}" />
								</div>
							</div>
						</form:form>
					</div>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
							<spring:message code="login.register" />
						</h3>
					</div>
					<div class="panel-body">
						<form:form action="register" commandName="UserDTO" class="form"
							role="form">
							<c:set var="registerNameErrors">
								<form:errors path="name" />
							</c:set>
							<spring:message code="field.name" var="fieldName" />
							<c:choose>
								<c:when test="${empty registerNameErrors}">
									<div class="form-group col-md-6">
										<form:label path="name" class="control-label">${fieldName}</form:label>
										<form:input path="name" type="text" class="form-control"  data-audit="yes" id="login-register-name"
											placeholder="${fieldName}" />
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group col-md-6 has-error">
										<form:label path="name" class="control-label">${fieldName}</form:label>
										<form:input path="name" type="text" class="form-control" data-audit="yes" id="login-register-name"
											placeholder="${fieldName}" />
										<p class="text-danger">${registerNameErrors}</p>
									</div>
								</c:otherwise>
							</c:choose>
							<c:set var="registerLastnameErrors">
								<form:errors path="lastname" />
							</c:set>
							<spring:message code="field.lastname" var="fieldLastname" />
							<c:choose>
								<c:when test="${empty registerLastnameErrors}">
									<div class="form-group col-md-6">
										<form:label path="lastname" class="control-label">${fieldLastname}</form:label>
										<form:input path="lastname" type="text" class="form-control" data-audit="yes" id="login-register-lastname"
											placeholder="${fieldLastname}" />
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group col-md-6 has-error">
										<form:label path="lastname" class="control-label">${fieldLastname}</form:label>
										<form:input path="lastname" type="text" class="form-control" data-audit="yes" id="login-register-lastname"
											placeholder="${fieldLastname}" />
										<p class="text-danger">${registerLastnameErrors}</p>
									</div>
								</c:otherwise>
							</c:choose>
							<div class="form-group col-md-6">
								<form:label path="documentType">
									<spring:message code="field.document.type" />
								</form:label>
								<form:select path="documentType" class="form-control" data-audit="yes" id="login-register-document-type">
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
							<c:set var="registerDocumentNumberErrors">
								<form:errors path="documentNumber" />
							</c:set>
							<spring:message code="field.document.number"
								var="fieldDocumentNumber" />
							<c:choose>
								<c:when test="${empty registerDocumentNumberErrors}">
									<div class="form-group col-md-6">
										<form:label path="documentNumber" class="control-label">${fieldDocumentNumber}</form:label>
										<form:input path="documentNumber" type="text" data-audit="yes" id="login-register-document"
											class="form-control" placeholder="${fieldDocumentNumber}" />
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group col-md-6 has-error">
										<form:label path="documentNumber" class="control-label">${fieldDocumentNumber}</form:label>
										<form:input path="documentNumber" type="text" data-audit="yes" id="login-register-document"
											class="form-control" placeholder="${fieldDocumentNumber}" />
										<p class="text-danger">${registerDocumentNumberErrors}</p>
									</div>
								</c:otherwise>
							</c:choose>
							<c:set var="registerEmailErrors">
								<form:errors path="email" />
							</c:set>
							<spring:message code="field.email" var="fieldEmail" />
							<c:choose>
								<c:when test="${empty registerEmailErrors}">
									<div class="form-group col-md-12">
										<form:label path="email" class="control-label">${fieldEmail}</form:label>
										<form:input path="email" type="email" class="form-control" data-audit="yes" id="login-register-email"
											placeholder="${fieldEmail}" />
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group col-md-12 has-error">
										<form:label path="email" class="control-label">${fieldEmail}</form:label>
										<form:input path="email" type="email" class="form-control" data-audit="yes" id="login-register-email"
											placeholder="${fieldEmail}" />
										<p class="text-danger">${registerEmailErrors}</p>
									</div>
								</c:otherwise>
							</c:choose>
							<c:set var="registerPasswordErrors">
								<form:errors path="password" />
							</c:set>
							<spring:message code="field.password" var="fieldPassword" />
							<c:choose>
								<c:when test="${empty registerPasswordErrors}">
									<div class="form-group col-md-6">
										<form:label path="password" class="control-label">${fieldPassword}</form:label>
										<form:input path="password" type="password" data-audit="yes" id="login-register-password"
											class="form-control" placeholder="${fieldPassword}" />
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group col-md-6 has-error">
										<form:label path="password" class="control-label">${fieldPassword}</form:label>
										<form:input path="password" type="password" data-audit="yes" id="login-register-password"
											class="form-control" placeholder="${fieldPassword}" />
										<p class="text-danger">${registerPasswordErrors}</p>
									</div>
								</c:otherwise>
							</c:choose>
							<c:set var="registerConfirmPasswordErrors">
								<form:errors path="confirmPassword" />
							</c:set>
							<spring:message code="field.password.confirm"
								var="fieldPasswordConfirm" />
							<c:choose>
								<c:when test="${empty registerConfirmPasswordErrors}">
									<div class="form-group col-md-6">
										<form:label path="confirmPassword" class="control-label">
											${fieldPasswordConfirm}
										</form:label>
										<form:input path="confirmPassword" type="password" data-audit="yes" id="login-register-password2"
											class="form-control" placeholder="${fieldPasswordConfirm}" />
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group col-md-6 has-error">
										<form:label path="confirmPassword" class="control-label">
											${fieldPasswordConfirm}
										</form:label>
										<form:input path="confirmPassword" type="password" data-audit="yes" id="login-register-password2"
											class="form-control" placeholder="${fieldPasswordConfirm}" />
										<p class="text-danger">${registerConfirmPasswordErrors}</p>
									</div>
								</c:otherwise>
							</c:choose>
							
							<div class="form-group col-md-12">
								<form:label path="name" class="control-label"><spring:message code="field.gender" /></form:label>
								<div>
									<c:choose>
									     <c:when test="${gender == 'MAN'}">
									      	<form:radiobutton path="gender" value="MAN" checked="checked" /><label class="lblActive"><spring:message code="field.gender.man" /></label> 
											<form:radiobutton path="gender" value="WOMAN"/><label class="lblActive"><spring:message code="field.gender.woman" /></label>
									    </c:when>
									    <c:otherwise>
									      	<form:radiobutton path="gender" value="MAN"/><label class="lblActive"><spring:message code="field.gender.man" /></label> 
											<form:radiobutton path="gender" value="WOMAN" checked="checked" /><label class="lblActive"><spring:message code="field.gender.woman" /></label>
									   </c:otherwise>
									</c:choose> 
								</div>
							</div>
							
							<c:set var="registerAgeErrors">
								<form:errors path="age" />
							</c:set>
							<spring:message code="field.age"
								var="fieldAge" />
							<c:choose>
								<c:when test="${empty registerAgeErrors}">
									<div class="form-group col-md-6">
										<form:label path="age" class="control-label">
											<spring:message code="field.age" />
										</form:label>
										<form:input path="age" type="number" data-audit="yes" id="login-register-age"
											class="form-control" placeholder="${fieldAge}" />
									</div>
								</c:when>
								<c:otherwise>
									<div class="form-group col-md-6 has-error">
										<form:label path="age" class="control-label">
											<spring:message code="field.age" />
										</form:label>
										<form:input path="age" type="number" data-audit="yes" id="login-register-age"
											class="form-control" placeholder="${fieldPasswordConfirm}" />
										<p class="text-danger">${registerAgeErrors}</p>
									</div>
								</c:otherwise>
							</c:choose>
							
							<div class="form-group col-md-12">
								<form:label path="laterality" class="control-label"><spring:message code="field.laterality" /></form:label>
								<div>
									<c:choose>
									     <c:when test="${laterality == 'RIGHT'}">
									      	<form:radiobutton path="laterality" value="RIGHT" checked="checked" /><label class="lblActive"><spring:message code="field.laterality.right" /></label> 
											<form:radiobutton path="laterality" value="LEFT"/><label class="lblActive"><spring:message code="field.laterality.left" /></label>
									    </c:when>
									    <c:otherwise>
									      	<form:radiobutton path="laterality" value="RIGHT"/><label class="lblActive"><spring:message code="field.laterality.right" /></label> 
											<form:radiobutton path="laterality" value="LEFT" checked="checked" /><label class="lblActive"><spring:message code="field.laterality.left" /></label>
									   </c:otherwise>
									</c:choose> 
								</div>
							</div>
							
							<div class="form-group col-md-12">
								<span class="help-block"> <spring:message
										code="field.fields.required" />
								</span>
								<spring:message code="login.registration.complete"
									var="loginRegistrationComplete" />
								<input type="submit" class="btn btn-custom" data-audit="yes" id="login-register-submit"
									value="${loginRegistrationComplete}" />
							</div>
						</form:form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="footer.jsp" />
</body>
</html>