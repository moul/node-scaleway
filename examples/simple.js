var Api = require('onlinelabs'),
    client = new Api({token: '<YOUR_TOKEN>'});

var data = {
  name: 'c1',
  organization: '<ORGANIZATION_ID>',
  image: '<IMAGE_ID>',
  tags: ['test', 'demo']
};

client.post('/servers', data, function(err, res) {
  console.log(res.body.server);
});
