/* eslint-env node, browser */

import { Comlink } from 'comlinkjs/comlink.es6';
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6';


const webEndpoint = {
  send: data => window.postMessage(data, '*'),
  addEventListener: (...args) => document.addEventListener(...args),
  // Don't replace with 'document.addEventListener'. It results with an error.
};

const rnRpc = {
  proxy: Comlink.proxy(MessageChannelAdapter.wrap(webEndpoint)),
  proxyValue: Comlink.proxyValue,
};


export default rnRpc;
