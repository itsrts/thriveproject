
/*jshint multistr: true ,node: true*/
"use strict";

const ServerRequest = require('api-ext').ServerRequest;

let users = require('../../model/users').getInstance();

class UpdateCoord extends ServerRequest {

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
        return users.updateCoord(data.user.id, data.body.coord_x, data.body.coord_y);
    }

    makeResponse(data, result, request, response) {
        return {
            "message" : "Coordinates updated"
        };
    }
}

let object = null;
module.exports = {
    /**
     * @param opts {{method : string, route : string, schema : JSON, validator : Function}} config 
     * @returns {UpdateCoord}  
     */
    listen(opts) {
        if(object === null) {
            object = new UpdateCoord(opts);
        }
        return object;
    }
};
