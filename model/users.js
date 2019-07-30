
/*jshint multistr: true ,node: true*/
"use strict";

let BaseModel = require('./BaseModel');

class Users extends BaseModel {

    constructor(opts) {
        super({
            tableName : 'users'
        });
    }

    async register(user) {
        let query = `insert into users values (null, "${user.name}","${user.type}",md5("${user.password}"),"${user.username}",now(),now());`;
        return this.query(query);
    }

    async authenticate(username, pwd) {
        // check for the username and pwd match
        let query = `select * from users where username='${username}' and pwd=md5('${pwd}') limit 1`;
        let result = await this.query(query);
        if(result && result.length > 0) {
            let user = result[0];
            delete user.pwd;
            delete user.created_at;
            delete user.updated_at;
            return user;
        }
        throw 'Not Authorised';
    }

    async updateCoord(id, x, y) {
        let connection;
        try {
            connection = await this.getConnection();
            await connection.beginTransaction();
            let results = await connection.query(`select * from users where id=${id} for update`);
            if (!results || results.length === 0) {
                throw 'Not Found';
            }
            let query = `update users set coord_x=?, coord_y=? where id = ?`;
            await connection.query(query, [x, y, id]);
            await connection.commit();
        } catch (error) {
            console.log(error);
            if (connection) {
                connection.rollback();
            }
            throw error;
        }

    }

    allUsersWithCoord() {
        let query = `select * from users where type="driver" and coord_x is not null and coord_y is not null`;
        return this.query(query);
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
