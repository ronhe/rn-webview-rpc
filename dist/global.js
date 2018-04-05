'use strict';

var _symbol = require('core-js/es6/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _set = require('core-js/es6/set');

var _set2 = _interopRequireDefault(_set);

var _weakSet = require('core-js/es6/weak-set');

var _weakSet2 = _interopRequireDefault(_weakSet);

var _proxy = require('proxy-polyfill/src/proxy');

var _proxy2 = _interopRequireDefault(_proxy);

var _messageChannelPolyfill = require('./message-channel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-extraneous-dependencies
// eslint-disable-line import/no-extraneous-dependencies
var globalPolyfill = function globalPolyfill(globalName, localVar) {
  if (typeof global[globalName] === 'undefined') {
    global[globalName] = localVar;
  }
}; // eslint-disable-line import/no-extraneous-dependencies
/* global global */

var polyfills = {
  Symbol: _symbol2.default,
  Set: _set2.default,
  WeakSet: _weakSet2.default,
  Proxy: (0, _proxy2.default)(),
  MessagePort: _messageChannelPolyfill.MessagePortPolyfill,
  MessageChannel: _messageChannelPolyfill.MessageChannelPolyfill
};

Object.keys(polyfills).forEach(function (p) {
  globalPolyfill(p, polyfills[p]);
});