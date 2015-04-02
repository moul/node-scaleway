(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = require('rc')('node_scaleway', {
  api_endpoint: 'https://api.scaleway.com/',

  organization: null,
  token: null
});

// FIXME: data validation

module.exports = config;

},{"rc":"rc"}],2:[function(require,module,exports){
var rp = require('request-promise'),
    debug = require('debug')('node-scaleway:lib'),
    config = require('./config'),
    _ = require('lodash');


var Client = module.exports = function(options) {
  this.config = _.defaults(options || {}, config);
};


(function() {
  var client;

  this.request = function(path, method, input, options, cb) {
    client = this;

    // options parameter is optional
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    options = options || {};

    var url = client.config.api_endpoint + path.replace(/^\//, '');

    // build options
    _.defaults(options, {
      method: method,
      url: url,
      headers: {},
      resolveWithFullResponse: true
    });
    // default headers
    _.defaults(options.headers, {
      'Accept': 'application/json',
      'User-Agent': 'node-scaleway'  // FIXME: append version dynamically
    });
    // token-based authentication
    if (client.config.token) {
      _.defaults(options.headers, {
        'X-Auth-Token': client.config.token
      });
    }
    // input is passed in the options object to rp, if input is empty
    // we need to use json:true to enable automatic response JSON parsing
    _.defaults(options, {
      json: input || true
    });

    debug(method + ' ' + url, options);

    // display response from server
    if (debug.enabled) {
      options.transform = function(data, response) {
        debug(response.statusCode, {
          headers: response.headers,
          body: data
        });
        return response;
      };
    }

    return rp(options).promise().nodeify(cb);
  };

  // HTTP verbs
  this.get = function(path, options, cb) {
    return this.request(path, 'GET', null, options, cb);
  };
  this.post = function(path, input, options, cb) {
    return this.request(path, 'POST', input, options, cb);
  };
  this.patch = function(path, input, options, cb) {
    return this.request(path, 'PATCH', input, options, cb);
  };
  this.put = function(path, input, options, cb) {
    return this.request(path, 'PUT', input, options, cb);
  };
  this.delete = function(path, options, cb) {
    return this.request(path, 'DELETE', null, options, cb);
  };

}).call(Client.prototype);

},{"./config":1,"debug":"debug","lodash":"lodash","request-promise":"request-promise"}]},{},[2])


//# sourceMappingURL=bundle.map.js