
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let rides = require('../../model/rides').getInstance();
class ConfirmRide extends ServerRequest {

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
}

let object = null;
module.exports = {
    /**
     * @param opts {{method : string, route : string, schema : JSON, validator : Function}} config 
     * @returns {ConfirmRide}  
     */
    listen(opts) {
        if(object === null) {
            object = new ConfirmRide(opts);
        }
        return object;
    }
};
