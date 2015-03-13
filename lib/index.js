var httpinvoke = require('httpinvoke'),
    debug = require('debug')('node-onlinelabs:lib'),
    config = require('./config'),
    _ = require('lodash');


var Client = module.exports = function(options) {
  this.config = _.defaults(options, config);
};


(function() {
  var client;

  this.request = function(path, method, options, cb) {
    var url = config.api_endpoint + path.replace(/^\//, '');
    options = options || {};
    _.defaults(options, {
      partialOutputMode: 'joined',
      converters: {
        //'text json': JSON.parse,
        //'json text': JSON.stringify
      },
      headers: {},
      outputType: 'json'
    });
    _.defaults(options.headers, {
      'X-Auth-Token': config.secret_token,
      'Accept': 'application/json'
    });
    debug(method + ' ' + url, options);
    return httpinvoke(url, method, options, cb);
  };

  this.get = function(path, options, cb) {
    return this.request(path, 'GET', options, cb);
  };
}).call(Client.prototype);
