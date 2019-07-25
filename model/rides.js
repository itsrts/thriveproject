
/*jshint multistr: true ,node: true*/
"use strict";

let BaseModel = require('./BaseModel');

class Rides extends BaseModel {

    constructor(opts) {
        super({
            tableName : 'rides'
        });
    }

    addNewRide(cust_id) {
        // check for the username and pwd match
        let query = `insert into ${this.tableName} (cust_id) values(${cust_id})`;
        return this.query(query);
    }
}

let object = null;
module.exports = {
    /**
     * @returns {Rides}  
     */
    getInstance(opts) {
        if(object === null) {
            object = new Rides(opts);
        }
        return object;
    }
};
