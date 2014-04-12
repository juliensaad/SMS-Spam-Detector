$(window).load(initPageHandler);


var smsIndex, nbTest, mistakes, learnCount ;

function initPageHandler(){
	$("#submit-button").attr("disabled","disabled");

	$("#learn_button").click(learn);
	$("#nb_learn").keypress(function(e){
		if(e.which == 13){
			learn();
		}
	});
	$("#nb_learn").keyup(function(){
		$(this).val($(this).val().replace(/\D/g, ""));
	});
	$("#test_button").click(test);
	$("#nb_test").keypress(function(e){
		if(e.which == 13){
			test();
		}
	});
	$("#nb_test").keyup(function(){
		$(this).val($(this).val().replace(/\D/g, ""));
	});
	
	$("#spam-submit").click(function(){
		singleTest("spam");
	});
	$("#ham-submit").click(function(){
		singleTest("ham");
	});
	
	$("#reset-button").click(function(){
		smsIndex = 0;
		mistakes = 0;
		nbTest = 0;
		learnCount = 0;
		
		wordTypeCount = new Array();
		wordTypeCount["spam"] = new Array();
		wordTypeCount["ham"] = new Array();
		
		totalWord = 0;
		totalWordSpam = 0;
		totalWordHam = 0;
		
		$("#available-count").html(smsArray.length);
		$("#learned-count").html(0);
		$("#tested-count").html(0);
		$("#error-count").html(0);
		$("#table_body").html("");
		chart.update(0);
	});
	
	smsIndex = 0;
	mistakes = 0;
	nbTest = 0;
	learnCount = 0;
}

function learn(){
	var nbLearn = parseInt($("#nb_learn").val());
	if(nbLearn>parseInt($("#available-count").html(),10)){
		$("#nb_learn").val("");
		alert("Pas assez de sms en reserve!");
		return;
	}
	learnCount += nbLearn;
	for(var i = 0;i<nbLearn;i++){
		learnFromSMS(smsArray[i+nbTest]);
	}
	
	nbTest +=  parseInt($("#nb_learn").val(),10);
	
	$("#submit-button").removeAttr("disabled");
	
	$("#available-count").html(parseInt($("#available-count").html(),10)-parseInt($("#nb_learn").val(),10));  
	$("#learned-count").html(learnCount);
	$("#nb_learn").val("");
}


function test(){
	
	var count = parseInt($("#nb_test").val(),10);
	if(count>parseInt($("#available-count").html(),10)){
		$("#nb_test").val("");
		alert("Pas assez de sms en reserve!");
		return;
	}
	if(learnCount <10){
		$("#nb_test").val("");
		alert("Vous devez apprendre a partir d'au moins 10 sms avant de pouvoir tester!");
		return;
	}
	
	var prob = probList();
	
	var smsResults = new Array();

	for(var i = 0; i<count; i++){
		smsResults[i] = new Array();
		
		smsResults[i]["message"] = smsArray[i+nbTest]["message"];
		smsResults[i]["type"] = smsArray[i+nbTest]["type"];
		smsResults[i]["success"] = (hamOrSpam(smsArray[i+nbTest], prob)==smsArray[i+nbTest]["type"])?true:false;
		
		if(!smsResults[i]["success"]){
			mistakes++;
		}
	}
	
	nbTest +=  parseInt($("#nb_test").val(),10);
	
	buildTable(smsResults);
	console.log(mistakes);

	$("#available-count").html(parseInt($("#available-count").html(),10)-parseInt($("#nb_test").val(),10));  
	$("#tested-count").html(parseInt($("#tested-count").html(),10)+count);
	$("#error-count").html(mistakes);

	chart.update((1-(mistakes/(nbTest-learnCount)))*100);
	$("#nb_test").val("");
	
	$("#sms-div").animate({ scrollTop: $("#table-content").height() }, "slow");
}

function singleTest(inputType){

	var message = $("#sms-input").val();
	
	if(message == ""){
		$("#sms-input").val("");
		alert("Vous devez entrer un message avant de pouvoir tester!");
		return;
	}
	if(learnCount <10){
		alert("Vous devez apprendre a partir d'au moins 10 sms avant de pouvoir tester!");
		return;
	}
	
	var sms = new Array();
	sms["words"] = message.split(" ");

	nbTest++;
	var msgType = hamOrSpam(sms,probList());
	var success = (msgType==inputType)?true:false;
		
	var head = "<tr class="+(success?"success":"danger")+"><td>";
	var count = $('#table_body tr').length + "</td><td>";
	var msg = message+ "</td><td>";
	var type = inputType+"</td><td>";
	var result = success?"✔":"<b>x</b>"+"</td></tr>";

	$("#table_body").append(head+count+msg+type+result); 
	
	if(!success){
		mistakes++;
	}
		
	chart.update((1-(mistakes/(nbTest-learnCount)))*100);
	$("#tested-count").html(parseInt($("#tested-count").html(),10)+1);
	$("#error-count").html(mistakes);
	$("#sms-input").val("");
	
	$("#sms-div").animate({ scrollTop: $("#table-content").height() }, "slow");
}

function buildTable(smsResults){
	
	for (var i = 0; i < smsResults.length; i++) {
	
		var success = smsResults[i]["success"];
		
		var head = "<tr class="+(success?"success":"danger")+"><td>";
		var count = $('#table_body tr').length + "</td><td>";
		var msg = smsResults[i]["message"]+ "</td><td>";
		var type = smsResults[i]["type"]+"</td><td>";
		var result = smsResults[i]["success"]?"✔":"<b>x</b>"+"</td></tr>";

		
	    $("#table_body").append(head+count+msg+type+result); 
	    
	}
}