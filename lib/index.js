
var util = require('util');
var redis = require('redis');
var noop = require('node-noop').noop;
var redisClient = redis.createClient();
var superagent = require('superagent');
var debug = require('debug')('supercache');

var end = superagent.Request.prototype.end;

var supercache = function (redis, key) {
  var self = {
    end: end
  };

  superagent.Request.prototype.end = function (callback) {
    var self = this;
    redis.get(key, function (err, result) {
      debug('checking for redis cashy');
      
      if (!err && result) {
        debug('Got results', result);
        callback(err, result, true);
        return;
      }

      end.call(self, function (err, result) {
        redis.set(key, result);
        callback(err, result);
      });
    });
  }; 

  return superagent;
};

module.exports = supercache;