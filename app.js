
/*jshint multistr: true ,node: true*/
"use strict";
let config = require('./env').getEnvConfig();

require('api-ext').Server.getInstance().app.use((req, res, next) => {
    if(!config.cors) {
        next();
        return;
    }
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,X-CSRF-TOKEN,Cache-Control');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    }
    next();
});


require('./routes');
require('./util/cron');
require('api-ext').Server.getInstance().start(config.port);
