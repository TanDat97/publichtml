const webpack = require('webpack');
const path = require('path');

module.exports = {
  // where do we want webpack to start looking through
  entry: [
    './src/index.js'
  ],

  // all your output put into this location
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  // we want to run while working on locally and the dev server will have
  devServer: {
    contentBase: './dist',
    port: 8000
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['eslint-loader']
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
}