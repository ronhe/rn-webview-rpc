"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessagePortPolyfill = exports.MessagePortPolyfill = function () {
  function MessagePortPolyfill() {
    _classCallCheck(this, MessagePortPolyfill);

    this.otherPort = null;
    this.onmessage = null;
  }

  _createClass(MessagePortPolyfill, [{
    key: "postMessage",
    value: function postMessage(message) {
      if (this.otherPort && this.otherPort.onmessage) {
        this.otherPort.onmessage({ data: message });
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      this.onmessage = listener;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {
      this.onmessage = null;
    }
  }], [{
    key: "start",
    value: function start() {
      // do nothing at this moment
    }
  }]);

  return MessagePortPolyfill;
}();

var MessageChannelPolyfill = exports.MessageChannelPolyfill = function MessageChannelPolyfill() {
  _classCallCheck(this, MessageChannelPolyfill);

  this.port1 = new MessagePortPolyfill();
  this.port2 = new MessagePortPolyfill();
  this.port1.otherPort = this.port2;
  this.port2.otherPort = this.port1;
};