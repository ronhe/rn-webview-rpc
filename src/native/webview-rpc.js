import React, { Component } from 'react';
// TODO: Use external 'react-native-webview', since WebView will be extracted
//  from 'react-native' in future releases.
//  See https://github.com/react-native-community/react-native-webview.
//  Keep in mind that it would break the Expo example.
//  Moreover, the postMessage api is also going to be removed :(
import { WebView } from 'react-native';
import PropTypes from 'prop-types';
import '../common/global';
import { expose, proxy, proxyValue } from 'comlinkjs/comlink'; // eslint-disable-line import/first
import { wrap } from 'comlinkjs/messagechanneladapter'; // eslint-disable-line import/first
import WebViewEndpoint from './webview-endpoint';
import { version } from '../package.json';


export default class WebViewRpc extends Component {
  expose(obj) {
    expose(obj, wrap(this.endpoint));
  }

  _proxy(target = {}) {
    return proxy(wrap(this.endpoint), target);
  }

  static proxyValue(obj) {
    return proxyValue(obj);
  }

  onMessage = (msg) => {
    return this.endpoint.onMessage(msg);
  };

  render() {
    const {
      exposedObj,
      injectScriptTag,
      onMessage,
      target,
      ...props
    } = this.props;
    props.ref = (webView) => {
      if (webView !== this.webView) {
        this.webView = webView;
        this.endpoint = new WebViewEndpoint(webView);
        this.expose(exposedObj);
        if (onMessage) {
          this.endpoint.addEventListener('message', onMessage);
        }
        this.proxy = this._proxy(target);
      }
    };
    props.onMessage = this.onMessage;
    if (injectScriptTag) {
      props.injectedJavaScript =
        `
        var script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/rn-webview-rpc@${version}";
        document.head.appendChild(script);
        ${this.props.injectedJavaScript}
        `;
    }

    return (
      <WebView {...props} />
    );
  }
}

WebViewRpc.propTypes = {
  exposedObj: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  injectedJavaScript: PropTypes.string,
  injectScriptTag: PropTypes.bool,
  onMessage: PropTypes.func,
  target: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WebViewRpc.defaultProps = {
  exposedObj: {},
  injectedJavaScript: '',
  injectScriptTag: false,
  onMessage: undefined,
  target: {},
};
