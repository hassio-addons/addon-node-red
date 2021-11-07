ARG BUILD_FROM=ghcr.io/hassio-addons/base/amd64:10.2.0
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
        g++=10.3.1_git20210424-r2 \
        gcc=10.3.1_git20210424-r2 \
        libc-dev=0.7.2-r3 \
        linux-headers=5.10.41-r0 \
        make=4.3-r0 \
        py3-pip=20.3.4-r1 \
        python3-dev=3.9.5-r1 \
    \
    && apk add --no-cache \
        git=2.32.0-r0 \
        nginx=1.20.1-r3 \
        nodejs=14.18.1-r0 \
        npm=7.17.0-r0 \
        openssh-client=8.6_p1-r3 \
        patch=2.7.6-r7 \
        python3=3.9.5-r1 \
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
