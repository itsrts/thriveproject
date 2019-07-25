/*jshint multistr: true ,node: true*/
"use strict";

// For the project to be less dependent, using memory cache instead of something as `redis`
let cache = {};

let save = function(key , value) {
    cache[key] = value;
    return cache[key];
}

let get = function(key, defaultValue) {
    return cache[key] ? cache[key] : defaultValue;
}

let incrementBy = function(key, value) {
    if(!cache[key]) {
        cache[key] = 0;
    }
    cache[key] += value;
    return cache[key];
}

let decrementBy = function(key, value) {
    if(!cache[key]) {
        cache[key] = 0;
    }
    cache[key] -= value;
    return cache[key];
}

module.exports = {
    save, get,
    incrementBy, decrementBy
}
