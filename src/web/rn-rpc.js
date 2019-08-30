/* eslint-env node, browser */

import '../common/global';
import { rnRpcEventType } from '../common/common';
import { expose, proxy, proxyValue } from 'comlinkjs/comlink'; // eslint-disable-line import/first
import { wrap } from 'comlinkjs/messagechanneladapter'; // eslint-disable-line import/first


const webEndpoint = {
  send: data => window.ReactNativeWebView.postMessage(data),
  addEventListener: (type, listener, ...args) =>
      document.addEventListener(rnRpcEventType,
          (event) => listener(event.detail), ...args),
  // Don't replace with 'document.addEventListener'. It results with an error.
};

const rnRpc = {
  proxy: (target = {}) => (
    proxy(wrap(webEndpoint), target)
  ),
  proxyValue,
  expose: obj => expose(obj, wrap(webEndpoint)),
};


export default rnRpc;
