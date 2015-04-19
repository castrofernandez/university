<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<footer>
	<p>
		<spring:message code="site.copyright" />
	</p>
	<p>Contador de visitas:</p>
	<p class="visits-count">${sessions}</p>
	<input type="hidden" id="user-id" value="${userEmail}" />
	<input type="hidden" id="session-id" value="${sessionid}" />
</footer>

<script type="text/javascript" src="resources/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>

<script type="text/javascript" src="resources/js/audit.js"></script>