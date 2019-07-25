
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

    async process(data, request, response) {
        await rides.addNewRide(data.user.id);
        return "Ride Added";
    }

    makeResponse(data, result, request, response) {
        return {
            "message" : result
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
