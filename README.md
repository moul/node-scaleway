# node-scaleway

[![Build Status (Travis)](https://travis-ci.org/moul/node-scaleway.svg?branch=master)](https://travis-ci.org/moul/node-scaleway)
[![Dependency Status](https://david-dm.org/moul/node-scaleway.svg?theme=shields.io)](https://david-dm.org/moul/node-scaleway)
[![Total views](https://sourcegraph.com/api/repos/github.com/moul/node-scaleway/counters/views.svg)](https://sourcegraph.com/github.com/moul/node-scaleway)
[![Views in the last 24 hours](https://sourcegraph.com/api/repos/github.com/moul/node-scaleway/counters/views-24h.svg)](https://sourcegraph.com/github.com/moul/node-scaleway)
[![Code Climate](https://codeclimate.com/github/moul/node-scaleway/badges/gpa.svg)](https://codeclimate.com/github/moul/node-scaleway)

[![NPM Badge](https://nodei.co/npm/scaleway.png)](https://npmjs.org/package/scaleway)

[Scaleway](https://www.scaleway.com/) API Node.js client.
It wraps the HTTP api library described [here](https://github.com/node-gitlab/gitlabhq/tree/master/doc/api).

Maintained by [Manfred Touron](https://github.com/moul)

---

Install
-------

    # Install from npm
    npm install scaleway

Examples
--------

Create a server with Node.js

```js
var Api = require('scaleway'),
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
client = new require('scaleway')()

var data =
  name: 'c1'
  organization: '<ORGANIZATION_ID>'
  image: '<IMAGE_ID>'
  tags: ['test', 'demo']

client.post '/servers', data, (err, res) ->
  console.log res.server
```

See [./examples](https://github.com/moul/node-scaleway/tree/master/examples) directory for more examples

Documentation
-------------

Even if this SDK is designed to be developer-friendly and aim for self-service discovery, it is still recommended to read the official [API documentation](https://developer.scaleway.com).

Alternative SDKs
----------------

- Official Python SDK: [scaleway/python-scaleway](https://github.com/scaleway/python-scaleway)
- Cloudformation plugin, with API client in Node.js: [resin-io/scaleway-cloudformation](https://github.com/resin-io/scaleway-cloudformation)


License
-------

[MIT](https://github.com/moul/node-scaleway/blob/master/LICENSE.md)
