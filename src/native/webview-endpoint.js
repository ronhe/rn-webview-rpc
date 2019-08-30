/* global __DEV__ */

import { rnRpcEventType } from '../common/common';


export default class WebViewEndpoint {
  constructor(webView) {
    this.listeners = [];
    this.webView = webView;
  }

  send(data) {
    if (__DEV__) {
      console.log(`Sending message ${data}`);
    }
    /* Explanation for the code below:
    * 1) In a string message channel messages are expected to be received in
    *   this structure:
    *   { data: <string> }.
    * 2) Payload can be added to a CustomEvent via the 'detail' property. */
    const rcv_log_msg = __DEV__ ? `console.log('Receiving message ${data}');` : '';
    return this.webView.injectJavaScript(`
      ${rcv_log_msg}
      document.dispatchEvent(new CustomEvent('${rnRpcEventType}', { detail: { data: JSON.stringify(${data}) } }));
    `);
  }

  addEventListener(type, listener) {
    if (type !== 'message') {
      throw Error(`Got an unexpected event type "${type}". Expected "message".`);
    }
    this.listeners.push(listener);
  }

  onMessage(event) {
    if (__DEV__) {
      console.log(`Received message ${event.nativeEvent.data}`);
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
