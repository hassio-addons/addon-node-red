#!/usr/bin/with-contenv bash
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# This files check if all user configuration requirements are met
# ==============================================================================
# shellcheck disable=SC1091
source /usr/lib/hassio-addons/base.sh

# Ensure the credential secret value is set
if ! hass.config.has_value 'credential_secret'; then
    hass.die 'Setting a credential_secret is REQUIRED!'
fi

 # Require a secure http_node password
if hass.config.has_value 'http_node.password' \
    && ! hass.config.is_safe_password 'http_node.password'; then
    hass.die "Please choose a different http_node password, this one is unsafe!"
fi

 # Require a secure http_static password
if hass.config.has_value 'http_static.password' \
    && ! hass.config.is_safe_password 'http_static.password'; then
    hass.die "Please choose a different http_static password, this one is unsafe!"
fi

# Check SSL requirements, if enabled
if hass.config.true 'ssl'; then
    if ! hass.config.has_value 'certfile'; then
        hass.die 'SSL is enabled, but no certfile was specified'
    fi

    if ! hass.config.has_value 'keyfile'; then
        hass.die 'SSL is enabled, but no keyfile was specified'
    fi

    if ! hass.file_exists "/ssl/$(hass.config.get 'certfile')"; then
        hass.die 'The configured certfile is not found'
    fi

    if ! hass.file_exists "/ssl/$(hass.config.get 'keyfile')"; then
        hass.die 'The configured keyfile is not found'
    fi
fi
