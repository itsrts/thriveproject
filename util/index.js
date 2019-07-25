
/*jshint multistr: true ,node: true*/
"use strict";

let cache = require('../cache');

function validateUser(data) {
    console.log(data.cookies['token']);
    let user = cache.get(data.cookies['token']);
    if(user) {
        data.user = user;
    } else {
        throw {
            code : 401,
            status: 'Invalid Credentials'
        }
    }
}

module.exports = {
    validateUser
}
