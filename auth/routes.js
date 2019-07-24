
/*jshint multistr: true ,node: true*/
"use strict";

let schema = require('./schema');

require('./login.js').listen({
    method : 'POST',
    route: '/login',
    schema: schema['POST_/login'],
    validator: null
});

require('./me.js').listen({
    method : 'GET',
    route: '/me',
    schema: schema['GET_/me'],
    validator: null
});
