/**
 * @jest-environment jsdom
 * */

/* global test, expect, document, jest */
/* eslint-disable global-require */

import loaders from '../web-script';


test('load script tag dynamically', () => {
  document.head.innerHTML = '';
  const src = 'test url';
  loaders.loadScript(src, () => {});
  expect(document.head.innerHTML).toBe(`<script src="${src}"></script>`);
});

test('load chain of script tags dynamically', (done) => {
  loaders.loadScript = jest.fn((url, callback) => callback());
  const urls = ['a', 'ab', 'abc'];
  loaders.loadScripts(urls, () => {
    done();
  });
  expect(loaders.loadScript.mock.calls.map(call => call[0])).toEqual(urls);
});
