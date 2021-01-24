#!/usr/bin/with-contenv bashio
# ==============================================================================
# Home Assistant Community Add-on: Node-RED
# Executes user customizations on startup
# ==============================================================================

declare -a npmlist

# Install user configured/requested packages
if bashio::config.has_value 'system_packages'; then
    apk update \
        || bashio::exit.nok 'Failed updating Alpine packages repository indexes'

    for package in $(bashio::config 'system_packages'); do
        apk add "$package" \
            || bashio::exit.nok "Failed installing system package ${package}"
    done
fi

# Install user configured/requested packages
if bashio::config.has_value 'npm_packages'; then
    cd /opt || bashio::exit.nok "Could not change directory to Node-RED"

    bashio::log.info "Starting installation of custom NPM/Node-RED packages..."
    for package in $(bashio::config 'npm_packages'); do
        npmlist+=("$package")
    done

    npm install \
        --no-optional \
        --only=production \
        "${npmlist[@]}" \
           || bashio::exit.nok "Failed to install a specified npm package"
fi

# Executes user commands on startup
if bashio::config.has_value 'init_commands'; then
    while read -r cmd; do
        eval "${cmd}" \
            || bashio::exit.nok "Failed executing init command: ${cmd}"
    done <<< "$(bashio::config 'init_commands')"
fi
