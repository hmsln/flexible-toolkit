# Flexible toolkit

```flexible-toolkit``` is an open source module that exposes utility functions (for string, object or array manipulation).
These utility functions are gathered as submodules that can be imported one by one. You can specify, for each module, whether
its functions should be imported as standalone or as extensions of native objects.

## Installation

Install with the command ```npm install flexible-toolkit```

## Importing submodules

To import all submodules as both extension of native objects and standalone functions:

```javascript
var toolkit = require('flexible-toolkit.js')();

/*standalone functions from the array, string and scheduled-action submodules are in toolkit.array, toolkit.string and toolkit['scheduled-action']*/

//Let's copy an array using both Array.prototype.copy and the standalone toolkit.array.copy
var testArr = [1, 2, 3];

//copy using Array.prototype.copy
var testArrCopy1 = testArr.prototype.copy();

//copy arr1 using the standalone function copy attached to toolkit.array
var testArrCopy2 = toolkit.array.copy(testArr);
```

To import all submodules as extension of native objects:

```javascript
var toolkit = require('flexible-toolkit.js')(true);
```

To import all submodules as standalone functions:

```javascript
var toolkit = require('flexible-toolkit.js')(false, true);
```

You can also specify which submodules should be imported and how.

```javascript
var toolkit = require('flexible-toolkit.js')([
    {
       name: 'array',
       arguments: [true, true]//import as native types extension and standalone functions
    },
    {
        name: 'object',
        arguments: [false, true] //only import as standalone functions
    },
    {
        name: 'scheduled-action'
    },
    {
        name: 'string',
        arguments: [true, false] //only import as native types extension
    },
    {
        name 'arithmetics'
    }
]);
```

If you do not want to import a module, just omit it from the toRequire parameter:
```javascript
var toolkit = require('flexible-toolkit.js')([
    {
       name: 'array',
       arguments: [true, true]//import as native types extension and standalone functions
    },
    {
        name: 'scheduled-action'
    },
    {
        name: 'string',
        arguments: [true, false] //only import as native types extension
    }
    //arithmetics and object have been omitted and thus will not be imported
]);
```

If you have imported some submodules as standalone functions, ```require('flexible-toolkit.js')(submodulesToRequire)``` returns an object with the submodules attached.

```javascript
var toolkit = require('flexible-toolkit.js')([
    {
       name: 'array',
       arguments: [true, true]//import as native types extension and standalone functions
    },
    {
        name: 'scheduled-action'
    },
    {
        name: 'string',
        arguments: [true, false] //only import as native types extension
    }
    //arithmetics and object have been omitted and thus will not be imported
]);
``` 

