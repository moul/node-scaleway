var config = require('rc')('node-onlinelabs', {
  api_endpoint: 'https://api.cloud.online.net/',

  access_key: null,
  secret_token: null
});

// FIXME: data validation

module.exports = config;
