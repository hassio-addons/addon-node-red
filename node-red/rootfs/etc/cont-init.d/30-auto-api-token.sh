#!/usr/bin/with-contenv bash
# ==============================================================================
# Community Hass.io Add-ons: Node-RED
# Ensures the correct API key is in the Node-RED configuration
# ==============================================================================
# shellcheck disable=SC1091
source /usr/lib/hassio-addons/base.sh

readonly CONFIG_FILE="/config/node-red/flows.json"

declare TMP_FILE
declare url
declare key
declare base_query

base_query='.[] | select(.url=="http://hassio/homeassistant" and .type=="server")'

url=$(jq -r "${base_query} | .url" "${CONFIG_FILE}")
key=$(jq -r "${base_query} | .pass" "${CONFIG_FILE}")

if [[ "${url}" = "http://hassio/homeassistant"
    && "${key}" != "${HASSIO_TOKEN}"
]];
then
    TMP_FILE=$(mktemp)

    hass.log.info 'API token is incorrect in the Node-RED configuration, fixing...'

    jq "(${base_query}) = ((${base_query}) + {\"pass\": \"${HASSIO_TOKEN}\"})" "${CONFIG_FILE}" > "${TMP_FILE}" \
        || hass.die 'Failed to set Hass.io API token into the Node-RED config'

    mv "${TMP_FILE}" "${CONFIG_FILE}" \
        || hass.die 'Failed updating the Hass.io configuration'
fi
