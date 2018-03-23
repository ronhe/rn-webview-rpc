'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _comlinkjs = require('comlinkjs');

var _messagechanneladapter = require('comlinkjs/messagechanneladapter.es6');

require('./message-channel-polyfill');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebViewEndpoint = function () {
  function WebViewEndpoint() {
    _classCallCheck(this, WebViewEndpoint);

    this.listeners = [];
    this.webView = null;
  }

  _createClass(WebViewEndpoint, [{
    key: 'send',
    value: function send(data) {
      if (this.webView === null) {
        throw Error('webView has not been initialized yet.');
      }
      console.log('Sending message ' + data);
      return this.webView.postMessage(data);
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(type, listener) {
      if (type !== 'message') {
        throw Error('Got an unexpected event type "' + type + '". Expected "message".');
      }
      this.listeners.push(listener);
    }
  }, {
    key: 'onMessage',
    value: function onMessage(event) {
      this.listeners.forEach(function (listener) {
        if (typeof listener === 'function') {
          listener(event.nativeEvent);
        } else {
          listener.handleEvent(event.nativeEvent);
        }
      });
    }
  }, {
    key: 'expose',
    value: function expose(rootObj) {
      _comlinkjs.Comlink.expose(rootObj, _messagechanneladapter.MessageChannelAdapter.wrap(this));
    }
  }]);

  return WebViewEndpoint;
}();

exports.default = WebViewEndpoint;