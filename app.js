
/*jshint multistr: true ,node: true*/
"use strict";

require('./routes');
let config = require('./env').getEnvConfig();
require('api-ext').Server.getInstance().start(config.port);
