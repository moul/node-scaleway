#!/usr/bin/env node

"use strict";

var Client = require('..'),
    util = require('util'),
    argv = require('minimist')(process.argv.slice(2));
var client = new Client();


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


client.post('/servers', data).then(
  function(res) {
    console.log('Server created: ',
                util.inspect(res.body.server, {
                  showHidden: false, depth: null
                }));
  },
  function(err) {
    console.error(util.inspect(err, {showHidden: false, depth: null}));
  });
