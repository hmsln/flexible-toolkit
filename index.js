'use strict';

var customErrorFactory = require('custom-error-factory');
var suitYourself = require('suit-yourself');

/*
-returns the toolkit factory, allowing requiring of specified moduels, as extensions of native types and/or standalone functions
-arguments to factory should be an array of submodules to require (see docs) or whatever
the handleArgumentsElse function (see below) can handle
*/
module.exports = function () {
	
	//define custom error
	var InvalidParametersError = customErrorFactory(TypeError,
		'Invalid_Parameters_Error',
		'Invalid parameters have been passed to module flexible-toolkit');
		
    //turns arguments into an actual array for convenience's sake
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
    
    //define parameter to specify which modules should be called
    var toRequire = {};
    
    //if no arguments have been passed: require all submodules, as both native objects extensions and standalone functions
    if (args.length == 0) {
    	toRequire.requireMode = 'all';
    	toRequire.args = [true, true];
    } else if (args.length == 2 && typeof(args[0]) == 'boolean' && typeof(args[1]) == 'boolean') {
    	/*
    	all modules are to be require; two boolean arguments:specify whether submodules
    	should be required as both native objects extensions and standalone functions
    	*/
    	toRequire.requireMode = 'all';
    	toRequire.args = [args[0], args[1]];
    } else if (args.length == 1 && Object.prototype.toString.call(args[0]) == '[object Array]') {
    	toRequire.requireMode = 'specific';
    	toRequire.requireList = args[0];
    } else {
    	throw new TypeError('Invalid parameters have been passed to module flexible-toolkit');
    }
    
    var toRequireArgs = args.slice(2);
    
    //add path and list of available submodules
    args.unshift(path, availableSubmodules, toRequire);
    
    //require submodules through suit-yourself
	return suitYourself.apply({}, args);
}