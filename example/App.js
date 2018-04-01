import React from 'react';
import { View, Alert, NetInfo } from 'react-native';
import WebViewRpc from 'rn-webview-rpc';
import html from './index.html';


export default class App extends React.Component {
  render() {
    console.log(html.toString())
    return (
      <View style={{ flex: 1 }}>
        <WebViewRpc
          style={{ marginTop: 0, flex: 1 }}
          source={html}
          exposedObj={{ Alert, NetInfo }}
          injectedJavaScript={'console.log("hey");'}
        />
      </View>
    );
  }
}
