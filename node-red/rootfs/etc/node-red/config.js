const config = require('/config/node-red/settings.js');
const fs = require('fs');
const options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
const bcrypt = require('bcryptjs');

// Set dark theme if enabled
if (options.dark_mode) {
    config.editorTheme.page = {
        css: '/opt/node_modules/@node-red-contrib-themes/midnight-red/theme.css',
    };
}

// Sane and required defaults for the add-on
config.debugUseColors = false;
config.flowFile = 'flows.json';
config.nodesDir = '/config/node-red/nodes';
config.uiHost = '127.0.0.1';
config.uiPort = 46836;
config.userDir = '/config/node-red/';

//Set path for HTTP_Nodes to be served from avoiding lua auth
config.httpNodeRoot = '/endpoint';

// Disable authentication, let HA handle that
config.adminAuth = null;

// Disable SSL, since the add-on handles that
config.https = null;

// Several settings
config.credentialSecret = options.credential_secret;

// Secure HTTP node
if (options.http_node.username) {
    config.httpNodeAuth = {
        user: options.http_node.username,
        pass: bcrypt.hashSync(options.http_node.password),
    };
}

// Secure static HTTP
if (options.http_static.username) {
    config.httpStaticAuth = {
        user: options.http_static.username,
        pass: bcrypt.hashSync(options.http_static.password),
    }
}

// Set debug level
if (options.log_level) {
    config.logging.console.level = options.log_level.toLowerCase();
    if (config.logging.console.level === 'warning') {
        config.logging.console.level = 'warn';
    }
}

module.exports = config;
