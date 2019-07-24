
/*jshint multistr: true ,node: true*/
"use strict";

let envs = {};
let _ = require('lodash');
let base = require('./base.js');

module.exports = {
    /**
     * @returns {base}  
     */
    getEnvConfig() {
        let environment = process.env.NODE_ENV || 'base';
        environment = `./${environment}.js`;
        if(!envs[environment]) {
            // try to load it
            try {
                let config = require(environment);
                config = _.merge(_.cloneDeep(base), config);
                envs[environment] = config;
                console.log(environment + " environment is loaded");
            } catch (error) {
                console.log(environment + " environment is not supported");
            }
        }
        return envs[environment];
    }
}    
