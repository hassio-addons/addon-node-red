const config = require('/config/node-red/settings.js');
const fs = require('fs');
const options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
const bcrypt = require('bcryptjs');
const yaml = require('js-yaml');

/**
 * Checks if a configuration option exists in the config file and has an actual value
 *
 * @param {string} key
 *   Key of the config option
 *
 * @return
 *   true if the key is a valid option, false otherwise.
 */
function is_option(key) {
    if (!(key in options)) {
        console.log('Key is not in options.json');
        return false
    }
    if (!options[key]) {
        console.log('Value of key is empty')
        return false
    }
    return true
}

/**
 * Fetches a configuration value from the add-on config file
 *
 * @param {string} key
 *   Key of the config option
 * @return
 *   Value of the key in the configuration file
 */
function get_option(key) {
    if (! is_option(key)) {
        console.log('Key is not a valid option')
        return false
    }
    if (is_secret(key)) {
        return get_secret(key)
    }
    return options[key]
}

/**
 * Checks if a configuration option is refering to a secret
 *
 * @param {string} key
 *   Key of the config option
 *
 * @return
 *   true if the key is a secret, false otherwise.
 */
function is_secret(key) {
    if (!(key in options)) {
        console.log('Key is not in options.json');
        return false
    }
    value = options[key]

    if(value.startsWith('!secret ')) {
        console.log('Key is a secret');
        return true
    } else {
        console.log('Key is not a secret or empty');
        return false
    }
}

/**
 * Gets a configuration option value by getting it from secrets.yaml
 *
 * @param {string} key
 *   Key of the config option
 *
 * @return
 *   Value of the key in the referenced to the secrets file
 */
function get_secret(key) {
    if (!fs.existsSync('/config')) {
        console.log('This add-on does not support secrets!');
        return false
    }
    if (!fs.existsSync('/config/secrets.yaml')) {
        console.log('A secret was requested, but could not find a secrets.yaml!');
        return false
    }
    if (!is_secret(key)) {
        console.log('The requested secret does not reference the secrets.yaml');
        return false
    }

    secret = options[key].substring(8)
    secrets = yaml.load(fs.readFileSync('/config/secrets.yaml', 'utf8'));

    if (!(secret in secrets)) {
        console.log('Secret is not in the secrets.yaml file');
        return false
    }
    value = secrets[secret]

    if (!value) {
        console.log('Value of secret is empty')
        return false
    }
    console.log('Key is a secret')
    return value;
}

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
        key: fs.readFileSync(`/ssl/${options.keyfile}`),
        cert: fs.readFileSync(`/ssl/${options.certfile}`),
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
