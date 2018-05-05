/* eslint-env node, browser */

import '../common/global';
import { Comlink } from 'comlinkjs/comlink.es6'; // relative import because cannot use ES6 dependencies
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6'; // relative import because cannot use ES6 dependencies


const webEndpoint = {
  send: data => window.postMessage(data, '*'),
  addEventListener: (...args) => document.addEventListener(...args),
  // Don't replace with 'document.addEventListener'. It results with an error.
};

const rnRpc = {
  proxy: (callPath = [], proxyInterface = {}) => (
    Comlink.proxy(MessageChannelAdapter.wrap(webEndpoint), callPath, proxyInterface)
  ),
  proxyValue: Comlink.proxyValue,
  expose: obj => Comlink.expose(obj, MessageChannelAdapter.wrap(webEndpoint)),
};


export default rnRpc;
