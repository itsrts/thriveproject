
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let rides = require('../model/rides').getInstance();
class UpdateRide extends ServerRequest {

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
            if(data.user.type != "driver") {
                throw "Only Driver can accpet rides";
            }
            return await rides.updateRide(data.pathparams.id, data.user.id);
        } catch (error) {
            throw {
                code : 409,
                status : error || 'Not Available'
            }
        }
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
     * @returns {UpdateRide}  
     */
    listen(opts) {
        if(object === null) {
            object = new UpdateRide(opts);
        }
        return object;
    }
};
