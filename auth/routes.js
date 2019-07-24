
/*jshint multistr: true ,node: true*/
"use strict";

let schema = require('./schema');

require('./login.js').listen({
    method : 'POST',
    route: '/login',
    schema: schema['POST_/login'],
    validator: null
});
