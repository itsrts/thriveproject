
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let tracker = require('../../util/locationTracker');
let rides = require('../../model/rides').getInstance();
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
        try {
            let ride = await rides.addNewRide(data.user.id, data.body.coord_x, data.body.coord_y); // TODO : get coord from frontend
            // add ride and driver mapping, if we have the coordinates
            if(ride.coord_x && ride.coord_y) {
                tracker.addRideMapping(ride);
            }
            return ride;
        } catch (error) {
            throw {
                code : 409,
                status : error || "Rides not available. Try again later"
            }
        }
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
