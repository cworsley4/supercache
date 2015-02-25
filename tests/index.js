
var redis = require('redis');
var supercache = require('../lib');
var redisClient = redis.createClient();
var should = require('should');
var debug = require('debug')('supercache-test');

var standard = function () {
  return supercache(redisClient, 'test-cache', 500)
    .get('http://www.google.com');
};

describe('testing supercache', function () {

  before(function (done) {
    redisClient.flushdb(done);
  });

  it('should get and set a response', function (done) {
    standard()
      .end(function (err, response, fromCache) {
        should.not.exist(err);
        (fromCache === undefined).should.be.true;
        done();
    });
  });

  it('should get reponse from cache', function (done) {
    standard()
      .end(function (err, response, fromCache) {
        should.not.exist(err);
        fromCache.should.be.true;
        done();
    });
  });

});
