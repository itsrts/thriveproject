
/*jshint multistr: true ,node: true*/
"use strict";

let schemas = {};
module.exports = schemas;


schemas['POST_/login'] = {
    $id: "POST_/login", type: "object", properties: {
        headers: { type: "object" },
        body: { type: "object", properties: {
            username : { type : "string" },
            password : { type : "string" },
        }, required: ["username", "password"] },
        queryparams: { type: "object" },
        pathparams: { type: "object" },
        cookies: { type: "object" },
        path: { type: "string" },
        host: { type: "string" },
        url: { type: "string" }
    },
    required: ["path", "host", "url", "body"]
};


schemas['GET_/me'] = {
    $id: "GET_/me", type: "object", properties: {
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


schemas['POST_/register'] = {
    $id: "POST_/register", type: "object", properties: {
        headers: { type: "object" },
        body: { type: "object", properties: {
            name : { type : "string" },
            type : { type : "string", enum : ["driver", "client"] },
            username : { type : "string" },
            password : { type : "string" },
        }, required: ["name", "type", "username", "password"] },
        queryparams: { type: "object" },
        pathparams: { type: "object" },
        cookies: { type: "object" },
        path: { type: "string" },
        host: { type: "string" },
        url: { type: "string" }
    },
    required: ["path", "host", "url", "body"]
};


schemas['POST_/user/coord'] = {
    $id: "POST_/user/coord", type: "object", properties: {
        headers: { type: "object" },
        body: { type: "object", properties: {
            coord_x : { type : "number" },
            coord_y : { type : "number" },
        }, required: ["coord_x", "coord_y"] },
        queryparams: { type: "object" },
        pathparams: { type: "object" },
        cookies: { type: "object" },
        path: { type: "string" },
        host: { type: "string" },
        url: { type: "string" }
    },
    required: ["path", "host", "url"]
};
