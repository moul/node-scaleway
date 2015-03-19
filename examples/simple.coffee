client = new require('onlinelabs')()

var data =
  name: 'c1'
  organization: '<ORGANIZATION_ID>'
  image: '<IMAGE_ID>'
  tags: ['test', 'demo']

client.post '/servers', data, (err, res) ->
  console.log res.server
