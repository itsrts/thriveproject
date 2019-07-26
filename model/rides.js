
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

    async updateRide(id, driver_id) {
        let connection;
        try {
            connection = await this.getConnection();
            await connection.beginTransaction();
            let results = await connection.query(`select * from rides where id=? for update`, id);
            if(!results || results.length == 0) {
                throw 'Not Available';
            }
            results = results[0];
            if(results.status != "pending") {
                throw 'Not Available';
            }
            results = await connection.query(`update rides set status='active', driver_id=? where id=?`, [driver_id, id]);
            await connection.commit();
            return results;
        } catch (error) {
            console.log(error);
            if(connection) {
                connection.rollback();
            }
            throw error;
        }
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
