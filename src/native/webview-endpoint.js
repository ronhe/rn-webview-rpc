/* global __DEV__ */

export default class WebViewEndpoint {
  constructor(webView) {
    this.listeners = [];
    this.webView = webView;
  }

  send(data) {
    if (__DEV__) {
      console.log(`Sending message ${data}`);
    }
    return this.webView.postMessage(data);
  }

  addEventListener(type, listener) {
    if (type !== 'message') {
      throw Error(`Got an unexpected event type "${type}". Expected "message".`);
    }
    this.listeners.push(listener);
  }

  onMessage(event) {
    if (__DEV__) {
      console.log(`Received message ${JSON.stringify(event.nativeEvent)}`);
    }
    this.listeners.forEach((listener) => {
      if (typeof listener === 'function') {
        listener(event.nativeEvent);
      } else {
        listener.handleEvent(event.nativeEvent);
      }
    });
  }
}
