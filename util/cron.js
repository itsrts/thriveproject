
/*jshint multistr: true ,node: true*/
"use strict";

let rides = require('../model/rides').getInstance();
let users = require('../model/users').getInstance();

let tracker = require('../util/locationTracker');

async function completeRide() {
    await rides.updateRidesForDone();
    console.log("rides updated as done");
    // calling the function again in 5 minutes
    setTimeout(() => {
        completeRide();
    }, 5 * 60 * 1000);
}

async function loadLocations() {
    let results = await users.allUsersWithCoord();
    results.forEach(user => {
        tracker.addUserCoord(user, user.coord_x, user.coord_y);
    });
    console.log("locations loaded");
    results = await rides.allRidesWithCoord();
    results.forEach(ride => {
        tracker.addRideMapping(ride);
    });
}

completeRide();
loadLocations();