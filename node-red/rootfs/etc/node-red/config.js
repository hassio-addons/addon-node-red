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

// Set dark theme if enabled
if (options.dark_mode) {
    config.editorTheme.page = {
        css: '/opt/node_modules/node-red-contrib-theme-midnight-red/midnight.css',
        scripts: '/opt/node_modules/node-red-contrib-theme-midnight-red/theme-tomorrow.js',
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
config.credentialSecret = getSecret(options.credential_secret);

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
if (options.log_level) {
    config.logging.console.level = options.log_level.toLowerCase();
    if (config.logging.console.level === 'warning') {
        config.logging.console.level = 'warn';
    }
}

module.exports = config;
