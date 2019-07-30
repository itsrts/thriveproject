
/*jshint multistr: true ,node: true*/
"use strict";

let schemas = {};
module.exports = schemas;


schemas['POST_/ride'] = {
    $id: "POST_/ride", type: "object", properties: {
        headers: { type: "object" },
        body: { type: "object", properties: {
            coord_x : { type : "number" },
            coord_y : { type : "number" }
        } },
        queryparams: { type: "object" },
        pathparams: { type: "object" },
        cookies: { type: "object" },
        path: { type: "string" },
        host: { type: "string" },
        url: { type: "string" }
    },
    required: ["path", "host", "url"]
};


schemas['GET_/rides'] = {
    $id: "GET_/rides", type: "object", properties: {
        headers: { type: "object" },
        body: { type: "object" },
        queryparams: { type: "object" },
        pathparams: { type: "object" },
        cookies: { type: "object" },
        path: { type: "string" },
        host: { type: "string" },
        url: { type: "string" }
    },
    required: ["path", "host", "url"]
};
