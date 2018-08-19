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
config.uiHost = '0.0.0.0';
config.debugUseColors = false;
config.flowFile = 'flows.json';
config.userDir = '/config/node-red/';
config.nodesDir = '/config/node-red/nodes';

// Several settings
config.uiPort = options.port;
config.credentialSecret = getSecret(options.credential_secret);

// Set SSL if enabled
if (options.ssl === true) {
    config.https = {
        key: fs.readFileSync(`/ssl/${getSecret(options.keyfile)}`),
        cert: fs.readFileSync(`/ssl/${getSecret(options.certfile)}`),
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
            username: getSecret(user.username),
            password: bcrypt.hashSync(getSecret(user.password)),
            permissions: getSecret(user.permissions),
        });
    });
}

// Secure HTTP node
if (options.http_node.username) {
    config.httpNodeAuth = {
        user: getSecret(http_node.username),
        pass: bcrypt.hashSync(getSecret(http_node.password)),
    };
}

// Secure static HTTP
if (options.http_static.username) {
    config.httpStaticAuth = {
        user: getSecret(http_static.username),
        pass: bcrypt.hashSync(getSecret(http_static.password)),
    }
}

// Set debug level
config.logging.console.level = options.log_level.toLowerCase();
if (config.logging.console.level === 'warning') {
    config.logging.console.level = 'warn';
}

module.exports = config;
