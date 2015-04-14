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

    if (client.config.dry_run) {
      console.error('dry-run, should call "' + options.method
                    + ' ' + options.url + '", exiting...');
      process.exit(1);
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

  // Helpers
  /**
   * Create a Server.
   * You must have a root volume, it can be an image, or a volume.
   *
   * @param {Object} data
   *  - {String} name (optional) The name of the new server
   *  - {String} bootscript (optional) UUID of the bootscript to use
   *  - {Array} tags (optional) List of tags to add
   *  - {String} root_volume (optional) UUID of the volume to use for NBD0
   *  - {String} image (optional) UUID of the image to use for NBD0
   *  - {Array} volumes (optional) List of UUID to use for NBD1 -> NBD16
   * @param {Object} options Request options
   * @param {FUnction} fn Callback
   */
  this.createServer = function(data, options, fn) {
    var postData = {
      organization: data.organization || this.config.organization,
      name: data.name
    };
    if (data.image) {
      postData.image = data.image;
    }
    if (data.bootscript) {
      postData.bootscript = data.bootscript;
    }
    if (data.root_volume) {
      postData.volumes = postData.volumes || {};
      postData.volumes['0'] = data.root_volume;
    }
    if (data.volumes && data.volumes.length) {
      postData.volumes = postData.volumes || {};
      data.volumes.forEach(function(volume, idx) {
        postData.volumes[(idx + 1).toString()] = volume;
      });
    }
    if (data.env) {
      postData.tags = data.env;
    }

    return this.post('/servers', postData, options, fn);
  };

  /**
   * Create a Volume.
   *
   * @param {Object} data
   *  - {String} name (optional) The name of the new volume
   *  - {Integer} size The size of the new volume
   *  - {String} [l_ssd] volume_type The type of the new volume
   * @param {Object} options Request options
   * @param {FUnction} fn Callback
   */
  this.createVolume = function(data, options, fn) {
    var postData = {
      organization: data.organization || this.config.organization,
      name: data.name || data.size,
      size: parseInt(data.size),
      volume_type: data.volume_type || 'l_ssd'
    };
    return this.post('/volumes', postData, options, fn);
  };

}).call(Client.prototype);
