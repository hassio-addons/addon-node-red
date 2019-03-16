#!/usr/bin/with-contenv bashio
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# This files check if all user configuration requirements are met
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

# Check SSL settings
bashio::config.require.ssl
