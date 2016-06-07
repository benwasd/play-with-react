const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './source/app.js'
  ],

  output: {
    path: './output/',
    publicPath: '/',
    filename: 'app-bundle.js'
  },

  plugins: [
    new CopyWebpackPlugin(
        [ { from: 'source', to: '' } ],
        { ignore: [ '*.js', '*.jsx'] }
    )
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/ },
      { test: /\.js?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/ }
    ]
  }
};