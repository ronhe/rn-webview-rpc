import React, { Component } from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';
import '../common/global';
import { Comlink } from 'comlinkjs/comlink.es6'; // eslint-disable-line import/first
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6'; // eslint-disable-line import/first
import WebViewEndpoint from './webview-endpoint';
import { version } from '../package.json';


export default class WebViewRpc extends Component {
  expose(obj) {
    Comlink.expose(obj, MessageChannelAdapter.wrap(this.endpoint));
  }

  render() {
    const { exposedObj, injectScriptTag, ...props } = this.props;
    props.ref = (webView) => {
      this.webView = webView;
      this.endpoint = new WebViewEndpoint(webView);
      this.expose(exposedObj);
    };
    props.onMessage = (msg) => {
      this.endpoint.onMessage(msg);
    };
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
};

WebViewRpc.defaultProps = {
  exposedObj: {},
  injectedJavaScript: '',
  injectScriptTag: false,
};

