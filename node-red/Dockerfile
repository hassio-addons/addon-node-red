ARG BUILD_FROM=hassioaddons/base:4.0.1
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
        g++=8.3.0-r0 \
        gcc=8.3.0-r0 \
        libc-dev=0.7.1-r0 \
        linux-headers=4.19.36-r0 \
        make=4.2.1-r2 \
        py2-pip=18.1-r0 \
        python2-dev=2.7.16-r1 \
    \
    && apk add --no-cache \
        git=2.22.0-r0 \
        lua-resty-http=0.13-r0 \
        nginx-mod-http-lua=1.16.0-r2 \
        nginx=1.16.0-r2 \
        nodejs=10.16.0-r0 \
        npm=10.16.0-r0 \
        openssh-client=8.0_p1-r0 \
        patch=2.7.6-r4 \
        paxctl=0.9-r0 \
        python2=2.7.16-r1 \
    \
    && paxctl -cm "$(command -v node)" \
    \
    && npm config set unsafe-perm true \
    \
    && npm install -g modclean@3.0.0-beta.1 \
    \
    && pip install --no-cache-dir -r /opt/requirements.txt \
    \
    && npm install \
        --no-optional \
        --only=production \
    \
    && modclean \
        --path /opt \
        --no-progress \
        --keep-empty \
        --run \
    \
    && npm uninstall -g modclean \
    && npm cache clear --force \
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
    org.label-schema.description="Flow-based programming for the Internet of Things." \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="Node-RED" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://community.home-assistant.io/t/community-hass-io-add-on-node-red/55023?u=frenck" \
    org.label-schema.usage="https://github.com/hassio-addons/addon-node-red/tree/master/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/hassio-addons/addon-node-red" \
    org.label-schema.vendor="Community Hass.io Add-ons"
