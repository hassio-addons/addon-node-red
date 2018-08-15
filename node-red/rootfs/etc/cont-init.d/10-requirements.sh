#!/usr/bin/with-contenv bash
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# This files check if all user configuration requirements are met
# ==============================================================================
# shellcheck disable=SC1091
source /usr/lib/hassio-addons/base.sh

declare username

# Ensure the credential secret value is set
if ! hass.config.has_value 'credential_secret'; then
    hass.die 'Setting a credential_secret is REQUIRED!'
fi

# Require users and password authentication
if ! hass.config.has_value 'users' \
    && ! ( \
        hass.config.exists 'leave_front_door_open' \
        && hass.config.true 'leave_front_door_open' \
    );
then
    hass.die 'You need to configure at least one user!'
fi

# Check if configured users meet the requirements
for user in $(hass.config.get 'users|keys[]'); do
    username=$(hass.config.get "users[${user}].username")

    # Require http_node username / password
    if ! hass.config.has_value "users[${user}].username"; then
        hass.die 'You cannot add users without a username!'
    fi

    if ! hass.config.has_value "users[${user}].password"; then
        hass.die "User ${username} does not have a password!";
    fi

    # Require a secure password
    if hass.config.has_value "users[${user}].password" \
        && ! hass.config.is_safe_password "users[${user}].password"; then
        hass.die \
          "Please choose a different pass for ${username}, this one is unsafe!"
    fi
done

# Require http_node username / password
if ! hass.config.has_value 'http_node.username' \
    && ! ( \
        hass.config.exists 'leave_front_door_open' \
        && hass.config.true 'leave_front_door_open' \
    );
then
    hass.die 'You need to set a http_node username!'
fi
 if ! hass.config.has_value 'http_node.password' \
    && ! ( \
        hass.config.exists 'leave_front_door_open' \
        && hass.config.true 'leave_front_door_open' \
    );
then
    hass.die 'You need to set a http_node password!';
fi

 # Require a secure http_node password
if hass.config.has_value 'http_node.password' \
    && ! hass.config.is_safe_password 'http_node.password'; then
    hass.die "Please choose a different http_node password, this one is unsafe!"
fi

# Require http_static username / password
if ! hass.config.has_value 'http_static.username' \
    && ! ( \
        hass.config.exists 'leave_front_door_open' \
        && hass.config.true 'leave_front_door_open' \
    );
then
    hass.die 'You need to set a http_static username!'
fi
 if ! hass.config.has_value 'http_static.password' \
    && ! ( \
        hass.config.exists 'leave_front_door_open' \
        && hass.config.true 'leave_front_door_open' \
    );
then
    hass.die 'You need to set a http_static password!';
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
