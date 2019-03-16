#!/usr/bin/with-contenv bashio
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Ensures the configuration for the user exists
# ==============================================================================
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
