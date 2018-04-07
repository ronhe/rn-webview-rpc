/* eslint-env node, browser */

import { Comlink } from 'comlinkjs/comlink.es6';
import { MessageChannelAdapter } from 'comlinkjs/messagechanneladapter.es6';


const rnRpc = {};

if (typeof window !== 'undefined') {
  rnRpc.proxy = Comlink.proxy(MessageChannelAdapter.wrap({
    send: data => window.postMessage(data, '*'),
    addEventListener: document.addEventListener,
  }));
  rnRpc.proxyValue = Comlink.proxyValue;
}


export default rnRpc;
