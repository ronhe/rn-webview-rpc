/* eslint-env node, browser */


const webEndpoint = {
  send: data => window.postMessage(data, '*'),
  addEventListener: (type, listener, options) => (
    document.addEventListener(type, listener, options)
  ),
};

export default webEndpoint;