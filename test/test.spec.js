'use strict';

//var toolkit = require('../index.js')();
//var toolkit = require('../index.js')(true, true);
var toolkit = require('../index.js')([
    {
       name: 'array',
       args: [true, true]//import as native types extension and standalone functions
    },
    {
        name: 'object',
        args: [true, true] //only import as standalone functions
    },
    {
        name: 'scheduled-action'
    },
    {
        name: 'string',
        args: [true, true] //only import as native types extension
    },
    {
        name: 'arithmetics'
    }
]);

describe('utility functions for arrays;', function () {

	describe('copy', function () {
        
        var testArr = [1, 2, 3, 4, 5];
        
        describe('as a property of Array.prototype,', function () {
        	it('shallow copies the array', function () {
		        expect(testArr.copy()).toEqual(testArr);
	        });
        });
	        
	    describe('as a standalone function,', function () {
        	it('shallow copies the array', function () {
		        expect(toolkit.array.copy(testArr)).toEqual(testArr);
		    });
	    });

	});

	describe('move', function () {
		
		describe('as a property of Array.prototype,', function () {
			
			var testArr = [1, 2, 3, 4, 5];
			
			it('moves the element at index args1 to index args2', function () {
				expect(testArr.move(1, 2)).toEqual([1, 3, 2, 4, 5]);
			});
		});
        
		describe('as a standalone function,', function () {
			
			var testArr = [1, 2, 3, 4, 5];
			
			it('moves the element at index args1 to index args2', function () {
				expect(toolkit.array.move(testArr, 1, 2)).toEqual([1, 3, 2, 4, 5]);
			});
		});
	});

	describe('concatNew', function () {
		
		describe('as a property of Array.prototype,', function () {
			
			var testArr = [1, 2, 3, 4, 5];
			var testArr2 = [5, 6, 7];
		
			it('add elements which aren\'t there yet; Array.prototype.indexOf is used for comparison.', function () {
				expect(testArr.concatNew(testArr2)).toEqual([1, 2, 3, 4, 5, 6, 7]);
			});
		});
		
		describe('as a standalone function,', function () {	
			
			var testArr = [1, 2, 3, 4, 5];
			var testArr2 = [5, 6, 7];
		
			it('add elements which aren\'t there yet; Array.prototype.indexOf is used for comparison.', function () {
				expect(toolkit.array.concatNew(testArr, testArr2)).toEqual([1, 2, 3, 4, 5, 6, 7]);
			});
		});
	});

	describe('without', function () {
		
		var testArr2 = [5, 6, 7];

		describe('as a property of Array.prototype,', function () {
			it('removes the values passed as argument from the array, mutating it', function () {
				var testArr = [1, 2, 3, 4, 5];
				expect(testArr.without(testArr2, true)).toEqual([1, 2, 3, 4]);
			});
		});
		
		describe('as a standalone function,', function () {		
			it('removes the values passed as argument from the array, mutating it', function () {
				var testArr = [1, 2, 3, 4, 5];
				expect(toolkit.array.without(testArr, testArr2, true)).toEqual([1, 2, 3, 4]);
			});
		});
	});
	
	describe('containsElementsOfArray', function () {
		
		var testArr = [1, 2, 3, 4, 5];
		var testArr2 = [5, 6, 7];
		var testArr3 = [6, 7];
		
		describe('as a property of Array.prototype,', function () {
			it('returns true if both arrays have some elements in common; Array.prototype.indexOf is used for comparison', function () {
				expect(testArr.containsElementsOfArray(testArr2)).toEqual(true);
				expect(testArr.containsElementsOfArray(testArr3)).toEqual(false);
			});
		});
		
		describe('as a standalone function,', function () {		
			it('returns true if both arrays have some elements in common; Array.prototype.indexOf is used for comparison', function () {
				expect(toolkit.array.containsElementsOfArray(testArr, testArr2)).toEqual(true);
				expect(toolkit.array.containsElementsOfArray(testArr, testArr3)).toEqual(false);
			});
		});
	});
});

describe('utility functions for strings', function () {

	describe('capitalize', function () {
		
		var testStr = 'simba';
		
		describe('as a property of String.prototype,', function () {
			it('capitalizes the string', function () {
				expect(testStr.capitalize()).toEqual('Simba');
			});
		});
		
		describe('as a standalone function,', function () {		
			it('capitalizes the string', function () {
	            expect(toolkit.string.capitalize(testStr)).toEqual('Simba');
	        });
		});
	});
	
	describe('uncapitalize', function () {	
		
		var testStr = 'Simba';
		
		describe('as a property of String.prototype,', function () {
			it('uncapitalizes the string', function () {
				expect(testStr.uncapitalize()).toEqual('simba');
			});
		});
		
		describe('as a standalone function,', function () {
			it('uncapitalizes the string', function () {
	            expect(toolkit.string.uncapitalize(testStr)).toEqual('simba');
	        });
		});
	});
});

describe('utility functions for objects', function () {
	
	describe('shallowCopy', function () {
	
		var makeObj = function () {
			this.a = 1;
			this.b = {
				c: 2
			};
		}

		var obj = new makeObj();
		
		describe('as a property of Object.prototype,', function () {
			it('copies an object, including its subobjects, and its protoype chain', function () {
				expect(obj.shallowCopy()).toEqual(obj);
			});
		});
		
		describe('as a standalone function,', function () {
			it('copies an object, including its subobjects, and its protoype chain', function () {
				expect(toolkit.object.shallowCopy(obj)).toEqual(obj);
			});
		});
	});
	
	
	describe('deepCopy', function () {
  
		var makeObj = function () {
			this.a = 1;
			this.b = {
				c: 2
			};
		}
		
		makeObj.prototype.d = 3;
		
		var obj = new makeObj();
		
		describe('as a property of Object.prototype,', function () {
			it('copies an object, including its subobjects, and its protoype chain', function () {
				expect(obj.deepCopy()).toEqual(obj);
			});
		});
		
		describe('as a standalone function,', function () {
			it('copies an object, including its subobjects, and its protoype chain', function () {
				expect(toolkit.object.deepCopy(obj)).toEqual(obj);
			});
		});
	});	
});

describe('scheduled action', function () {
	
	var bool = false;
	
	var f = function(){
		bool = true;
	}
	
	var s = new toolkit['scheduled-action'](['condition1', 'condition2'], f);

	s.setTrue('condition1');
	s.setTrue('condition2');
    
    it('calls a function once all conditions have been set to true', function () {
		expect(bool).toEqual(true);
	});
});

describe('arithmetics', function () {
	describe('randStr', function () {
		it('generates a random string of specified length if an argument has been passed; default length is 32', function () {
			expect(toolkit.arithmetics.randStr().length).toEqual(32);
			expect(toolkit.arithmetics.randStr(128).length).toEqual(128);
		});
	});
});