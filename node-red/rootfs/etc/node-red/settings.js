/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/**
 * PLEASE NOTE! IMPORTANT! READ!
 *
 * This is a modified version of the settings file. Some parts of the
 * settings are actually controlled by the Home Assistant add-on.
 *
 * Parts that are handled by it, are removed from this settings template.
 * The following configuration keys are controlled by the add-on and removed.
 *
 * - uiPort (port setting in the add-on log)
 * - uiHost (no need to manually configure this in the add-on)
 * - debugUseColors (disabled, won't work in the add-on)
 * - flowFile (fixed to flows.json)
 * - credentialSecret (credentials_secret in the add-on configuration)
 * - userDir (is set fixed to `/config/node-red`)
 * - nodesDir (is set fixed to `/config/node-red/nodes`)
 * - adminAuth (known as users in the add-on configuration)
 * - https (ssl settings in the add-on configuration)
 * - logging.console.level (log_level in the add-on configuration)
 * - httpNodeAuth (http_node settings in the add-on configuration)
 * - httpStaticAuth (http_static settings in the add-on configuration)
 * - requireHttps (require_ssl setting in the add-on configuration)
 * - httpNodeRoot (set fixed to `/endpoint` )
 *
 * If you like to change those settings, some are available via the add-on
 * settings/option in the Supervisor panel in Home Assistant.
 */

module.exports = {
  // Retry time in milliseconds for MQTT connections
  mqttReconnectTime: 15000,

  // Retry time in milliseconds for Serial port connections
  serialReconnectTime: 15000,

  // Retry time in milliseconds for TCP socket connections
  //socketReconnectTime: 10000,

  // Timeout in milliseconds for TCP server socket connections
  //  defaults to no timeout
  //socketTimeout: 120000,

  // Timeout in milliseconds for HTTP request connections
  //  defaults to 120 seconds
  //httpRequestTimeout: 120000,

  // The maximum length, in characters, of any message sent to the debug sidebar tab
  debugMaxLength: 1000,

  // The maximum number of messages nodes will buffer internally as part of their
  // operation. This applies across a range of nodes that operate on message sequences.
  //  defaults to no limit. A value of 0 also means no limit is applied.
  //nodeMaxMessageBufferLength: 0,

  // To disable the option for using local files for storing keys and certificates in the TLS configuration
  //  node, set this to true
  //tlsConfigDisableLocalFiles: true,

  // By default, the Node-RED UI is available at http://localhost:1880/
  // The following property can be used to specify a different root path.
  // If set to false, this is disabled.
  //httpAdminRoot: '/admin',

  // The following property can be used in place of 'httpAdminRoot' and 'httpNodeRoot',
  // to apply the same root to both parts.
  //httpRoot: '/red',

  // When httpAdminRoot is used to move the UI to a different root path, the
  // following property can be used to identify a directory of static content
  // that should be served at http://localhost:1880/.
  //httpStatic: '/home/nol/node-red-static/',

  // The maximum size of HTTP request that will be accepted by the runtime api.
  // Default: 5mb
  //apiMaxLength: '5mb',

  // If you installed the optional node-red-dashboard you can set it's path
  // relative to httpRoot
  //ui: { path: "ui" },

  // The following property can be used to disable the editor. The admin API
  // is not affected by this option. To disable both the editor and the admin
  // API, use either the httpRoot or httpAdminRoot properties
  //disableEditor: false,

  // The following property can be used to configure cross-origin resource sharing
  // in the HTTP nodes.
  // See https://github.com/troygoode/node-cors#configuration-options for
  // details on its contents. The following is a basic permissive set of options:
  //httpNodeCors: {
  //    origin: "*",
  //    methods: "GET,PUT,POST,DELETE"
  //},

  // If you need to set an http proxy please set an environment variable
  // called http_proxy (or HTTP_PROXY) outside of Node-RED in the operating system.
  // For example - http_proxy=http://myproxy.com:8080
  // (Setting it here will have no effect)
  // You may also specify no_proxy (or NO_PROXY) to supply a comma separated
  // list of domains to not proxy, eg - no_proxy=.acme.co,.acme.co.uk

  // The following property can be used to add a custom middleware function
  // in front of all http in nodes. This allows custom authentication to be
  // applied to all http in nodes, or any other sort of common request processing.
  //httpNodeMiddleware: function(req,res,next) {
  //    // Handle/reject the request, or pass it on to the http in node by calling next();
  //    // Optionally skip our rawBodyParser by setting this to true;
  //    //req.skipRawBodyParser = true;
  //    next();
  //},

  // The following property can be used to verify websocket connection attempts.
  // This allows, for example, the HTTP request headers to be checked to ensure
  // they include valid authentication information.
  //webSocketNodeVerifyClient: function(info) {
  //    // 'info' has three properties:
  //    //   - origin : the value in the Origin header
  //    //   - req : the HTTP request
  //    //   - secure : true if req.connection.authorized or req.connection.encrypted is set
  //    //
  //    // The function should return true if the connection should be accepted, false otherwise.
  //    //
  //    // Alternatively, if this function is defined to accept a second argument, callback,
  //    // it can be used to verify the client asynchronously.
  //    // The callback takes three arguments:
  //    //   - result : boolean, whether to accept the connection or not
  //    //   - code : if result is false, the HTTP error status to return
  //    //   - reason: if result is false, the HTTP reason string to return
  //},

  // Anything in this hash is globally available to all functions.
  // It is accessed as context.global.
  // eg:
  //    functionGlobalContext: { os:require('os') }
  // can be accessed in a function block as:
  //    context.global.os

  functionGlobalContext: {
    // os:require('os'),
    // jfive:require("johnny-five"),
    // j5board:require("johnny-five").Board({repl:false})
  },

  // The following property can be used to order the categories in the editor
  // palette. If a node's category is not in the list, the category will get
  // added to the end of the palette.
  // If not set, the following default order is used:
  paletteCategories: [
    "home_assistant",
    "subflows",
    "common",
    "function",
    "network",
    "sequence",
    "parser",
    "storage"
  ],

  // Configure the logging output
  logging: {
    // Only console logging is currently supported
    console: {
      // Whether or not to include metric events in the log output
      metrics: false,
      // Whether or not to include audit events in the log output
      audit: false
    }
  },

  // Customising the editor
  editorTheme: {
    projects: {
      // To enable the Projects feature, set this value to true
      enabled: false
    }
  }
};
