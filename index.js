'use strict';

var suitYourself = require('suit-yourself');

/*
-returns the toolkit factory, allowing requiring of specified moduels, as extensions of native types and/or standalone functions
-arguments to factory should be an array of submodules to require (see docs) or whatever
the handleArgumentsElse function (see below) can handle
*/
module.exports = function () {
	
    //turns arguments into an array for convenience's sake
	var args = Array().slice.call(arguments);
	
    //path of toolkit submodules
	var path = __dirname + '/src';
    
    //list of available toolkit submodules
    var availableSubmodules = {
        'arithmetics': {},
    	'array': {
            isFactory: true
    	},
    	'object': {
            isFactory: true
    	},
        'scheduled-action': {},
        'string': {
            isFactory: true
    	}
    };
	
    /*
    -allow requiring all modules at once by passing no parameters to toolkit factory, or one or two booleans
    -this function is called within suit-yourself if toRequireArgs isn't an array
    */
    var handleArgumentsElse = function (toRequireArgs) { 
        
        var extendingNatives = false;
    	var standaloneFunctions = false;
		
        //requiring all modules as extensions of native types AND standalone functions
    	if (toRequireArgs.length === 0) {

    		extendingNatives = true;
    		standaloneFunctions = true;
    	
	    } else if (Object.prototype.toString.call(toRequireArgs[0]) === '[object Boolean]') {
            //requiring all modules as extensions of native types AND/OR standalone functions
    		extendingNatives = toRequireArgs[0];
	    	standaloneFunctions = toRequireArgs[1] == undefined ? false : toRequireArgs[1];
	    	
    	} else {//invalid arguments
    		throw new TypeError('Invalid parameters have been passed to module flexible-toolkit');
    	}
    	
    	return [extendingNatives, standaloneFunctions];
    }
    
    //add path and list of available submodules
    args.unshift(path, availableSubmodules, handleArgumentsElse);
    
    //require submodules through suit-yourself
	return suitYourself.apply({}, args);
}