<?php

	include_once("sms.php");
    // Arrays of spam and ham read from file
    $smsArray = array(); 

	// Read collection and filter them by spam or ham
	$handle = @fopen("collection", "r");
	if ($handle) {
	    while (($buffer = fgets($handle, 4096)) !== false) {
			// Check if the line is spam or ham
			$parts = preg_split('/\s+/', $buffer);
			
			$message = trim(preg_replace('/\t+/', ' ', $buffer));
			// $parts[0] = type, the rest is the message
		
			$currentSMS = new SMS($parts[0], substr(strstr($message," "), 1));
			
			$jsonSMS = array();
			$jsonSMS["type"] = $currentSMS->type;
			$jsonSMS["words"] = $currentSMS->words;
			$jsonSMS["message"]= $currentSMS->message;
			array_push($smsArray, $currentSMS);
		
	    }
	    
	    
	    if (!feof($handle)) {
	        echo "Error: unexpected fgets() fail\n";
	    }
	    fclose($handle);
	}
	echo json_encode($smsArray);
?>
