'use strict';

//utility functions for Object

module.exports = function () {
	
    //extending native objects with these functions?
    var extendingNatives = arguments[0];
    
    //and/or returning these functions as standalone?
    var returnFns = arguments[1];
    
    //store functions in array before binding them to native obejcts and/or returning them as standalone
	var fns = [];
	
	/*
    -copies enumerable properties of an object, including its subobjects, and its protoype chain;
    Warning! subobjects are copied as references, and are shared with the origin object.
    */
	fns.shallowCopy = function (obj) {
		return Object.assign({}, this);
	}
	
    /*
    -Copies all properties of an object, whether enumerable or not, including its subobjects, and its protoype chain.
    -Subobjects are recursively copied as values, and aren't shared with the origin object.
	-Two caveats: treatment of circular references within object; and doesn't copy closures' scopes (you just can't do that).
	*/
    /*
    -TO DO: detect circular references and prevent fucntion from entering in infinite recursion when encountering
    circular references
    */
    fns.deepCopy = function () {
	
		var copy = Object.create(Object.getPrototypeOf(this));
  
		var keys = Object.getOwnPropertyNames(this);
		var i;
		var desriptor;
  
		for (i = 0; i < keys.length; i++){
	
			var descriptor = Object.getOwnPropertyDescriptor(this, keys[i]);

			if (descriptor.value || typeof(this[keys[i]]) === 'function') {
      	
				if (this[keys[i]] instanceof Object) {
					descriptor.value = fns.deepCopy.call(this[keys[i]]);
				} else {
					descriptor.value = this[keys[i]];
				}
			}
	
			Object.defineProperty(copy, keys[i], descriptor);
		}
	
		return copy;
	}
	
    //extending natives
	if (extendingNatives) {

		var nativeObject = Object;
	
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