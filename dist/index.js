'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebViewEndpoint = undefined;

require('./global');

var _webviewEndpoint = require('./webview-endpoint');

var _webviewEndpoint2 = _interopRequireDefault(_webviewEndpoint);

var _webviewRpc = require('./webview-rpc');

var _webviewRpc2 = _interopRequireDefault(_webviewRpc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _webviewRpc2.default;
exports.WebViewEndpoint = _webviewEndpoint2.default;