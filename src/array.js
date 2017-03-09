'use strict';

//utility functions for Array

module.exports = function () {
	
    //extending native objects with these functions?
    var extendingNatives = arguments[0];
    
    //and/or returning these functions as standalone?
    var returnFns = arguments[1];
    
    //store functions in array before binding them to native obejcts and/or returning them as standalone
	var fns = {};
    
    //Shallow copies the array it's applied to
	fns.copy = function () {
		
		var arr = [];
		
		this.forEach(function (el, i) {
			arr[i] = el;
		});
		
		return arr;
	}
	
    //Move an element from old_index to new_index, mutating the array it's applied to
	fns.move = function (old_index, new_index) {
		
		var arr = this;
		
		if (new_index >= this.length) {
			var k = new_index - this.length;
			while ((k--) + 1) {
				this.push(undefined);
			}
		}
		
		arr.splice(new_index, 0, this.splice(old_index, 1)[0]);
	
		return this;
	};
	
    //Concat elements of arr that are not present in the array it's applied to
	fns.concatNew = function (arr) {
		
		var c = this;
		
		arr.forEach(function (el) {
			if (c.indexOf(el) == -1) {
				c.push(el);
			}
		});
  
  		return c;
	}
    
    //remove from the array it's applied to the elements from the values array, mutating the array it's applied to
	fns.without = function(values, mutate){
	   	
	   	if (mutate) {
	   		var arr = this;
	   	}
	   	else{
	   		var arr = fns.copy.call(this);
	   	}
	   	
	   	for (var i = 0; i < arr.length; i++) {
	    	if (Object.prototype.toString.call(values) === '[object Array]') {
	    		if (values.indexOf(arr[i]) > -1) {
	    			arr.splice(i, 1);
	    		}
	    	}
	    	else {
	        	if (arr[i] === values) {
	    			arr.splice(i, 1);
	    		}
	        }
    	};
		
    	return arr;
	};
	
    //returns true if arr and the array it's applied to have some elements in common
	fns.containsElementsOfArray = function(arr){
		
		var thisArr = this;

		var bool = arr.some(function(el){
			if (thisArr.indexOf(el) > -1) {
				return bool = true;
			}
		});
	
		return bool;
	}
    
    //extending natives
	if (extendingNatives) {

		var nativeObject = Array;
	
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