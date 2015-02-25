
var supercache = require('../lib');
var redis = require('articulate-server-sms-resources').conn.redis.getFresh();
var debug = require('debug')('supercache-test');

describe('testing supercache', function () {

  it('should return all supertest functions', function (done) {
    supercache(redis, 'test-cache')
      .get('http://testsms01.articulate.io')
      .end(function (response) {
        debug(arguments, response);
        done();
      });
  });

});
