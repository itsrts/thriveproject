
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

class ListRides extends ServerRequest {

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

    process(request, data, response) {
        return "Hello !! This is a sample response from class 'ListRides'";
    }

    makeResponse(data, result, request, response) {
        return {
            "response" : result
        };
    }
}

let object = null;
module.exports = {
    /**
     * @param opts {{method : string, route : string, schema : JSON, validator : Function}} config 
     * @returns {ListRides}  
     */
    listen(opts) {
        if(object === null) {
            object = new ListRides(opts);
        }
        return object;
    }
};
