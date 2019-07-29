
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

    allRides(data) {
        let type = data.user.type;
        let id = data.user.id;
        let query = `select * from rides where cust_id=${id}`;
        if(type == "driver") {
            query = `select * from rides where driver_id is NULL or driver_id = ${id}`;
        }
        query+= ' order by updated_at desc';
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
                throw 'Request no longer available';
            }
            results = await connection.query(`select * from rides where driver_id=? and status='active'`, driver_id);
            if(results && results.length > 0) {
                throw 'Please complete your existing ride first';
            }
            results = await connection.query(`update rides set status='active', driver_id=? where id=?`, [driver_id, id]);
            await connection.commit();
            results = await this.findById(id);
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
