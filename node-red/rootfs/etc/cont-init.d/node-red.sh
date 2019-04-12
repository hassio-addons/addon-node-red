#!/usr/bin/with-contenv bashio
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Configures Node-RED before running
# ==============================================================================

# Ensure the credential secret value is set
if bashio::config.is_empty 'credential_secret'; then
    bashio::log.fatal
    bashio::log.fatal 'Configuration of this add-on is incomplete.'
    bashio::log.fatal
    bashio::log.fatal 'Please be sure to set the "credential_secret" option.'
    bashio::log.fatal
    bashio::log.fatal 'The credential secret is an encryption token, much like'
    bashio::log.fatal 'a password, that is used by Node-RED for encrypting'
    bashio::log.fatal 'credentials you put into Node-RED.'
    bashio::log.fatal
    bashio::log.fatal 'Just like a password, a credential secret can be'
    bashio::log.fatal 'anything you like. Just be sure to store it somewhere'
    bashio::log.fatal 'safe for later, e.g., in case of a recovery.'
    bashio::log.fatal
    bashio::exit.nok
fi

 # Require a secure http_node password
if bashio::config.has_value 'http_node.password' \
    && ! bashio::config.true 'i_like_to_be_pwned'; then
    bashio::config.require.safe_password 'http_node.password'
fi

 # Require a secure http_static password
if bashio::config.has_value 'http_static.password' \
    && ! bashio::config.true 'i_like_to_be_pwned'; then
    bashio::config.require.safe_password 'http_static.password'
fi

# Ensure configuration exists
if ! bashio::fs.directory_exists '/config/node-red/'; then
    mkdir -p /config/node-red/nodes \
        || bashio::exit.nok "Failed to create node-red configuration directory"

    # Copy in template files
    cp /etc/node-red/flows.json /config/node-red/
    cp /etc/node-red/settings.js /config/node-red/

    # Create random flow id
    id=$(node -e "console.log((1+Math.random()*4294967295).toString(16));")
    sed -i "s/%%ID%%/${id}/" "/config/node-red/flows.json"

    # Set hass.io token on created flow file
    sed -i "s/%%TOKEN%%/${HASSIO_TOKEN}/" "/config/node-red/flows.json"
fi

# Ensures conflicting Node-RED packages are absent
cd /config/node-red || bashio::exit.nok "Could not change directory to Node-RED"
if bashio::fs.file_exists "/config/node-red/package.json"; then
    npm uninstall \
        node-red-contrib-home-assistant \
        node-red-contrib-home-assistant-llat \
        node-red-contrib-home-assistant-ws \
            || bashio::exit.nok "Failed un-installing conflicting packages"
fi
