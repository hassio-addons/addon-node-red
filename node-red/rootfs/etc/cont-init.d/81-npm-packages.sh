#!/usr/bin/with-contenv bash
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Install user configured/requested packages
# ==============================================================================
# shellcheck disable=SC1091
source /usr/lib/hassio-addons/base.sh

if hass.config.has_value 'npm_packages'; then
    apk update \
        || hass.die 'Failed updating Alpine packages repository indexes'

    for package in $(hass.config.get 'npm_packages'); do
        npm install "$package" \
            || hass.die "Failed installing npm package ${package}"
    done
fi
