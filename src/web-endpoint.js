/* eslint-env node, browser */
/* global Comlink, MessageChannelAdapter */

// As found in https://stackoverflow.com/questions/950087/
function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  // var head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  // script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  document.head.appendChild(script);
}

function loadScripts(urls, callback) {
  if (urls.length === 1) {
    loadScript(urls[0], callback);
  } else {
    loadScript(urls[0], () => loadScripts(urls.slice(1), callback));
  }
}

function setRnProxy() {
  window.rnRpc.proxy = Comlink.proxy(MessageChannelAdapter.wrap({
    send: (data) => { console.log(data); return window.postMessage(data, '*'); },
    addEventListener: (type, listener, options) =>
      document.addEventListener(type, listener, options),
  }));
}

window.rnRpc = {};
loadScripts(
  ['https://cdn.jsdelivr.net/npm/comlinkjs/comlink.global.js',
    'https://cdn.jsdelivr.net/npm/comlinkjs/messagechanneladapter.global.js',
  ],
  setRnProxy,
);
