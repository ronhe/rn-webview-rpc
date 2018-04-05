/* global jest, test, expect */

import React from 'react';
import renderer from 'react-test-renderer';

import WebViewRpc from '../';


jest.mock('WebView', () => 'WebView');

test('renders correctly', () => {
  const tree = renderer.create(<WebViewRpc />).toJSON();
  tree.props.injectedJavaScript = tree.props.injectedJavaScript.replace(
    /rn-webview-rpc@\d+\.\d+\.\d+/,
    'rn-webview-rpc',
  );
  expect(tree).toMatchSnapshot();
});
