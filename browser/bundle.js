(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config = require('rc')('node_onlinelabs', {
  api_endpoint: 'https://api.cloud.online.net/',

  organization: null,
  token: null
});

// FIXME: data validation

module.exports = config;

},{"rc":"rc"}],2:[function(require,module,exports){
var rp = require('request-promise'),
    debug = require('debug')('node-onlinelabs:lib'),
    config = require('./config'),
    _ = require('lodash');


var Client = module.exports = function(options) {
  this.config = _.defaults(options || {}, config);
};


(function() {
  var client;

  this.request = function(path, method, options, cb) {
    client = this;
    var url = client.config.api_endpoint + path.replace(/^\//, '');
    options = options || {};
    _.defaults(options, {
      method: method,
      url: url,
      headers: {},
      json: true,
      resolveWithFullResponse: true
    });
    _.defaults(options.headers, {
      'Accept': 'application/json',
      'User-Agent': 'node-onlinelabs'  // FIXME: append version dynamically
    });
    if (client.config.token) {
      _.defaults(options.headers, {
        'X-Auth-Token': client.config.token
      });
    }

    debug(method + ' ' + url, options);
    return rp(options).promise().nodeify(cb);
  };

  this.get = function(path, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    return this.request(path, 'GET', options, cb);
  };

  this.post = function(path, input, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    options = options || {};
    _.defaults(options, {
      inputType: 'json',
      headers: {},
      input: input
    });
    _.defaults(options.headers, {
      'Content-Type': 'application/json'
    });
    return this.request(path, 'POST', options, cb);
  };

  this.patch = function(path, input, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    options = options || {};
    _.defaults(options, {
      inputType: 'json',
      headers: {},
      input: input
    });
    _.defaults(options.headers, {
      'Content-Type': 'application/json'
    });
    return this.request(path, 'PATCH', options, cb);
  };

  this.put = function(path, input, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    options = options || {};
    _.defaults(options, {
      inputType: 'json',
      headers: {},
      input: input
    });
    _.defaults(options.headers, {
      'Content-Type': 'application/json'
    });
    return this.request(path, 'PUT', options, cb);
  };

  this.delete = function(path, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }
    return this.request(path, 'DELETE', options, cb);
  };

}).call(Client.prototype);

},{"./config":1,"debug":"debug","lodash":"lodash","request-promise":"request-promise"}]},{},[2])


//# sourceMappingURL=bundle.map.js