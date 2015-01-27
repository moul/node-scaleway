"use strict";

var assert = require("assert"),
    debug = require("debug")("tests"),
    Client = require("..");

describe("[client]", function() {
  var client;

  beforeEach(function() {
    client = new Client();
  });

  it("should successfully execute GET /", function(next) {
    client.get("/")
      .then(function(res) {
        debug('res', res);
        next();
      }, function(err) {
        debug('err', err);
        assert();
      });
  });

  /*
  it("should fetch the servers list", function(next) {
    client.get("/servers")
      .then(function(res) {
        debug('res', res);
        next();
      }, function(err) {
        debug('err', err);
      }, function(progress) {
      });
  });
   */
});
