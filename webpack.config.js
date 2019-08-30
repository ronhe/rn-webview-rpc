const path = require('path');

module.exports = {
  entry: {
    rnRpc: './src/web', // hack for AMD: npm script will rename output file to web.js after webpacking
    native: './src/native',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  externals: [
    'react',
    'react-native',
    'react-native-webview'
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
