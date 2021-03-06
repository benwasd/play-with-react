const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './source/client.jsx'
  ],

  output: {
    path: './output/static/',
    publicPath: '/',
    filename: 'client-bundle.js'
  },

  plugins: [
    new CopyWebpackPlugin(
        [ { from: 'source', to: '' } ],
        { ignore: [ '*.js', '*.jsx', '.gitignore'] }
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