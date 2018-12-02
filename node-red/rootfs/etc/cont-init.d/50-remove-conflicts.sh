#!/usr/bin/with-contenv bash
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Ensures conflicting Node-RED packages are absent
# ==============================================================================
# shellcheck disable=SC1091
source /usr/lib/hassio-addons/base.sh

cd /config/node-red || hass.die "Could not change directory to Node-RED"

if hass.file_exists "/config/node-red/package.json"; then
    npm uninstall \
        node-red-contrib-home-assistant \
        node-red-contrib-home-assistant-llat \
        node-red-contrib-home-assistant-ws \
            || hass.die "Failed un-installing conflicting packages"
fi
