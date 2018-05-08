const path = require('path');

module.exports = {
  entry: {
    rnRpc: './src/web',
    WebViewRpc: './src/native',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
  },
  externals: [
    'react',
    'react-native',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules(?!(.comlinkjs|.proxy-polyfill))/,
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
