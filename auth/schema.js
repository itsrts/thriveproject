
/*jshint multistr: true ,node: true*/
"use strict";

let schemas = {};
module.exports = schemas;


schemas['POST_/login'] = {
    $id: "POST_/login", type: "object", properties: {
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
