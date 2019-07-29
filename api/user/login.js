
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let users = require('../../model/users').getInstance();
let cache = require('../../cache');
let uuid = require('uuid/v4');

class Login extends ServerRequest {

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
            let user = await users.authenticate(data.body.username, data.body.password);
            let token = uuid();
            cache.save(token, user);
            console.log(token);
            response.cookie('token', token);
            return user;
        } catch (error) {
            console.log(error);
            throw {
                code : 401,
                status: 'Invalid Credentials'
            }
        }
    }

}

let object = null;
module.exports = {
    /**
     * @param opts {{method : string, route : string, schema : JSON, validator : Function}} config 
     * @returns {Login}  
     */
    listen(opts) {
        if(object === null) {
            object = new Login(opts);
        }
        return object;
    }
};
