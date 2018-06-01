ARG BUILD_FROM=hassioaddons/base-amd64:1.4.1
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Copy Node-RED package.json
COPY package.json /opt/

# Set workdir
WORKDIR /opt

# Setup base
RUN \
    apk add --no-cache \
        git=2.15.2-r0 \
        nodejs=8.9.3-r1 \
        nodejs-npm=8.9.3-r1 \
    \
    && npm install \
        --no-optional \
        --only=production \
    \
    && npm cache clear --force

# Copy root filesystem
COPY rootfs /

# Build arugments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="Node-RED" \
    io.hass.description="Flow-based programming for the Internet of Things" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Franck Nijhof <frenck@addons.community>" \
    org.label-schema.description="Flow-based programming for the Internet of Things." \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="Node-RED" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://community.home-assistant.io/?u=frenck" \
    org.label-schema.usage="https://github.com/hassio-addons/addon-node-red/tree/master/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/hassio-addons/addon-node-red" \
    org.label-schema.vendor="Community Hass.io Add-ons"
