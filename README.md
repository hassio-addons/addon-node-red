# Community Hass.io Add-ons: Node-RED

[![GitHub Release][releases-shield]][releases]
![Project Stage][project-stage-shield]
[![License][license-shield]](LICENSE.md)

[![GitLab CI][gitlabci-shield]][gitlabci]
![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

[![Bountysource][bountysource-shield]][bountysource]
[![Discord][discord-shield]][discord]
[![Community Forum][forum-shield]][forum]

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

Flow-based programming for the Internet of Things.

## About

Node-RED is a programming tool for wiring together hardware devices,
APIs and online services in new and interesting ways.

It provides a browser-based editor that makes it easy to wire together flows
using the wide range of nodes in the palette that can be deployed to its
runtime in a single click.

## Installation

The installation of this add-on is pretty straightforward and not different in
comparison to installing any other Hass.io add-on.

1. [Add our Hass.io add-ons repository][repository] to your Hass.io instance.
1. Install the "Node-RED" add-on.
1. Set a `credential_secret`, which is used to encrypt sensitive data.
1. Configure usernames & passwords.
1. If you have SSL, set the `ssl` option to true.
1. Start the "Node-RED" add-on.
1. Check the logs of "Node-RED" to see if everything went well.

Please read the rest of this document further instructions.

**NOTE**: Do not add this repository to Hass.io, please use:
`https://github.com/hassio-addons/repository`.

## Docker status

[![Docker Architecture][armhf-arch-shield]][armhf-dockerhub]
[![Docker Version][armhf-version-shield]][armhf-microbadger]
[![Docker Layers][armhf-layers-shield]][armhf-microbadger]
[![Docker Pulls][armhf-pulls-shield]][armhf-dockerhub]

[![Docker Architecture][aarch64-arch-shield]][aarch64-dockerhub]
[![Docker Version][aarch64-version-shield]][aarch64-microbadger]
[![Docker Layers][aarch64-layers-shield]][aarch64-microbadger]
[![Docker Pulls][aarch64-pulls-shield]][aarch64-dockerhub]

[![Docker Architecture][amd64-arch-shield]][amd64-dockerhub]
[![Docker Version][amd64-version-shield]][amd64-microbadger]
[![Docker Layers][amd64-layers-shield]][amd64-microbadger]
[![Docker Pulls][amd64-pulls-shield]][amd64-dockerhub]

[![Docker Architecture][i386-arch-shield]][i386-dockerhub]
[![Docker Version][i386-version-shield]][i386-microbadger]
[![Docker Layers][i386-layers-shield]][i386-microbadger]
[![Docker Pulls][i386-pulls-shield]][i386-dockerhub]

## Configuration

**Note**: _Remember to restart the add-on when the configuration is changed.

Example add-on configuration:

```json
{
  "log_level": "info",
  "credential_secret": "KJHhfdhiFRENCKfsdfdsDHFHDJS",
  "users": [
    {
      "username": "frenck",
      "password": "yeah... I don't think so",
      "permissions": "*"
    },
    {
      "username": "MarryPoppins",
      "password": "Supercalifragilisticexpialidocious",
      "permissions": "read"
    }
  ],
  "http_node": {
    "username": "MarryPoppins",
    "password": "Supercalifragilisticexpialidocious"
  },
  "http_static": {
    "username": "MarryPoppins",
    "password": "Supercalifragilisticexpialidocious"
  },
  "port": 1880,
  "ssl": true,
  "certfile": "fullchain.pem",
  "keyfile": "privkey.pem",
  "require_ssl": true,
  "system_packages": [
    "ffmpeg"
  ],
  "node_packages": [
    "node-red-admin"
  ],
  "init_commands": [
    "echo 'This is a test'",
    "echo 'So is this...'"
  ]
}
```

**Note**: _This is just an example, don't copy and past it! Create your own!_

### Option: `log_level`

The `log_level` option controls the level of log output by the addon and can
be changed to be more or less verbose, which might be useful when you are
dealing with an unknown issue. Possible values are:

- `trace`: Show every detail, like all called internal functions.
- `debug`: Shows detailed debug information.
- `info`: Normal (usually) interesting events.
- `warning`: Exceptional occurrences that are not errors.
- `error`:  Runtime errors that do not require immediate action.
- `fatal`: Something went terribly wrong. Add-on becomes unusable.

Please note that each level automatically includes log messages from a
more severe level, e.g., `debug` also shows `info` messages. By default,
the `log_level` is set to `info`, which is the recommended setting unless
you are troubleshooting.

### Option: `port`

The default port for Node-RED is `1880`, but sometimes you'd just like to
have it on another port, right? Remember, if you change to port,
be sure it is not in use by something else already!

### Option: `ssl`

Enables/Disables SSL (HTTPS) on the web interface.
Set it `true` to enable it, `false` otherwise.

### Option: `certfile`

The certificate file to use for SSL.

**Note**: _The file MUST be stored in `/ssl/`, which is the default for Hass.io_

### Option: `keyfile`

The private key file to use for SSL.

**Note**: _The file MUST be stored in `/ssl/`, which is the default for Hass.io_

### Option: `require_ssl`

This options can be used to cause insecure HTTP connections to be redirected
to HTTPS. This is recommended when you have SSL enabled.

### Option: `credential_secret`

Credentials are encrypted by Node-RED in storage, using secret key.
This option allows you to specify your secret key.

**Note**: _Once you set this property, do not change it - doing so will prevent
Node-RED from being able to decrypt your existing credentials and they will be
lost._

### Option: `users`

This option can be used to password protect the Node-RED editor and admin API.
Password protecting your setup is, of course, strongly recommended.

A user has the following properties:

- `username`
- `password`
- `permissions`

Permissions can be `*` or `read`. We are planning to support a more fine-grained
control over permissions in future releases of the add-on.

**Note**: _When there are no users configured, authentication will be
disabled completely. This is NOT recommended._

### Option: `http_node`

To password protect the node-defined HTTP endpoints (httpNodeRoot),
the following properties can be used:

- `username`
- `password`

**Note**: _Leaving the `username` field empty, will disable authentication._

### Option: `http_static`

To password protect the static content (httpStatic), the following
properties can be used:

- `username`
- `password`

**Note**: _Leaving the `username` field empty, will disable authentication._

### Option: `system_packages`

Allows you to specify additional [Alpine packages][alpine-packages] to be
installed to your Node-RED setup (e.g., `g++`. `make`, `ffmpeg`).

**Note**: _Adding many packages will result in a longer start-up time
for the add-on._

### Option: `node_packages`

Allows you to specify additional [NPM packages][npm-packages] or
[Node-RED nodes][node-red-nodes] to be installed to your Node-RED setup
(e.g., `node-red-dashboard`, `node-red-contrib-ccu`).

**Note**: _Adding many packages will result in a longer start-up time
for the add-on._

### Option: `init_commands`

Customize your Node-RED environment even more with the `init_commands` option.
Add one or more shell commands to the list, and they will be executed every
single time this add-on starts.

## Embedding into Home Assistant

It is possible to embed the Node-RED interface directly into
Home Assistant, allowing you to access it through the Home Assistant frontend.

Home Assistant provides the `panel_iframe` component, for these purposes.

Example configuration:

```yaml
panel_iframe:
  nodered:
    title: Node-RED
    icon: mdi:sitemap
    url: http://addres.to.your.hass.io:1880
```

## Changelog & Releases

This repository keeps a change log using [GitHub's releases][releases]
functionality. The format of the log is based on
[Keep a Changelog][keepchangelog].

Releases are based on [Semantic Versioning][semver], and use the format
of ``MAJOR.MINOR.PATCH``. In a nutshell, the version will be incremented
based on the following:

- ``MAJOR``: Incompatible or major changes.
- ``MINOR``: Backwards-compatible new features and enhancements.
- ``PATCH``: Backwards-compatible bugfixes and package updates.

## Support

Got questions?

You have several options to get them answered:

- The Home Assistant [Community Forum][forum], we have a
  [dedicated topic][forum] on that forum regarding this add-on.
- The Home Assistant [Discord Chat Server][discord] for general Home Assistant
  discussions and questions.
- Join the [Reddit subreddit][reddit] in [/r/homeassistant][reddit]

You could also [open an issue here][issue] GitHub.

## Contributing

This is an active open-source project. We are always open to people who want to
use the code or contribute to it.

We have set up a separate document containing our
[contribution guidelines](CONTRIBUTING.md).

Thank you for being involved! :heart_eyes:

## Authors & contributors

The original setup of this repository is by [Franck Nijhof][frenck].

For a full list of all authors and contributors,
check [the contributor's page][contributors].

## We have got some Hass.io add-ons for you

Want some more functionality to your Hass.io Home Assistant instance?

We have created multiple add-ons for Hass.io. For a full list, check out
our [GitHub Repository][repository].

## License

MIT License

Copyright (c) 2018 Franck Nijhof

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[aarch64-anchore-shield]: https://anchore.io/service/badges/image/e1fe7eff6060158fd4f39bb33fd9cf79cff0d6f15cbbbdb748288c14af47098c
[aarch64-anchore]: https://anchore.io/image/dockerhub/hassioaddons%2Fnode-red-aarch64%3Alatest
[aarch64-arch-shield]: https://img.shields.io/badge/architecture-aarch64-blue.svg
[aarch64-dockerhub]: https://hub.docker.com/r/hassioaddons/node-red-aarch64
[aarch64-layers-shield]: https://images.microbadger.com/badges/image/hassioaddons/node-red-aarch64.svg
[aarch64-microbadger]: https://microbadger.com/images/hassioaddons/node-red-aarch64
[aarch64-pulls-shield]: https://img.shields.io/docker/pulls/hassioaddons/node-red-aarch64.svg
[aarch64-version-shield]: https://images.microbadger.com/badges/version/hassioaddons/node-red-aarch64.svg
[amd64-anchore-shield]: https://anchore.io/service/badges/image/2b9a78e147678b80fc0e8c63537c669b803f605555d055fba8fe5bd01a5ea60c
[amd64-anchore]: https://anchore.io/image/dockerhub/hassioaddons%2Fnode-red-amd64%3Alatest
[amd64-arch-shield]: https://img.shields.io/badge/architecture-amd64-blue.svg
[amd64-dockerhub]: https://hub.docker.com/r/hassioaddons/node-red-amd64
[amd64-layers-shield]: https://images.microbadger.com/badges/image/hassioaddons/node-red-amd64.svg
[amd64-microbadger]: https://microbadger.com/images/hassioaddons/node-red-amd64
[amd64-pulls-shield]: https://img.shields.io/docker/pulls/hassioaddons/node-red-amd64.svg
[amd64-version-shield]: https://images.microbadger.com/badges/version/hassioaddons/node-red-amd64.svg
[armhf-anchore-shield]: https://anchore.io/service/badges/image/7a31261290489f95ff24e504a87b93d5d852f4f81b403a3de2f55db908e1e782
[armhf-anchore]: https://anchore.io/image/dockerhub/hassioaddons%2Fnode-red-armhf%3Alatest
[armhf-arch-shield]: https://img.shields.io/badge/architecture-armhf-blue.svg
[armhf-dockerhub]: https://hub.docker.com/r/hassioaddons/node-red-armhf
[armhf-layers-shield]: https://images.microbadger.com/badges/image/hassioaddons/node-red-armhf.svg
[armhf-microbadger]: https://microbadger.com/images/hassioaddons/node-red-armhf
[armhf-pulls-shield]: https://img.shields.io/docker/pulls/hassioaddons/node-red-armhf.svg
[armhf-version-shield]: https://images.microbadger.com/badges/version/hassioaddons/node-red-armhf.svg
[bountysource-shield]: https://img.shields.io/bountysource/team/hassio-addons/activity.svg
[bountysource]: https://www.bountysource.com/teams/hassio-addons/issues
[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg
[buymeacoffee]: https://www.buymeacoffee.com/frenck
[commits-shield]: https://img.shields.io/github/commit-activity/y/hassio-addons/addon-node-red.svg
[commits]: https://github.com/hassio-addons/addon-node-red/commits/master
[contributors]: https://github.com/hassio-addons/addon-node-red/graphs/contributors
[discord-shield]: https://img.shields.io/discord/330944238910963714.svg
[discord]: https://discord.gg/c5DvZ4e
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg
[forum]: https://community.home-assistant.io/?u=frenck
[frenck]: https://github.com/frenck
[gitlabci-shield]: https://gitlab.com/hassio-addons/addon-node-red/badges/master/pipeline.svg
[gitlabci]: https://gitlab.com/hassio-addons/addon-node-red/pipelines
[home-assistant]: https://home-assistant.io
[i386-anchore-shield]: https://anchore.io/service/badges/image/4f3282de1b844e95b246ad7271392feee3bff81abbdbdedc8357f306b705ae75
[i386-anchore]: https://anchore.io/image/dockerhub/hassioaddons%2Fnode-red-i386%3Alatest
[i386-arch-shield]: https://img.shields.io/badge/architecture-i386-blue.svg
[i386-dockerhub]: https://hub.docker.com/r/hassioaddons/node-red-i386
[i386-layers-shield]: https://images.microbadger.com/badges/image/hassioaddons/node-red-i386.svg
[i386-microbadger]: https://microbadger.com/images/hassioaddons/node-red-i386
[i386-pulls-shield]: https://img.shields.io/docker/pulls/hassioaddons/node-red-i386.svg
[i386-version-shield]: https://images.microbadger.com/badges/version/hassioaddons/node-red-i386.svg
[issue]: https://github.com/hassio-addons/addon-node-red/issues
[keepchangelog]: http://keepachangelog.com/en/1.0.0/
[license-shield]: https://img.shields.io/github/license/hassio-addons/addon-node-red.svg
[maintenance-shield]: https://img.shields.io/maintenance/yes/2018.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-experimental-yellow.svg
[reddit]: https://reddit.com/r/homeassistant
[releases-shield]: https://img.shields.io/github/release/hassio-addons/addon-node-red.svg
[releases]: https://github.com/hassio-addons/addon-node-red/releases
[repository]: https://github.com/hassio-addons/repository
[semver]: http://semver.org/spec/v2.0.0.htm
[alpine-packages]: https://pkgs.alpinelinux.org/packages
[npm-packages]: https://www.npmjs.com
[node-red-nodes]: https://flows.nodered.org/?type=node&num_pages=1
