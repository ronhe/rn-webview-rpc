'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-env node, browser */

var webEndpoint = {
  send: function send(data) {
    return window.postMessage(data, '*');
  },
  addEventListener: function addEventListener(type, listener, options) {
    return document.addEventListener(type, listener, options);
  }
};

exports.default = webEndpoint;