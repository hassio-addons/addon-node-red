'use strict';

var util = require('util');
var request = require('request');
var usersMap = new Map();

module.exports = {
    type: "credentials",
    users: function(username) {
        return new Promise(function(resolve) {
            resolve(usersMap.get(username) || null);
        });
    },
    authenticate: function(username, password) {
        return new Promise(function(resolve) {
            request
                .post(
                    'http://hassio/auth',
                    {
                        headers: {
                            'X-HASSIO-KEY': process.env.HASSIO_TOKEN
                        }
                    }
                )
                .auth(username, password, true)
                .on('error', function(err) {
                    util.log(`HA Auth - API error ${err}`);
                    resolve(null);
                })
                .on('response', function(res) {
                    if (res.statusCode != 200) {
                        util.log(`HA Auth - Failed to authenticate: ${username}`)
                        resolve(null);
                    } else {
                        let user = {
                            username: username,
                            permissions: "*"
                        }
                        util.log(`HA Auth - ${username} authenticated`);
                        usersMap.set(username, user);
                        resolve(user);
                    }
                });
        });
    },
    default: function() {
        return new Promise(function(resolve) {
            // HA doesn't have a default user
            resolve(null);
        });
    }
 }
