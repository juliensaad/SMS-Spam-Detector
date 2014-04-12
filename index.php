<html ng-app>	
	<head>
		<meta charset="utf-8">
		
		<title> Spam Detector </title>
		<link rel="shortcut icon" href="favicon.ico">
		
		<!-- For mobile use-->
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>

		<!-- Style sheets -->
			
			<!-- Latest compiled and minified CSS -->
			<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
			<link rel="stylesheet" href="css/narrow.css">
			
			<link rel="stylesheet" href="css/main.css">
	
		<!-- Java Script-->
			<!-- Angular JS -->
			<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.4/angular.min.js"></script>
			<!-- adanac java script -->
			
			<!-- Jquery -->
			<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
			
			<script src="UIBuilder.js"></script>
								
			<!-- Latest compiled and minified JavaScript -->
			<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
			
			

			<!-- adanac java script -->
			<script src="filter.js"></script>				
	</head>
	<body>
		<div id="waiting-overlay">
			<div class="progress progress-striped active" style="width:30%;margin-left:auto;margin-right:auto;">
				<div class="progress-bar"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%">Loading SMS</div>
			</div>
		</div>
		
		<div class="container">
	      <div class="header">
	        <h3 style="display:inline-block;" class="text-muted">Spam detector</h3>
	        <button style="display:inline-block;float:right;margin:8px;" type="button" class="btn btn-default" id="reset-button">reset</button>
	      </div>
	      
	     
			
	      
		  <!-- all stats are shown here -->
	    <div class="row">
			<div class="col-md-2" style="text-align:center">				
				<h4>SMS Tested</h4>
				<h3 id="tested-count" class="text-muted">0</h3>
			</div>
			<div class="col-md-2" style="text-align:center">
				<h4>SMS Learned</h4>
				<h3 id="learned-count" class="text-muted">0</h3>
			</div>
			<div class="col-md-2" style="text-align:center">
				<h4>Errors</h4>
				<h3 id="error-count" class="text-muted">0</h3>
			</div>
			<div class="col-md-2" style="text-align:center">
				<h4>SMS Available</h4>
				<h3 id="available-count" class="text-muted">0</h3>
			</div>
			<div class="col-md-2"><span class="chart" data-percent="0">
				<span class="percent"></span>
			</div>
			<div class="col-md-2" style="text-align:center;">
				<h4>Parameters</h4>
				<div class="input-group">
			      <input type="number" id="nb_learn" class="form-control" ng-model="NBLEARN" placeholder="learn">
			      <span class="input-group-btn">
			        <button class="btn btn-default" style="width:5em" id="learn_button" type="button">Learn</button>
			      </span>
			    </div>
			    <div class="input-group">
			      <input type="number" id="nb_test" class="form-control" ng-model="NBTEST" placeholder="test">
			      <span class="input-group-btn">
			        <button class="btn btn-default" style="width:5em"id="test_button" type="button">Test</button>
			      </span>
			    </div>
			</div>
			
		</div>
	     
	      <!-- Table with all the data analyzed -->

	      <div id="sms-div" class="table-responsive" style=" height: 57% !important; overflow: scroll;">

	       	<table class="table table-striped table-hover spam-table" id="table-content">
		       	<thead>
		       		<tr>
					  	<th>#</th>
					  	<th>Message</th>
					  	<th>Type</th>
					  	<th>Result</th>
		       		</tr>
		       	</thead>
		       	<tbody id="table_body">
		       	</tbody>
	       	
			</table>
	      </div>
		    <div class="input-group">
		      <input type="text" id="sms-input" class="form-control">
		      <div class="input-group-btn">
		        <button type="button" id="submit-button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Test <span class="caret"></span></button>
		        <ul class="dropdown-menu pull-right">
		          <li><a id="spam-submit">Spam</a></li>
		          <li><a id="ham-submit">Ham</a></li>
		        </ul>
		      </div>
		    </div>
	      <div class="footer">
	        <p>Par Nicolas St-Aubin et Julien Saad</p>
	      </div>
    </div>		
    
    <script src="easypiechart.min.js"></script>
	<script>
	document.addEventListener('DOMContentLoaded', function() {
		var chart = window.chart = new EasyPieChart(document.querySelector('span'), {
			easing: 'easeOutElastic',
			delay: 3000,
			onStep: function(from, to, percent) {
				this.el.children[0].innerHTML = Math.round(percent);
			}
		});
	
		
	});
	</script>
	</body>
</html>