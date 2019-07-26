
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;
let users = require('../model/users').getInstance();

class Register extends ServerRequest {

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

    async process(data, request, response) {
        try {
            return await users.register(data.body);
        } catch (error) {
            throw {
                code : 500,
                status : 'Something went wrong'
            }
        }
    }

    makeResponse(data, result, request, response) {
        return {
            code : 200,
            status : 'done'
        }
    }
}

let object = null;
module.exports = {
    /**
     * @param opts {{method : string, route : string, schema : JSON, validator : Function}} config 
     * @returns {Register}  
     */
    listen(opts) {
        if(object === null) {
            object = new Register(opts);
        }
        return object;
    }
};
