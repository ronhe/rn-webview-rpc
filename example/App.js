import React from 'react';
import { View, WebView, Alert, NetInfo } from 'react-native';
import 'core-js/es6/symbol'; // eslint-disable-line import/no-extraneous-dependencies
import 'core-js/fn/symbol/iterator';
import 'core-js/es6/set';
import 'core-js/es6/weak-set';
import proxyPolyfill from 'proxy-polyfill/src/proxy';
import { WebViewEndpoint } from 'rn-webview-rpc';
import { Comlink } from 'comlinkjs';
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6';
// import './global';
import html from './index.html';


if (typeof Proxy === 'undefined') {
  global.Proxy = proxyPolyfill();
}
const endpoint = new WebViewEndpoint();


export default class App extends React.Component {
  componentDidMount() {
    Comlink.expose({ Alert, NetInfo }, MessageChannelAdapter.wrap(endpoint));
    // const proxy = Comlink.proxy(MessageChannelAdapter.wrap(endpoint));
    // setTimeout(() => {proxy.setBgColor('black')}, 3000);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={{ marginTop: 0, flex: 1 }}
          source={html}
          ref={(webView) => {
              endpoint.webView = webView;
            }}
          onMessage={(msg) => {console.log(msg.nativeEvent); endpoint.onMessage(msg)}}
          injectedJavaScript="console.log('yo');"
        />
      </View>
    );
  }
}
