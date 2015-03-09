<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<header>
	<div class="container">
		<div class="no-print col-xs-12">
			<div class="language pull-right">
				<c:if test="${not empty userName}">
					<span class="sesion"><spring:message code="site.hello" />
						${userName}, <a href="logout"><spring:message
								code="site.logout" /></a></span>|
					</c:if>
				<c:choose>
					<c:when test="${pageContext.response.locale.language eq 'es'}">
						<a class="active language-1" data-audit="yes" id="header-es">es</a>|<a href="index?lang=en"
							class="language-2" data-audit="yes" id="header-en">en</a>
					</c:when>
					<c:otherwise>
						<a href="index?lang=es" class="language-1" data-audit="yes" id="header-es">es</a>|<a
							class="active language-2" data-audit="yes" id="header-en">en</a>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
		<div class="col-xs-12 logo">
			<a href="index" data-audit="yes" id="header-logo"> <img class="no-print"
				src="resources/img/bus_flat.png"
				alt="<spring:message code="site.alt.logo"/>">
				<div class="title">
					<h1>
						<spring:message code="site.name" />
					</h1>
					<h3>
						<spring:message code="site.subtitle" />
					</h3>
				</div>
			</a>
		</div>
	</div>
</header>
