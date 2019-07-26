
/*jshint multistr: true ,node: true*/
"use strict";

let schema = require('./schema');
let util = require('../util');

require('./addRide.js').listen({
    method : 'POST',
    route: '/ride',
    schema: schema['POST_/ride'],
    validator: util.validateUser
});

require('./confirmRide.js').listen({
    method : 'POST',
    route: '/ride/:id/confirm',
    schema: schema['POST_/ride'],
    validator: util.validateUser
});

require('./listRides.js').listen({
    method : 'GET',
    route: '/me/rides',
    schema: schema['GET_/rides'],
    validator: util.validateUser
});
