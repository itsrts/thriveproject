
/*jshint multistr: true ,node: true*/
"use strict";

let config = require('../env').getEnvConfig();

// a 2d array of coordinates with array of users
// we do a BFS on the array to find the nearest drivers/users
let coord = [], max_y = 0;

// a map to store the drivers applicable for a ride
// ride_id : [list of drivers]
let ridesMapping = {};

/**
 * 
 * @param {{id:Number, coord_x:Number, coord_y:Number}} user 
 */
function addUserCoord(user, x, y) {
    // TODO : remove old location
    let _x = user.coord_x;
    let _y = user.coord_y;
    
    // avoid null
    if(coord[x] == undefined) {
        coord[x] = [];
    }
    if(coord[x][y] == undefined) {
        coord[x][y] = [];
    }
    // add user
    coord[x][y].push(user);
    max_y = Math.max(max_y, y);
}

/**
 * 
 * @returns {Array} users list of users nearby
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} max 
 */
function findNearest(id, x, y, max) {
    let users = [];
    let dp = {};
    let q = []; // push, pop=shift

    function addToQueue(x, y) {
        let arr = [];
        arr.push([x-1, y-1]);
        arr.push([x-1, y]);
        arr.push([x-1, y+1]);

        arr.push([x, y-1]);
        arr.push([x, y+1]);

        arr.push([x+1, y-1]);
        arr.push([x+1, y]);
        arr.push([x+1, y+1]);

        // adding possibilities
        arr.forEach(c => {
            let x = c[0];
            let y = c[1];
            let key = `${x}+${y}`;
            if(!dp[key] && x >=0 && x<coord.length && y>=0 && y<=max_y) {
                q.push([x, y]);
                dp[key] = 1;
            }
        });
    }

    q.push([x, y]);

    while(q.length > 0) {
        let c = q.shift();
        // check the coordinates
        let x = c[0], y = c[1];
        if(coord[x] && coord[x][y]) {
            let array = coord[x][y];
            // if array is not empty in the coordinates
            if(array && array.length > 0) {
                // check all the users at the coordinates
                for (let index = 0; index < array.length; index++) {
                    const user = array[index];
                    // if user not himself
                    if(user.id !== id) {
                        console.log(x, y);
                        users.push(user);
                        if(users.length == max) {
                            return users;
                        }
                    }
                }
            }
        }
        addToQueue(x, y);
    }

    return users;
}

function addRideMapping(ride) {
    let drivers = findNearest(ride.cust_id, ride.coord_x, ride.coord_y, config.max_drivers);
    drivers = drivers.map(driver => {
        return driver.id;
    });
    if(drivers.length > 0) {
        ridesMapping[ride.id] = drivers;
    }
    console.log(JSON.stringify(ridesMapping));
}

function isDriverMapped(ride_id, driver_id) {
    return ridesMapping[ride_id] ? ridesMapping[ride_id].indexOf(driver_id)>=0 : true;
}

module.exports = {
    addUserCoord,
    findNearest,
    coord,
    addRideMapping,
    isDriverMapped
}