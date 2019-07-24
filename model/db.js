"use strict";

let
    mysql = require('mysql'),
    config = require('../env').getEnvConfig();

let db = mysql.createConnection({
    host     : config.sql.host,
    user     : config.sql.user,
    password : config.sql.password,
    database : config.sql.database
});

db.connect();

module.exports = db;
