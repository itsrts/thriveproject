
/*jshint multistr: true ,node: true*/
"use strict";

let BaseModel = require('./BaseModel');

class Users extends BaseModel {

    constructor(opts) {
        super({
            tableName : 'users'
        });
    }
}

let object = null;
module.exports = {
    /**
     * @returns {Users}  
     */
    getInstance(opts) {
        if(object === null) {
            object = new Users(opts);
        }
        return object;
    }
};
