
/*jshint multistr: true ,node: true*/
"use strict";

let rides = require('../model/rides').getInstance();


async function completeRide() {
    let query = `update rides set status="done" where status="active" and TIMESTAMPDIFF(MINUTE, updated_at, now()) > 5;`;
    await rides.query(query);
    // calling the function again in 5 minutes
    setTimeout(() => {
        completeRide();
    }, 5 * 60 * 1000);
}

completeRide();

