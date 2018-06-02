#!/usr/bin/with-contenv bash
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Adds warnings in case authentication has been disabled
# ==============================================================================
# shellcheck disable=SC1091
source /usr/lib/hassio-addons/base.sh

if ! hass.config.has_value 'users'; then
    hass.log.warning "No users configured and authentication has been disabled!"
    hass.log.warning "This is not recommended!!!"
fi
