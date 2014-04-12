<?php

class SMS{
	public $type;
	public $message;
	
	// List of all words separated in an array
	public $words = array();
	
	public function __construct($t="",$m=""){
		$this->type = $t;
		$this->message = $m;
		

		$numCount = $this->countDigits($m);
		
		$m = trim(str_replace(range(0,9),' ___ ',$m));
		
		$m = trim(str_replace('&',' &&& ',$m));
		$m = trim(str_replace('$',' $$$ ',$m));
		$m = trim(str_replace('€',' €€€ ',$m));
		$m = trim(str_replace('£',' £££ ',$m));
		$m = trim(str_replace('/',' /// ',$m));

		$m = trim(str_replace(':',' ::: ',$m));
		$m = trim(str_replace(';',' ;;; ',$m));
		$m = trim(str_replace('-',' --- ',$m));
		
		$m = trim(str_replace('>',' >>> ',$m));
		$m = trim(str_replace('<',' <<< ',$m));
		
		$m = trim(str_replace('@',' @@@ ',$m));
		
	
	
		
				
		$parts = preg_split('/\s+/', $m);
		
		$tempWords = implode(" ",$parts);
		
		$delimiters = array(" ","!","?",".",",","\n","*","\n\r");
		$tempWords = $this->explodeX( $delimiters, $tempWords);
		
		$i = 0;
		
		for($i = 0;$i<count($tempWords);$i++){
			$tempWords[$i] = strtolower($tempWords[$i]);
			if($tempWords[$i]=="" || $tempWords[$i]=='' || !$tempWords[$i]){
				unset($tempWords[$i]);
				$tempWords = array_values($tempWords);
				$i--;
			}
		}
		
		$this->words = $tempWords;
	}

	//http://stackoverflow.com/questions/11023753/function-to-count-number-of-digits-in-string
	public function countDigits( $str )
	{
	    return preg_match_all( "/[0-9]/", $str );
	}
	
	//
	// Explodes a sting using an array of delimiters 
	//
	// source : http://www.phpdevtips.com/2011/07/exploding-a-string-using-multiple-delimiters-using-php/
	public function explodeX($delimiters,$string){
 
		$return_array = Array($string); // The array to return
		 
		$d_count = 0;
		 
		while (isset($delimiters[$d_count])) // Loop to loop through all delimiters 
		{
		 
			$new_return_array = Array();
			 
			foreach($return_array as $el_to_split) // Explode all returned elements by the next delimiter 
			{
				$put_in_new_return_array = explode($delimiters[$d_count],$el_to_split);
				 
				foreach($put_in_new_return_array as $substr) // Put all the exploded elements in array to return
				{
					$new_return_array[] = $substr;
				}	 
			}
				 
			$return_array = $new_return_array; // Replace the previous return array by the next version
				 
			$d_count++;
			 
		}
			 
		return $return_array; // Return the exploded elements
			 
	}
}

?>