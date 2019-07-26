
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let rides = require('../model/rides').getInstance();
class AddRide extends ServerRequest {

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
        return rides.addNewRide(data.user.id);
    }

    makeResponse(data, result, request, response) {
        return {
            "message" : "Ride Added"
        };
    }
}

let object = null;
module.exports = {
    /**
     * @param opts {{method : string, route : string, schema : JSON, validator : Function}} config 
     * @returns {AddRide}  
     */
    listen(opts) {
        if(object === null) {
            object = new AddRide(opts);
        }
        return object;
    }
};
