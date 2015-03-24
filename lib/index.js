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
