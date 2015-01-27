"use strict";

var assert = require("assert"),
    debug = require("debug")("tests"),
    Client = require("..");

describe("[client]", function() {
  var client;
  var token = "dummy-token";

  beforeEach(function() {
    client = new Client();
    // client.authenticate({
    //   type: "oauth",
    //   token: token
    // });
  });

  it("should successfully execute GET /", function(next) {
    client.get("/servers")
      .then(function(res) {
        debug('res', res);
        next();
      }, function(err) {
        debug('err', err);
        assert();
      });
  });
});
