# React-Native WebView RPC
[![NPM version](https://img.shields.io/npm/v/rn-webview-rpc.svg)](https://www.npmjs.com/package/rn-webview-rpc)
[![](https://data.jsdelivr.com/v1/package/npm/rn-webview-rpc/badge)](https://www.jsdelivr.com/package/npm/rn-webview-rpc)
[![Build Status](https://travis-ci.org/ronhe/rn-webview-rpc.svg?branch=master)](https://travis-ci.org/ronhe/rn-webview-rpc)

RN-WebView-RPC's goal is to allow calls to native API from a web
application that runs inside a WebView component.
It can be used, for example, to ask for geo-location permissions,
or simply as bridge between the native and the web based part of
hybrid apps.

RN-WebView-RPC integrates the builtin
[WebView](https://facebook.github.io/react-native/docs/webview.html)
component together with the excellent
[Comlink](https://github.com/GoogleChromeLabs/comlink),
library into an easy-to-use package.

```javascript
// App.js

import { View, Alert } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebViewRpc
          style={{ marginTop: 0, flex: 1 }}
          source={html}
          exposedObj={{ Alert }}
        />
      </View>
    );
  }
}
```

```javascript
// index.html

await rnRpc.proxy.Alert.alert(
    'What is your favorite color?',
    'We got green and blue',
    [
      {text: 'Ask me later'},
      {text: 'Green', onPress: Comlink.proxyValue(() => setBgColor('green'))},
      {text: 'Blue', onPress: Comlink.proxyValue(() => setBgColor('blue'))},
    ],
    { cancelable: false }
);
    
function setBgColor(color) {
  document.body.style.backgroundColor = color;
}
```

#installation
For the React-Native app, install via NPM:
```
$ npm install --save rn-webview-rpc
```

The `WebViewRpc` component will auto inject the required web script
to your web page. Nevertheless, if you need to include it manually,
simply add the following script tag to your html's head:
```html
<script src="https://cdn.jsdelivr.net/npm/rn-webview-rpc></script>"
```
To make sure that the react-native package and the web scripts
are compatible, it's recommended to force identical version,
by specifying a version (e.g. `@0.6.3`) in the HTML script tag.  

