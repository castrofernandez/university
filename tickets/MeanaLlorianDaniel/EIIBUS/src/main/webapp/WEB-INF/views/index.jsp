<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>

<head>
<title><spring:message code="index.title" /> - <spring:message
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
					data-toggle="collapse" data-target="#navbar-collapse" data-audit="yes" id="index-navbar">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" data-audit="yes" id="index-navbar-brand"> <spring:message code="index.title" />
				</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar-collapse">
				<ul class="nav navbar-nav">
					<li class="active"><a data-audit="yes" id="index-index"><spring:message code="index.title" /></a></li>
					<li><a href="search" data-audit="yes" id="index-search"><spring:message code="reserve.title" /></a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<c:choose>
						<c:when test="${empty userName}">
							<li><a href="login" data-audit="yes" id="index-login"><spring:message code="login.title" /></a></li>
						</c:when>
						<c:otherwise>
							<li><a href="profile" data-audit="yes" id="index-profile"><spring:message
										code="profile.title" /></a></li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container">
		<div class="row">
			<div
				class="col-lg-5 col-lg-offset-2 col-md-7 col-md-offset-1 col-sm-8"
				class="description">
				<blockquote>
					<p>
						<spring:message code="index.description" />
					</p>
					<div class="row">
						<div class="col-sm-6 col-xs-12">
							<a href="search" class="btn btn-block btn-custom" data-audit="yes" id="index-btn-search"> <spring:message
									code="search.title" />
							</a>
						</div>
						<div class="col-sm-6 col-xs-12">
							<c:choose>
								<c:when test="${empty userName}">
									<a href="login" class="btn btn-block btn-custom" data-audit="yes" id="index-btn-login"><spring:message
											code="login.title" /> </a>
								</c:when>
								<c:otherwise>
									<a href="profile" class="btn btn-block btn-custom" data-audit="yes" id="index-btn-profile"><spring:message
											code="profile.title" /> </a>
								</c:otherwise>
							</c:choose>
						</div>
					</div>
				</blockquote>
			</div>
			<div class="col-md-3 col-sm-4 hidden-xs">
				<img src="resources/img/bus_picture.png"
					alt="<spring:message code="index.description.alt" />"
					class="img-rounded img-bus">
			</div>
		</div>
		<div class="row advantages">
			<div class="col-sm-4 advantage">
				<div class="row">
					<div class="col-sm-12 col-xs-6">
						<img src="resources/img/world.png"
							alt="<spring:message code="index.world.alt" />">
					</div>
					<div class="col-sm-12 col-xs-6">
						<blockquote>
							<p>
								<spring:message code="index.world.description" />
							</p>
						</blockquote>
					</div>
				</div>
			</div>
			<div class="col-sm-4 advantage">
				<div class="row">
					<div class="col-sm-12 col-sm-push-0 col-xs-6 col-xs-push-6">
						<img src="resources/img/calendar.png"
							alt="<spring:message code="index.calendar.alt" />">
					</div>
					<div class="col-sm-12 col-sm-pull-0 col-xs-6 col-xs-pull-6">
						<blockquote>
							<p>
								<spring:message code="index.calendar.description" />
							</p>
						</blockquote>
					</div>
				</div>
			</div>
			<div class="col-sm-4 advantage">
				<div class="row">
					<div class="col-sm-12 col-xs-6">
						<img src="resources/img/piggy.png"
							alt="<spring:message code="index.money.alt" />">
					</div>
					<div class="col-sm-12 col-xs-6">
						<blockquote>
							<p>
								<spring:message code="index.money.description" />
							</p>
						</blockquote>
					</div>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="footer.jsp" />
</body>
</html>