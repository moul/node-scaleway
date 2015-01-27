var httpinvoke = require('httpinvoke'),
    debug = require('debug')('node-onlinelabs:lib'),
    config = require('./config');


var Client = module.exports = function(config) {
  this.config = config;
};


(function() {
  this.get = function(path, options, cb) {
    var url = config.api_endpoint + path.replace(/^\//, '');
    options = options ? options : {};
    options.headers = options.headers ? options.headers : {};
    options.headers['X-Auth-Token'] = config.secret_token;
    options.headers['Accept'] = 'application/json';
    debug('GET ' + url, options);
    return httpinvoke(url, 'GET', options, cb);
  };
}).call(Client.prototype);
