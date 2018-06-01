const config = require('/config/node-red/settings.js');
const fs = require('fs');
const options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
const bcrypt = require('bcryptjs');

// Sane and required defaults for the add-on
config.uiHost = '0.0.0.0';
config.debugUseColors = false;
config.flowFile = 'flows.json';
config.userDir = '/config/node-red/';
config.nodesDir = '/config/node-red/nodes';

// Several settings
config.uiPort = options.port;
config.credentialSecret = options.credential_secret;

// Set SSL if enabled
if (options.ssl === true) {
    config.https = {
        key: `/ssl/${options.keyfile}`,
        cert: `/ssl/${options.certfile}`,
    };
    config.requireHttps = options.require_ssl;
}

// Create admin users
if (options.users.length !== 0) {
    config.adminAuth = {
        type: "credentials",
        users: [],
    };

    options.users.forEach((user, index) => {
        config.adminAuth.users.push({
            username: user.username,
            password: bcrypt.hashSync(user.password),
            permissions: user.permissions,
        });
    });
}

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
config.logging.console.level = options.log_level.toLowerCase();
if (config.logging.console.level === 'warning') {
    config.logging.console.level = 'warn';
}

module.exports = config;
