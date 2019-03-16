#!/usr/bin/with-contenv bashio
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Install user configured/requested packages
# ==============================================================================
if bashio::config.has_value 'npm_packages'; then
    cd /opt || bashio::exit.nok "Could not change directory to Node-RED"

    bashio::log.info "Starting installation of custom NPM/Node-RED packages..."
    for package in $(bashio::config 'npm_packages'); do
        npm install \
            --no-optional \
            --only=production \
            "$package" \
                || bashio::exit.nok "Failed installing npm package ${package}"
    done
fi
