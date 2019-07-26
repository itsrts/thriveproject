
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

    async getConnection() {
        let connection = await DB.getConnection();
        return {
            beginTransaction: () => {
                let defer = Q.defer();
                connection.beginTransaction(function (err) {
                    return err ? defer.reject(err) : defer.resolve();
                });
                return defer.promise;
            },
            query: (query, values) => {
                let defer = Q.defer();
                connection.query(query, values, (err, results) => {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(results);
                    }
                });
                return defer.promise;
            },
            commit: () => {
                let defer = Q.defer();
                connection.commit(function (err) {
                    return err ? defer.reject(err) : defer.resolve();
                });
                return defer.promise;
            },
            rollback: () => {
                let defer = Q.defer();
                connection.rollback(function (err) {
                    return err ? defer.reject(err) : defer.resolve();
                });
                return defer.promise;
            }
        };
    }

    findById(id) {
        let defer = Q.defer();
        let query = `select * from ${this.tableName} where id = ${id}`;
        console.log("Executing query", query);
        DB.query(query, (err, result) => {
            if (err) {
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
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }

}


module.exports = BaseModel;