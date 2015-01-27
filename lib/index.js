var httpinvoke = require('httpinvoke'),
    debug = require('debug')('online-labs');

var Client = module.exports = function(config) {
  this.config = config;
};


(function() {
  this.get = function(path, options, cb) {
    var url = 'https://api.cloud.online.net/' + path.replace(/^\//, '');
    debug('GET ' + url);
    return httpinvoke(url, 'GET', options, cb);
  };
}).call(Client.prototype);
