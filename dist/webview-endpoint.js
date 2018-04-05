'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global __DEV__ */

var WebViewEndpoint = function () {
  function WebViewEndpoint(webView) {
    _classCallCheck(this, WebViewEndpoint);

    this.listeners = [];
    this.webView = webView;
  }

  _createClass(WebViewEndpoint, [{
    key: 'send',
    value: function send(data) {
      if (__DEV__) {
        console.log('Sending message ' + data);
      }
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
      if (__DEV__) {
        console.log('Received message ' + JSON.stringify(event.nativeEvent));
      }
      this.listeners.forEach(function (listener) {
        if (typeof listener === 'function') {
          listener(event.nativeEvent);
        } else {
          listener.handleEvent(event.nativeEvent);
        }
      });
    }
  }]);

  return WebViewEndpoint;
}();

exports.default = WebViewEndpoint;