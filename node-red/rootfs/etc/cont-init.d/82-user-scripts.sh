#!/usr/bin/with-contenv bash
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Executes user configured/requested commands on startup
# ==============================================================================
# shellcheck disable=SC1091
source /usr/lib/hassio-addons/base.sh

if hass.config.has_value 'init_commands'; then
    while read -r cmd; do
        eval "${cmd}" \
            || hass.die "Failed executing init command: ${cmd}"
    done <<< "$(hass.config.get 'init_commands')"
fi
