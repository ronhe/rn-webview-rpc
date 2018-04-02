import React from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';
import { Comlink } from 'comlinkjs';
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6';
import WebViewEndpoint from './webview-endpoint';
import thisPackage from '../package.json';


export default class WebViewRpc extends React.Component {
  expose(obj) {
    Comlink.expose(obj, MessageChannelAdapter.wrap(this.endpoint));
  }

  render() {
    const { exposedObj, ...props } = this.props;
    props.ref = (webView) => {
      this.webView = webView;
      this.endpoint = new WebViewEndpoint(webView);
      this.expose(exposedObj);
    };
    props.onMessage = (msg) => {
      this.endpoint.onMessage(msg);
    };
    props.injectedJavaScript =
      `
      var script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/rn-webview-rpc@${thisPackage.version}";
      document.head.appendChild(script);
      ${this.props.injectedJavaScript}
     `;

    return (
      <WebView {...props} />
    );
  }
}

WebViewRpc.propTypes = {
  exposedObj: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  injectedJavaScript: PropTypes.string,
};

WebViewRpc.defaultProps = {
  exposedObj: {},
  injectedJavaScript: '',
};

