var config = require('rc')('node_scaleway', {
  api_endpoint: 'https://api.scaleway.com/',

  dry_run: false,

  organization: null,
  token: null
});
if (config['dry-run']) {
  config.dry_run = config['dry-run'];
}

// FIXME: data validation

module.exports = config;
