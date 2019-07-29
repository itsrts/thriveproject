
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let rides = require('../../model/rides').getInstance();

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

    process(data, request, response) {
        return rides.allRides(data);
    }

    makeResponse(data, result, request, response) {
        return {
            "rides" : result
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
