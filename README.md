# React-Native WebView RPC
[![NPM version](https://img.shields.io/npm/v/rn-webview-rpc.svg)](https://www.npmjs.com/package/rn-webview-rpc)
[![](https://data.jsdelivr.com/v1/package/npm/rn-webview-rpc/badge)](https://www.jsdelivr.com/package/npm/rn-webview-rpc)
[![Build Status](https://travis-ci.org/ronhe/rn-webview-rpc.svg?branch=master)](https://travis-ci.org/ronhe/rn-webview-rpc)

RN-WebView-RPC's goal is to allow calls to native API from a web
application that runs inside a WebView component.
It can be used as a bridge between the native and the web
parts of hybrid apps, for example,
asking for geo-location permissions.

RN-WebView-RPC wraps the built-in
[WebView](https://facebook.github.io/react-native/docs/webview.html)
component together with the useful
[Comlink](https://github.com/GoogleChromeLabs/comlink)
library into an easy-to-use package.

```javascript
// App.js

import React from 'react';
import { View, Alert } from 'react-native';
import WebViewRpc from 'rn-webview-rpc/webview-rpc';
import html from './index.html';

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
      {text: 'Green', onPress: rnRpc.proxyValue(() => setBgColor('green'))},
      {text: 'Blue', onPress: rnRpc.proxyValue(() => setBgColor('blue'))},
    ],
    { cancelable: false }
);
    
function setBgColor(color) {
  document.body.style.backgroundColor = color;
}
```

## Installation
For the React-Native project, install `rn-webview-rpc` via NPM:
```
$ npm install --save rn-webview-rpc
```
Then:
```javascript
import WebViewRpc from 'rn-webview-rpc/webview-rpc';
```

The `WebViewRpc`, by default, injects the required `script` tag
to your web page's HTML.
As a result, the `rnRpc` object becomes available globally. 
In some use cases it's better to include it manually.
To do that, set the `WebViewRpc`'s `injectScriptTag`
property to `false`.
Then you have 2 alternatives including the `rnRpc` object
to the website:
1. Add a `script` tag to your HTML's `head`:
```html
<script src="https://cdn.jsdelivr.net/npm/rn-webview-rpc@0.10.0></script>
```
2. If you use a web bundler (such as webpack),
first install `rn-webview-rpc` via NPM
(as for the React-Native project),
and then:
```javascript
import rnRpc from 'rn-webview-rpc/rn-rpc';
```
**Warning**: 
To make sure that the React-Native package and the web scripts
are compatible, it's recommended to enforce
matching identical versions on both ends.  

## API
### `WebViewRpc`
A React-Native component that Renders a
[`WebView`](https://facebook.github.io/react-native/docs/webview.html)
component, while exposing a native object to the website.
#### Props
##### `exposedObj`
The object to be exposed to the website.
* Type: object
* Default: `{}`
##### `injectScriptTag`
Controls whether to inject a `script` tag to
load the `rn-webview-rpc` module to the website.
* Type: bool
* Default: `true`

*The rest of the props are being forwarded to the native
`WebView` component.* 

##### `webView`
A reference to the native `WebView` node.
Usage:
```javascript
<WebViewRpc
    ref={(ref) => {
      this.webView = ref.webView;
    }}
/>
```

### `rnRpc`
An object at the web end that allows remote calls
to the native app.
####`Properties`
##### `proxy`
An ES6 `proxy` that sends all operations performed on that proxy
to the native side.
This is the object that is returned by 
[Comlink's `proxy` function](https://github.com/GoogleChromeLabs/comlink#comlinkproxyendpoint).
##### `proxyValue`
A wrapper function to makes sure that a parameter or return value
is proxied, not copied.
This is just a reference to
[Comlink's `proxyValue` function](https://github.com/GoogleChromeLabs/comlink#comlinkproxyvaluevalue)

## Example
See the [example folder](https://github.com/ronhe/rn-webview-rpc/tree/master/example).
It is a very simple React-Native app created using the
[Create React Native App](https://github.com/react-community/create-react-native-app)
tool.
The simplest way to run it is:
1. Download the example folder.
2. Serve it with the [Expo XDE](https://expo.io/tools#xde).
3. Play it on your smartphone (Android/iOS) using the
[Expo Client](https://expo.io/tools#client).

## Limitations
As for version 0.X.Y, RPC is supported in only one direction:
exposing an object in the native side, and using it from the
web side. This is because the JavaScript engine 
[JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore)
used by React-Native does not support the ES6 `proxy` object,
and its polyfill
[proxy-polyfill](https://github.com/GoogleChrome/proxy-polyfill)
is limited.
I will try to address this limitation for version 1.0.0.

## Under the Hood
> Reading this section is most definitely optionally.

The major pain coding this package was helping the
delightful Comlink library to work in the native environment.
Comlink is designed for web workers environment, and
unfortunately the native JavaScript engine is more limited. 
1. WebView's messaging interface supports only string messages.
Thankfully, solving this issue was easy,
since the Comlink library already includes a
[`MessageChannelAdapter`](https://github.com/GoogleChromeLabs/comlink/blob/master/messagechanneladapter.ts),
to support string based message channels, such as WebRTC.
What remained to be done is to translate the
`postMessage`/`onMessage` WebView's message API to a
`send`/`addEventListener` endpoint.
2. The ES6 `proxy` object is unsupported natively. Using the
[Proxy Polyfill](https://github.com/GoogleChrome/proxy-polyfill)
solves this issue, however,
with the limitations mentioned
[above](https://github.com/ronhe/rn-webview-rpc##limitations).
Luckily, the web-to-native direction is usually the more
useful one.
3. The `MessageChannel` and `MessagePort` objects are missing
in the native environment. Since no polyfills are available, 
to address this problem I had to write pretty
simple degenerated polyfills.

Lastly, currently Comlink is provided either in ES6 or in UMD.
At the moment, ES6 dependencies are not supported by
[Create React App](https://github.com/facebook/create-react-app)
([read about it here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-build-fails-to-minify)).
Also, UMD modules seems not to play nicely with WebPack.
Hence, for now, I chose to copy Comlink to RN-WebView-RPC's
source folder, so it can be distributed in ES5.