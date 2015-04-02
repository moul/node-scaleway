var config = require('rc')('node_scaleway', {
  api_endpoint: 'https://api.scaleway.com/',

  organization: null,
  token: null
});

// FIXME: data validation

module.exports = config;
