
/*jshint multistr: true ,node: true*/
"use strict";

let schema = require('./schema');

require('./addRide.js').listen({
    method : 'POST',
    route: '/ride',
    schema: schema['POST_/ride'],
    validator: null
});

require('./updateRide.js').listen({
    method : 'PUT',
    route: '/ride',
    schema: schema['PUT_/ride'],
    validator: null
});

require('./listRides.js').listen({
    method : 'GET',
    route: '/rides',
    schema: schema['GET_/rides'],
    validator: null
});
