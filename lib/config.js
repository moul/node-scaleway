var config = require('rc')('node_onlinelabs', {
  api_endpoint: 'https://api.cloud.online.net/',

  organization: null,
  token: null
});

// FIXME: data validation

module.exports = config;
