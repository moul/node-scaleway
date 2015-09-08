var RawClient = require('./client'),
    _ = require('lodash');


var Client = module.exports = function(options) {
  var client = new RawClient(options);
  var rc = require('./config');
  client.setConfig(rc);
  return client;
};
