ARG BUILD_FROM=hassioaddons/base:7.2.0
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Copy Node-RED package.json
COPY package.json requirements.txt /opt/

# Set workdir
WORKDIR /opt

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache --virtual .build-dependencies \
        g++=9.2.0-r4 \
        gcc=9.2.0-r4 \
        libc-dev=0.7.2-r0 \
        linux-headers=4.19.36-r0 \
        make=4.2.1-r2 \
        py2-pip=18.1-r0 \
        python2-dev=2.7.18-r0 \
    \
    && apk add --no-cache \
        git=2.24.3-r0 \
        lua-resty-http=0.15-r0 \
        nginx-mod-http-lua=1.16.1-r6 \
        nginx=1.16.1-r6  \
        nodejs=12.15.0-r1 \
        npm=12.15.0-r1 \
        openssh-client=8.1_p1-r0 \
        patch=2.7.6-r6 \
        paxctl=0.9-r0 \
        python2=2.7.18-r0 \
    \
    && paxctl -cm "$(command -v node)" \
    \
    && npm config set unsafe-perm true \
    \
    && pip install --no-cache-dir -r /opt/requirements.txt \
    \
    && npm install \
        --no-audit \
        --no-optional \
        --no-update-notifier \
        --only=production \
        --unsafe-perm \
    \
    && npm cache clear --force \
    \
    && echo -e "StrictHostKeyChecking no" >> /etc/ssh/ssh_config \
    \
    && apk del --no-cache --purge .build-dependencies \
    && rm -fr \
        /tmp/* \
        /etc/nginx

# Copy root filesystem
COPY rootfs /

# Build arguments
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
    org.opencontainers.image.title="Node-RED" \
    org.opencontainers.image.description="Flow-based programming for the Internet of Things" \
    org.opencontainers.image.vendor="Home Assistant Community Add-ons" \
    org.opencontainers.image.authors="Franck Nijhof <frenck@addons.community>" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.url="https://addons.community" \
    org.opencontainers.image.source="https://github.com/hassio-addons/addon-node-red" \
    org.opencontainers.image.documentation="https://github.com/hassio-addons/addon-node-red/blob/master/README.md" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}
