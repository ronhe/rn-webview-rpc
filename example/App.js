import React from 'react';
import { View, Text, Alert, NetInfo, Picker } from 'react-native';
import WebViewRpc from 'rn-webview-rpc/native';
import html from './index.html.js';


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
  constructor(props) {
    super(props);
    this.state = { color: 'white' };
  }
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
        {/* Native */}
        <View style={{ height: '50%' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Native
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 17 }}>
              Set the WebView's background:
            </Text>
            <Picker
              selectedValue={this.state.color}
              style={{ height: 30, width: 150, margin: 10 }}
              onValueChange={(itemValue, itemIndex) => {
                  this.webViewRpc.proxy.document.body.style.backgroundColor = itemValue;
                  this.setState({ color: itemValue });
              }}
            >
              <Picker.Item label="White" value="white" />
              <Picker.Item label="Yellow" value="yellow" />
              <Picker.Item label="Pink" value="pink" />
            </Picker>
          </View>
        </View>

        {/* WebView */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
            WebView
          </Text>
          <WebViewRpc
            source={{ html }}
            exposedObj={{ Alert, NetInfo }}
            injectScriptTag
            ref={(ref) => { this.webViewRpc = ref; }}
            target={target}
          />
        </View>
      </View>
    );
  }
}
