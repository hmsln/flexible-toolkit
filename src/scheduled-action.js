'use strict';

//Allows you to schedule a allback to execute once some conditions have been met.

//scheduledAction constructor
var ScheduledAction = function (conditionsArg, callback) {
	
    //private conditions object
    var conditions = {};
    
    //conditions have been passed as an array of strings; they're converted to an object
    conditionsArg.forEach(function (c) {
        conditions[c] = false;
    });
    
    //private function: checkReady
    var checkReady = function(){
        
        //private variable checkIfReady
		var ready = true;
        
		for (var c in conditions) {
            
            if (conditions.hasOwnProperty(c)) {
				//if one condition isn't met, we're not ready
        	    if(conditions[c] !== true) {
					ready = false;
	            }
            }
		}
        
        //if all conditions are met, fire callback
		if (ready){
			callback();
		}
	};
    
    //public function: set condition as true
	this.setTrue = function (c) {
		conditions[c] = true;
		checkReady();
	}
};

//export the constructor
module.exports = ScheduledAction;