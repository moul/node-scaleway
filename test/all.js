"use strict";

var _ = require('lodash'),
    chai = require('chai'),
    debug = require('debug')('tests'),
    Client = require('..'),
    should = chai.should();


var inspect = function(name, obj) {
  debug(name, util.inspect(obj, {showHidden: false, depth: null}));
};


suite("[client]", function() {
  var client;

  setup(function() {
    var options = {};
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
            // (res.body....).should.equal(0);
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

    test("should fetch the servers list", function(done) {
      client.get("/servers").then(
        function(res) {
          inspect('res', res);
          try {
            // (res.body....).should.equal(0);
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
  });
});
