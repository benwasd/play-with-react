const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  // entry: [
  //   './source/server.js'
  // ],

  // output: {
  //   path: './output/',
  //   target: 'node',
  //   filename: 'server-bundle.js'
  // },

  // module: {
  //   loaders: [
  //     { test: /\.js?$/,
  //       loaders: ['react-hot', 'babel'],
  //       exclude: /node_modules/ }
  //   ]
  // },

  // externals: nodeModules

  entry: [
  ],

  output: {
    path: './output/',
    filename: 'server-bundle-unusable.js'
  },

  plugins: [
    new CopyWebpackPlugin(
        [ { from: 'source/server.js', to: 'server-bundle.js' } ],
        { ignore: [] }
    )
  ],
};