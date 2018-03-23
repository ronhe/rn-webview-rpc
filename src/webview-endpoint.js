import { Comlink } from 'comlinkjs';
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6';
import './message-channel-polyfill';


export default class WebViewEndpoint {
  constructor() {
    this.listeners = [];
    this.webView = null;
  }

  send(data) {
    if (this.webView === null) {
      throw Error('webView has not been initialized yet.');
    }
    console.log(`Sending message ${data}`);
    return this.webView.postMessage(data);
  }

  addEventListener(type, listener) {
    if (type !== 'message') {
      throw Error(`Got an unexpected event type "${type}". Expected "message".`);
    }
    this.listeners.push(listener);
  }

  onMessage(event) {
    this.listeners.forEach((listener) => {
      if (typeof listener === 'function') {
        listener(event.nativeEvent);
      } else {
        listener.handleEvent(event.nativeEvent);
      }
    });
  }

  expose(rootObj) {
    Comlink.expose(rootObj, MessageChannelAdapter.wrap(this));
  }
}
