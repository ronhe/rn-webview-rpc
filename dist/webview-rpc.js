'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _comlinkjs = require('comlinkjs');

var _messagechanneladapter = require('comlinkjs/messagechanneladapter.es6');

var _webviewEndpoint = require('./webview-endpoint');

var _webviewEndpoint2 = _interopRequireDefault(_webviewEndpoint);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebViewRpc = function (_React$Component) {
  _inherits(WebViewRpc, _React$Component);

  function WebViewRpc() {
    _classCallCheck(this, WebViewRpc);

    return _possibleConstructorReturn(this, (WebViewRpc.__proto__ || Object.getPrototypeOf(WebViewRpc)).apply(this, arguments));
  }

  _createClass(WebViewRpc, [{
    key: 'expose',
    value: function expose(obj) {
      _comlinkjs.Comlink.expose(obj, _messagechanneladapter.MessageChannelAdapter.wrap(this.endpoint));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          exposedObj = _props.exposedObj,
          props = _objectWithoutProperties(_props, ['exposedObj']);

      props.ref = function (webView) {
        _this2.webView = webView;
        _this2.endpoint = new _webviewEndpoint2.default(webView);
        _this2.expose(exposedObj);
      };
      props.onMessage = function (msg) {
        _this2.endpoint.onMessage(msg);
      };
      props.injectedJavaScript = '\n      var script = document.createElement("script");\n      script.src = "https://cdn.jsdelivr.net/npm/rn-webview-rpc@' + _package2.default.version + '";\n      document.head.appendChild(script);\n      ' + this.props.injectedJavaScript + '\n     ';

      return _react2.default.createElement(_reactNative.WebView, props);
    }
  }]);

  return WebViewRpc;
}(_react2.default.Component);

exports.default = WebViewRpc;


WebViewRpc.propTypes = {
  exposedObj: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
  injectedJavaScript: _propTypes2.default.string
};

WebViewRpc.defaultProps = {
  exposedObj: {},
  injectedJavaScript: ''
};