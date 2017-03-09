'use strict';

//utility functions for String

module.exports = function () {
	
    //extending native objects with these functions?
    var extendingNatives = arguments[0];
    
    //and/or returning these functions as standalone?
    var returnFns = arguments[1];
    
    //store functions in array before binding them to native obejcts and/or returning them as standalone
	var fns = [];
	
    //sets the first character of the string in uppercase
	fns.uncapitalize = function(mutate) {
		return this.charAt(0).toLowerCase() + this.slice(1);
	}
    
    //sets the first character of the string in lowercase.
	fns.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
    
    //extending natives
	if (extendingNatives) {

		var nativeObject = String;
	
		for (var key in fns) {
			if (fns.hasOwnProperty(key)) {
				nativeObject.prototype[key] = fns[key];
			}
		}
	}
	
	//returning functions as standalone
	if(returnFns || !extendingNatives && returnFns == undefined) {
        
        var fnsToReturn = {};
        
        for (var key in fns) {
            if (fns.hasOwnProperty(key)) {
                //wrapping the function in a .apply so the users don't have use .apply/.call when using them
                fnsToReturn[key] = (function (key) {
                	return function () {
	                    var arrToApplyTo = arguments[0];
    	                var otherArgs = Array().slice.call(arguments, 1);
        	            return fns[key].apply(arrToApplyTo, otherArgs);
        	        }
                })(key);
            }
        }
        
		return fnsToReturn;
	}
}