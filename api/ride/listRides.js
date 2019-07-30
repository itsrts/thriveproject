
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let tracker = require('../../util/locationTracker');
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

    async process(data, request, response) {
        let allRides = await rides.allRides(data);
        // check if the rides are accetable as per the location, if user is driver
        if(data.user.type == "driver") {
            allRides = allRides.filter(ride => {
                return tracker.isDriverMapped(ride.id, data.user.id);
            });
        }
        return allRides;
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
