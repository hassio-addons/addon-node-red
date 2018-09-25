ARG BUILD_FROM=hassioaddons/base:2.3.0
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Copy Node-RED package.json
COPY package.json /opt/

# Set workdir
WORKDIR /opt

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache --virtual .build-dependencies \
        gcc=6.4.0-r8 \
        libc-dev=0.7.1-r0 \
        python2-dev=2.7.15-r1 \
        py2-pip=10.0.1-r0 \
    \
    && apk add --no-cache \
        git=2.18.0-r0 \
        nodejs=8.11.4-r0 \
        npm=8.11.4-r0 \
        paxctl=0.9-r0 \
        python2=2.7.15-r1 \
    \
    && pip install \
        RPi.GPIO==0.6.3 \
    \
    && paxctl -cm "$(command -v node)" \
    \
    && npm install \
        --no-optional \
        --only=production \
    \
    && npm cache clear --force \
    \
    && apk del --purge .build-dependencies

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
    org.label-schema.url="https://community.home-assistant.io/t/community-hass-io-add-on-node-red/55023?u=frenck" \
    org.label-schema.usage="https://github.com/hassio-addons/addon-node-red/tree/master/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/hassio-addons/addon-node-red" \
    org.label-schema.vendor="Community Hass.io Add-ons"
