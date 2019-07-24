
/*jshint multistr: true ,node: true*/
"use strict";

let DB  = require('./db');
let Q   = require('q');

class BaseModel {

    /**
     * 
     * @param {{tableName: string}} opts 
     */
    constructor(opts) {
        this.tableName = opts.tableName;
    }

    findById(id) {
        let defer = Q.defer();
        let query = `select * from ${this.tableName} where id = ${id}`;
        console.log("Executing query", query);
        DB.query(query, (err, result) => {
            if(err) {
                defer.reject(err);
            } else {
                defer.resolve(result[0]);
            }
        });
        return defer.promise;
    }

    query(query) {
        let defer = Q.defer();
        console.log("Executing query", query);
        DB.query(query, (err, result) => {
            if(err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }

}


module.exports = BaseModel;