Note: the submodule loader used for importation is [suit-yourself](https://github.com/hmsln/suit-yourself). It's used as a dependency by this package.

## Overview of the submodules

Available submodules are:

+ ```array```, ```object``` and ```string```, which can be imported either as extensions of native objects, or as standalone functions.

+ ```arithmetics``` and ```scheduled-action```, which can only be imported as standalone functions.


#### arithmetics
**randStr([length])** - Generate a random string of length ```length``` with characters 0-9a-zA-Z (default length is 32).
```javascript
var r = toolkit.arithmetics.randStr();
console.log(r);
//'HJD8PXL7uaaF7ze8YDaqPO8XxWkvQfSE'
```
#### array
**copy()** - Shallow copies the array.
```javascript
var testArr = [1, 2, 3, 4, 5];
var arr = testArr.copy(); // as extension of Array.prototype
//or as standalone function: var arr = toolkit.array.copy(testArr);
console.log(arr);
//[1, 2, 3, 4, 5]
```
**move(old_index, new_index)** - Move an element from old_index to new_index, mutating the array it's applied to.
```javascript
var testArr = [1, 2, 3, 4, 5];
testArr.move(1, 2); // as extension of Array.prototype
//or as standalone function: toolkit.array.move(testArr, 1, 2);
console.log(testArr);
//[1, 3, 2, 4, 5] (element at index 1 has been moved to index 2)
```
**concatNew(arr)** - Concat elements of arr that are not present in the array it's applied to; Array.prototype.indexOf is used for comparison.
```javascript
var testArr = [1, 2, 3, 4, 5];
var testArr2 = [5, 6, 7];
testArr.concatNew(testArr2); // as extension of Array.prototype
//or as standalone function: toolkit.array.concatNew(testArr, testArr2);
console.log(testArr);
//[1, 2, 3, 4, 5, 6, 7]
```
**without(values, [mutate])** - remove from the array it's applied to the elements from the ```values``` array, mutating the array it's applied to.
```javascript
var testArr = [1, 2, 3, 4, 5];
var testArr2 = [5, 6, 7];
testArr.without(testArr2, true);
//or as standalone function: toolkit.array.without(testArr, testArr2, true);
console.log(testArr);
//[1, 2, 3, 4]
```
**containsElementsOfArray(arr)** - returns true if arr and the array it's applied to have some elements in common. Array.prototype.indexOf is used for comparison.
```javascript
var testArr = [1, 2, 3, 4, 5];
var testArr2 = [5, 6, 7];
var bool = testArr.containsElementsOfArray(testArr2);
//or as standalone function: toolkit.array.containsElementsOfArray(testArr, testArr2);
console.log(bool);
//true
```
#### object
**shallowCopy** - copies enumerable properties of an object, including its subobjects, and its protoype chain; Warning! subobjects are copied as references, and are shared with the origin object.
```javascript
var makeObj = function () {
    this.a = 1;
    this.b = {
        c: 2
    };
}

var obj = new makeObj();
var copy = obj.shallowCopy();
//or as standalone function: var copy = toolkit.object.shallowCopy(obj);
```
**deepCopy** - copies an object, including its subobjects, and its protoype chain. Subobjects are recursively copied as values, and aren't shared with the origin object. Two caveats: circular references within object will lead to infinite recursion (will solve this as soon as I have the time); and doesn't copy closures' scopes (you just can't do that).
```javascript
var makeObj = function () {
    this.a = 1;
    this.b = {
        c: 2
    };
}

var obj = new makeObj();
var copy = obj.deepCopy();
//or as standalone function: var copy = toolkit.object.deepCopy(obj);
```
#### string
**capitalize** - the first character of the string is set in uppercase.
```javascript
var testStr = 'simba';
testStr.capitalize();
//or as standalone function: toolkit.string.capitalize(testStr);
console.log(testStr);
//Simba
```
**uncapitalize** - the first character of the string is set in lowercase.
```javascript
var testStr = 'Simba';
testStr.capitalize();
//or as standalone function: toolkit.string.uncapitalize(testStr);
console.log(testStr);
//simba
```
#### scheduled-action
Allows you to schedule a allback to execute once some conditions have been met.
```javascript
//create callback function, setting bool as
var f = function(){
	console.log('callback has been executed!');
}

//constructor of a scheduledAction object
var s = new toolkit['scheduled-action'](['condition1', 'condition2'], f);
//toolkit['scheduled-action'].setTrue(condition) - set as true one of the conditions of the object
s.setTrue('condition1');
s.setTrue('condition2');
//'callback has been executed!'
```

## Tests

The test spec is in ```/test/test.spec.js```, and the test suite is ```jasmine-node```, which you can install by running ```npm install -g jasmine-node```

You can run the tests with the commands ```jasmine-node test``` or ```npm run test```

## To do
In ```object.deepCopy```: detect circular references and prevent fucntion from entering in infinite recursion when encountering circular references. I'll do that as soon as I have the time.

Add typechecking to make some functions more robust to programmer error (throw TypeError so logging is easier).

Some of the submodules might be enriched with new functions. Other submodules could be added. I'm thinking of adding
set manipulation operations such as ```intersect```, ```union``` or ```difference``` for ```Set``` and ```WeakSet``` types.

Thank you for reading this far. If you have any bugs to report or improvements to suggest you can send me an email at hubert.maslin@gmail.com.