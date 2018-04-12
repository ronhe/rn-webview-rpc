import React from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';
import './global';
import { Comlink } from 'comlinkjs/comlink.es6'; // eslint-disable-line import/first
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6'; // eslint-disable-line import/first
import WebViewEndpoint from './webview-endpoint';
// import { bundle } from './bundle.js.json';
const json = require('./bundle.js.json');
const bundle = json.bundle;

export default class WebViewRpc extends React.Component {
  expose(obj) {
    Comlink.expose(obj, MessageChannelAdapter.wrap(this.endpoint));
  }

  render() {
    const { exposedObj, injectRnRpc, ...props } = this.props;
    props.ref = (webView) => {
      this.webView = webView;
      this.endpoint = new WebViewEndpoint(webView);
      this.expose(exposedObj);
    };
    props.onMessage = (msg) => {
      this.endpoint.onMessage(msg);
    };
    if (injectRnRpc) {
      props.injectedJavaScript = JSON.parse(bundle) + props.injectedJavaScript;
    }

    return (
      <WebView {...props} />
    );
  }
}

WebViewRpc.propTypes = {
  exposedObj: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  injectedJavaScript: PropTypes.string,
  injectRnRpc: PropTypes.bool,
};

WebViewRpc.defaultProps = {
  exposedObj: {},
  injectedJavaScript: '',
  injectRnRpc: true,
};

