const path = require('path');

module.exports = {
  entry: ['./src/web'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'web.js',
    library: 'rnRpc',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules(?!(.comlinkjs))/,
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
