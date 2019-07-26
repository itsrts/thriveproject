"use strict";

let
    mysql = require('mysql'),
    Q = require('q'),
    config = require('../env').getEnvConfig();

var pool  = mysql.createPool({
    connectionLimit : config.sql.poolSize,
    host            : config.sql.host,
    user            : config.sql.user,
    password        : config.sql.password,
    database        : config.sql.database
});

module.exports = {
    query : pool.query.bind(pool),
    getConnection : () => {
        let defer = Q.defer();
        pool.getConnection((err, connection) => {
            if(err) {defer.reject(err);}
            else {defer.resolve(connection);}
        });
        return defer.promise;
    }
};
