# node-onlinelabs

[![Build Status (Travis)](https://travis-ci.org/moul/node-onlinelabs.svg?branch=master)](https://travis-ci.org/moul/node-onlinelabs)
[![Dependency Status](https://david-dm.org/moul/node-onlinelabs.svg?theme=shields.io)](https://david-dm.org/moul/node-onlinelabs)
[![Total views](https://sourcegraph.com/api/repos/github.com/moul/node-onlinelabs/counters/views.svg)](https://sourcegraph.com/github.com/moul/node-onlinelabs)
[![Views in the last 24 hours](https://sourcegraph.com/api/repos/github.com/moul/node-onlinelabs/counters/views-24h.svg)](https://sourcegraph.com/github.com/moul/node-onlinelabs)
[![Code Climate](https://codeclimate.com/github/moul/node-onlinelabs/badges/gpa.svg)](https://codeclimate.com/github/moul/node-onlinelabs)

[![NPM Badge](https://nodei.co/npm/onlinelabs.png)](https://npmjs.org/package/onlinelabs)

[Online Labs](https://labs.online.net/) API Node.js client.
It wraps the HTTP api library described [here](https://github.com/node-gitlab/gitlabhq/tree/master/doc/api).

Maintained by [Manfred Touron](https://github.com/moul)

---

Install
-------

    # Install from npm
    npm install onlinelabs

Examples
--------

Create a server with Node.js

```js
var Api = require('onlinelabs'),
    client = new Api({token: '<YOUR_TOKEN>'});

var data = {
  name: 'c1',
  organization: '<ORGANIZATION_ID>',
  image: '<IMAGE_ID>',
  tags: ['test', 'demo']
};

client.post('/servers', data, function(err, res) {
  console.log(res.server);
});
```

Create a server with Coffee-Script

```coffee
client = new require('onlinelabs')()

var data =
  name: 'c1'
  organization: '<ORGANIZATION_ID>'
  image: '<IMAGE_ID>'
  tags: ['test', 'demo']

client.post '/servers', data, (err, res) ->
  console.log res.server
```

See [./examples](https://github.com/moul/node-onlinelabs/tree/master/examples) directory for more examples

Documentation
-------------

Even if this SDK is designed to be developer-friendly and aim for self-service discovery, it is still recommended to read the official [API documentation](https://doc.cloud.online.net/api/).

Alternative SDKs
----------------

- Official Python SDK: [online-labs/ocs-sdk](https://github.com/online-labs/ocs-sdk)
- Cloudformation plugin, with API client in Node.js: [resin-io/onlinelabs-cloudformation](https://github.com/resin-io/onlinelabs-cloudformation)


License
-------

[MIT](https://github.com/moul/node-onlinelabs/blob/master/LICENSE.md)
