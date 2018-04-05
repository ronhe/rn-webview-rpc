/* global test, expect */

import { MessageChannelPolyfill } from '../message-channel-polyfill';


test('send message from port1 to port2', (done) => {
  const messageChannel = new MessageChannelPolyfill();
  messageChannel.port2.addEventListener('type', (message) => {
    expect(message.data).toBe('hello');
    done();
  });
  messageChannel.port1.postMessage('hello');
});

test('send a message when other port does not listen', () => {
  const messageChannel = new MessageChannelPolyfill();
  messageChannel.port1.postMessage('hello');
});
