ARG BUILD_FROM=ghcr.io/hassio-addons/base:13.2.2
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Copy Node-RED package.json
COPY package.json /opt/
COPY node-red-dashboard-show-dashboard.patch /tmp/

# Set workdir
WORKDIR /opt

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache --virtual .build-dependencies \
        build-base=0.5-r3 \
        linux-headers=5.19.5-r0 \
        py3-pip=22.3.1-r1 \
        python3-dev=3.10.11-r0 \
    \
    && apk add --no-cache \
        git=2.38.4-r1 \
        icu-data-full=72.1-r1 \
        nginx=1.22.1-r0 \
        nodejs=18.14.2-r0 \
        npm=9.1.2-r0 \
        openssh-client=9.1_p1-r2 \
        patch=2.7.6-r9 \
    \
    && npm install \
        --no-audit \
        --no-fund \
        --no-update-notifier \
        --omit=dev \
        --unsafe-perm \
    && npm rebuild --build-from-source @serialport/bindings-cpp \
    \
    && npm cache clear --force \
    \
    && echo -e "StrictHostKeyChecking no" >> /etc/ssh/ssh_config \
    \
    && patch -d /opt/node_modules/node-red-dashboard -p1 \
             -i /tmp/node-red-dashboard-show-dashboard.patch \
    \
    && apk del --no-cache --purge .build-dependencies \
    && rm -fr \
        /etc/nginx \
        /root/.cache \
        /root/.npm \
        /root/.nrpmrc \
        /tmp/*

# Copy root filesystem
COPY rootfs /

# Health check
HEALTHCHECK --start-period=10m \
    CMD curl --fail http://127.0.0.1:46836 || exit 1

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_REF
ARG BUILD_REPOSITORY
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="${BUILD_NAME}" \
    io.hass.description="${BUILD_DESCRIPTION}" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Franck Nijhof <frenck@addons.community>" \
    org.opencontainers.image.title="${BUILD_NAME}" \
    org.opencontainers.image.description="${BUILD_DESCRIPTION}" \
    org.opencontainers.image.vendor="Home Assistant Community Add-ons" \
    org.opencontainers.image.authors="Franck Nijhof <frenck@addons.community>" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.url="https://addons.community" \
    org.opencontainers.image.source="https://github.com/${BUILD_REPOSITORY}" \
    org.opencontainers.image.documentation="https://github.com/${BUILD_REPOSITORY}/blob/main/README.md" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}
