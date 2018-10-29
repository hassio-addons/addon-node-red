const config = require('/config/node-red/settings.js');
const fs = require('fs');
const options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
const bcrypt = require('bcryptjs');
const yaml = require('js-yaml');

/**
 * Gets a configuration option value by getting it from secrets.yaml
 *
 * @param {string} Value
 *   Configuration value to resolve
 *
 * @return
 *   Returns the converted configuration value
 */
function getSecret(value) {
    if(!value.startsWith('!secret ')) {
        // This is not a secret
        return value
    }

    secret = value.substring(8)

    if (!fs.existsSync('/config')) {
        console.log('This add-on does not support secrets!');
        process.exit(1);
        return false
    }
    if (!fs.existsSync('/config/secrets.yaml')) {
        console.log(`A secret ${secret} was requested, but could not find a secrets.yaml!`);
        process.exit(1);
        return false
    }

    secrets = yaml.load(fs.readFileSync('/config/secrets.yaml', 'utf8'));

    if (!(secret in secrets)) {
        console.log(`Secret ${secret} is not in the secrets.yaml file`);
        process.exit(1);
        return false
    }

    return secrets[secret];
}

// Sane and required defaults for the add-on
config.debugUseColors = false;
config.flowFile = 'flows.json';
config.nodesDir = '/config/node-red/nodes';
config.uiHost = '0.0.0.0';
config.userDir = '/config/node-red/';

// Several settings
config.credentialSecret = getSecret(options.credential_secret);
config.uiPort = options.port;

// Enable authentication
if (!options.leave_front_door_open) {
    config.adminAuth = require('/etc/node-red/ha-auth.js');
}

// Set SSL if enabled
if (options.ssl === true) {
    config.https = {
        key: fs.readFileSync(`/ssl/${getSecret(options.keyfile)}`),
        cert: fs.readFileSync(`/ssl/${getSecret(options.certfile)}`),
    };
    config.requireHttps = options.require_ssl;
}

// Secure HTTP node
if (options.http_node.username) {
    config.httpNodeAuth = {
        user: getSecret(options.http_node.username),
        pass: bcrypt.hashSync(getSecret(options.http_node.password)),
    };
}

// Secure static HTTP
if (options.http_static.username) {
    config.httpStaticAuth = {
        user: getSecret(options.http_static.username),
        pass: bcrypt.hashSync(getSecret(options.http_static.password)),
    }
}

// Set debug level
config.logging.console.level = options.log_level.toLowerCase();
if (config.logging.console.level === 'warning') {
    config.logging.console.level = 'warn';
}

module.exports = config;
