#!/usr/bin/with-contenv bashio
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Install user configured/requested packages
# ==============================================================================
if bashio::config.has_value 'system_packages'; then
    apk update \
        || bashio::exit.nok 'Failed updating Alpine packages repository indexes'

    for package in $(bashio::config 'system_packages'); do
        apk add "$package" \
            || bashio::exit.nok "Failed installing system package ${package}"
    done
fi
