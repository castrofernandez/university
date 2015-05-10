<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="container">
	<div class="row">
		<div class="col-xs-12">
			
			<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
			  <div class="panel panel-default">
			    <div class="panel-heading task-heading" role="tab" id="headingOne">
			      <h4 class="panel-title">
			        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="task-title">
			          <spring:message code="task.title" />
			          <span id="task-arrow" class="glyphicon glyphicon-chevron-down task-arrow" aria-hidden="true"></span>
			        </a>
			      </h4>
			    </div>
			    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
			      <div class="panel-body">
			        <spring:message code="task.description" />
			      </div>
			    </div>
			  </div>
			</div>

		</div>
	</div>
</div>