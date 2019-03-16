#!/usr/bin/with-contenv bashio
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Ensures conflicting Node-RED packages are absent
# ==============================================================================
cd /config/node-red || bashio::exit.nok "Could not change directory to Node-RED"

if bashio::fs.file_exists "/config/node-red/package.json"; then
    npm uninstall \
        node-red-contrib-home-assistant \
        node-red-contrib-home-assistant-llat \
        node-red-contrib-home-assistant-ws \
            || bashio::exit.nok "Failed un-installing conflicting packages"
fi
