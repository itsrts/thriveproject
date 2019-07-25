
/*jshint multistr: true ,node: true*/
"use strict";

let BaseModel = require('./BaseModel');

class Users extends BaseModel {

    constructor(opts) {
        super({
            tableName : 'users'
        });
    }

    async authenticate(username, pwd) {
        // check for the username and pwd match
        let query = `select * from users where username='${username}' and pwd=md5('${pwd}') limit 1`;
        let result = await this.query(query);
        if(result && result.length > 0) {
            let user = result[0];
            delete user.pwd;
            return user;
        }
        throw 'Not Authorised';
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
