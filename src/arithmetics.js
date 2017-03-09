'use strict';

//utility functions for math/crypto purposes

//Generate a random string of length 'length` with characters 0-9a-zA-Z (default length is 32)
function randStr(length) {
	
	var length = length || 32;
	
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    
    for (var i = length; i > 0; --i) {
    	result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    
    return result;
}

module.exports.randStr = randStr;