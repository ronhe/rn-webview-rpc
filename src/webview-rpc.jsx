import React from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';
import { Comlink } from 'comlinkjs';
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6';
import WebViewEndpoint from './webview-endpoint';


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

    return (
      <WebView {...props} />
    );
  }
}

WebViewRpc.propTypes = {
  exposedObj: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WebViewRpc.defaultProps = {
  exposedObj: {},
}

