import React from 'react';
import { View, Text, Alert, NetInfo, Picker } from 'react-native';
import WebViewRpc from 'rn-webview-rpc/native';
import html from './index.html';


const target = {
  document: {
    body: {
      style: {
        backgroundColor: {},
      },
    },
  },
};


export default class App extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 30,
        padding: 10,
      }}
      >
        <View style={{ height: '50%', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Native
          </Text>
          <Text style={{  }}>
            Set WebView's background:
          </Text>
          <Picker
            selectedValue="white"
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
                this.webViewRpc.proxy.document.body.style.backgroundColor = itemValue;
            }}
          >
            <Picker.Item label="white" value="white" />
            <Picker.Item label="yellow" value="yellow" />
            <Picker.Item label="pink" value="pink" />
          </Picker>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
            WebView
          </Text>
          <WebViewRpc
            source={html}
            exposedObj={{ Alert, NetInfo }}
            injectScriptTag
            ref={(ref) => { this.webViewRpc = ref; console.log(ref); }}
            target={target}
          />
        </View>
      </View>
    );
  }
}
