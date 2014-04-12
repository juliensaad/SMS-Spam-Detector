var smsArray;
var wordTypeCount;
var totalWord;
var totalWordSpam;
var totalWordHam;

$(window).load(initFilter);

function initFilter(){
	wordTypeCount = new Array();
	wordTypeCount["spam"] = new Array();
	wordTypeCount["ham"] = new Array();
	
	totalWord = 0;
	totalWordSpam = 0;
	totalWordHam = 0;
	
	getMessages();
}

function getMessages(){
	$.ajax({
		type: 'POST',
	    url: 'trainer.php',
	    success: function(msg) {
	 		smsArray = JSON.parse(msg);
	 		$("#waiting-overlay").fadeOut("fast");
	 		$("#available-count").html(smsArray.length);
	 	},
	    error: function(msg) {
	 	 	alert("Erreur, reload la page! :(");
	    }
	});
}

function learnFromSMS(sms){
	var msg = sms["words"];
	var type = sms["type"];
		
	totalWord += msg.length;
		
	if(type=="ham"){
		totalWordHam+=msg.length;
	}else{
		totalWordSpam+=msg.length;
	}
	for(var i=0;i<msg.length;i++){
		var word = msg[i];
		
		if(wordTypeCount[type][word]){
			wordTypeCount[type][word]++;
		}else{
			wordTypeCount[type][word]=1;
		}
	}
}

// Calculates the probability of a word to be associated to a type of sms 
// Returns a list of words with their probability for each type
function probList(){
	
	var hamProbList	= new Array();
	var spamProbList = new Array();

	for(key in wordTypeCount["ham"]){
		var word = key;
		var hamCount = wordTypeCount["ham"][key];	// the amount of time this word is found in a ham
		
		// the amount of time this word is found in a spam
		var spamCount = 0;
		if(wordTypeCount["spam"][word]){
			spamCount = wordTypeCount["spam"][word];
		}
			
        // Probability that a word is a ham 
		var hamProb = (hamCount / totalWord) / ((hamCount/totalWordHam) * (totalWordHam/totalWord) + (spamCount/totalWordSpam) * (totalWordSpam/totalWord));		
		
		//console.log( word +" -> ham :" + hamCount + "     spam :" + spamCount + "  Prob = " + hamProb );
	
		hamProbList[word] = hamProb;
	}
	for(key in wordTypeCount["spam"]){
		var word = key;
		var spamCount = wordTypeCount["spam"][key];	// the amount of time this word is found in a ham
		
		// the amount of time this word is found in a spam
		var hamCount = 0;
		if(wordTypeCount["ham"][word]){
			hamCount = wordTypeCount["ham"][word];
		}
			
        // Probability that a word is a ham 
		var spamProb = (spamCount / totalWord) / ((spamCount/totalWordSpam) * (totalWordSpam/totalWord) + (hamCount/totalWordHam) * (totalWordHam/totalWord));		
		
		//console.log( word +" -> ham :" + hamCount + "     spam :" + spamCount + "  Prob = " + spamProb );
	
		spamProbList[word] = spamProb;
	}
	
	var probList = new Array();
	probList["ham"] = new Array();
	probList["spam"] = new Array();
	probList["ham"] = hamProbList;
	probList["spam"] = spamProbList;

	return probList;
}


function hamOrSpam(sms, probList){
	var msg = sms["words"];
	var spamWordCount = msg.length;
	var hamWordCount = msg.length;
	var spamProb = 0;
	var hamProb = 0;
		
	for(var i=0;i<msg.length;i++){
		var word = msg[i];
		
		// Minimum of 3 letter words to consider
		if(word.length>2){
		
			if(probList["spam"][word]){
				spamProb += probList["spam"][word];
			}else{
				spamWordCount--;
			}
			if(probList["ham"][word]){
				hamProb += probList["ham"][word];
			}else{
				hamWordCount--;
			}
		}
	}

	spamProb = spamProb/spamWordCount;
	
	hamProb = hamProb/hamWordCount;

	return spamProb>hamProb?"spam":"ham";
}