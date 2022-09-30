const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var env = process.env.NODE_ENV;   // eslint-disable-line
var filename = 'ethjs-query';     // eslint-disable-line
var library = 'Eth';              // eslint-disable-line
var config = {             // eslint-disable-line

    entry: "./src/index.js",   
    output: {
      path:__dirname+ '/dist/',
      filename: "bundle.js",
      publicPath: '/'
  },    
  module: {
  
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], 
      query: {
        presets: ['es2015', 'react']
    },
      exclude: /node_modules/ },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  output: {
    path:__dirname+ '/umd/',
    filename: filename + '.js',       // eslint-disable-line
    library: library,                 // eslint-disable-line
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.BannerPlugin({ banner: ' /* eslint-disable */ ', raw: true, entryOnly: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      minimizer: [new UglifyJsPlugin()],
    }),
  ],
};

module.exports = config;
