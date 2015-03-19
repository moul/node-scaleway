#!/usr/bin/env node

"use strict";

var Client = require('..'),
    util = require('util'),
    argv = require('minimist')(process.argv.slice(2));
var client = new Client();


// Parsing arguments
var data = {
  organization: argv.organization || client.config.organization,
  name: argv.name || 'node-onlinelabs server'
};
if (argv.bootscript) {
  data.bootscript = argv.bootscript;
}
if (argv.image) {
  data.image = argv.image;
}
if (argv.snapshot) {
  data.volumes = {
    0: {
      base_snapshot: argv.snapshot,
      name: 'snapshot',
      volume_type: 'l_ssd',
      organization: argv.organization || client.config.organization
    }
  };
}
if (argv.tags) {
  data.tags = argv.tags;
}


// API interractions
console.log('Creating server...');
client.post('/servers', data).then(
  function(res) {
    console.log(
      'Server created: ',
      util.inspect(res.body.server, { showHidden: false, depth: null })
    );

    // Starting server
    if (argv.start) {
      console.log('Starting created server...');
      client.post(
        '/servers/' + res.body.server.id + '/action',
        { action: 'poweron' }
      ).then(
        function (res) {
          console.log('Server started');
          console.debug('res', res);
        },
        function (err) {
          console.error(
            'Cannot start server',
            util.inspect(err, {showHidden: false, depth: null})
          );
        });
    }

  },
  function(err) {
    console.error(
      'Cannot create server',
      util.inspect(err, {showHidden: false, depth: null})
    );
  });
