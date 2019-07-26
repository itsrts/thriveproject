
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let rides = require('../model/rides').getInstance();

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
        let type = data.user.type;
        let id = data.user.id;
        let query = `select * from rides where cust_id=${id}`;
        if(type == "driver") {
            query = `select * from rides where driver_id is NULL or driver_id = ${id}`;
        }
        return rides.query(query);
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
