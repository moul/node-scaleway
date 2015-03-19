"use strict";

var chai = require('chai'),
    debug = require('debug')('tests'),
    Client = require('..'),
    util = require('util');


// Initialize chai.should()
chai.should();


var inspect = function(name, obj) {
  debug(name, util.inspect(obj, {showHidden: false, depth: null}));
};


suite('#config', function() {
  test('should have a minimal configuration', function() {
    var client = new Client();
    inspect(client.config);
    client.config.should.have.property('api_endpoint');
    client.config.should.have.property('organization');
    client.config.should.have.property('token');
  });
  test('should have an url for api_endpoint', function() {
    var client = new Client();
    client.config.api_endpoint.should.contains('http');
    client.config.api_endpoint.should.contains('://');
  });
});


suite("[client]", function() {
  var client;

  setup(function() {
    var options = {
      token: null
    };
    client = new Client(options);
  });

  teardown(function() {
    client = null;
  });

  suite("#get", function() {
    test("should successfully execute GET /", function(done) {
      this.timeout(5000);
      client.get("/").then(
        function(res) {
          inspect('res', res);
          try {
            (res.statusCode).should.equal(200);
            (res.headers['content-type']).should.equal('application/json');
            (res.body.api).should.equal('api-compute');
            done();
          } catch (e) {
            done(e);
          }
        },
        function(err) {
          inspect('err', err);
          done(err);
        });
    });

    test("should raise an authentication error", function(done) {
      client.get("/servers").then(
        function(res) {
          inspect('res', res);
          done(res);
        },
        function(err) {
          inspect('err', err);
          try {
            (err.statusCode).should.equal(401);
            (err.headers['content-type']).should.equal('application/json');
            (err.output.type).should.equal('invalid_auth');
            done();
          } catch (e) {
            done(e);
          }
        });
    });
  });
});
