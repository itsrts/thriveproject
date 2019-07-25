
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let cache = require('../cache');

class Me extends ServerRequest {

    /**
     * @param opts {{method : string, route : string, schema : JSON, validator : Function}} config 
     */
    constructor(opts) {
        super({
            method      : opts.method,
            route       : opts.route,
            schema      : opts.schema,
            validator   : opts.validator
        });
    }

    process(data, request, response) {
        let user = cache.get(data.cookies['token']);
        if(user) {
            return user;
        }
        throw {
            code : 401,
            status: 'Invalid Credentials'
        }
    }

}

let object = null;
module.exports = {
    /**
     * @param opts {{method : string, route : string, schema : JSON, validator : Function}} config 
     * @returns {Me}  
     */
    listen(opts) {
        if(object === null) {
            object = new Me(opts);
        }
        return object;
    }
};
