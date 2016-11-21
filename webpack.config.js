var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');
var ROOT_DIR = path.resolve(__dirname, 'src');

var config = {
    devTools: '#inline-source-map',

    entry: getEntrySources([
        APP_DIR + '/index.js',
        ROOT_DIR + '/index.html'

    ]),
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new ExtractTextPlugin('main.css'),
    ],
    module: {
      loaders: [
          {
              test: /\.jsx?/,
              include: APP_DIR,
              loaders: ['babel'],
          },
          {
              test: /\.html$/,
              loader: 'file?name=[name].[ext]'
          },
          {
              test: /\.(css|scss)$/,
              loader: ExtractTextPlugin.extract('style', 'css!sass')
          },
          {
              test: /\.json$/,
              loader: 'json-loader'
          },
          {
              test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
              loader: 'url?limit=8192'
          },
          {
              test: /\.(jpe?g|png|gif)$/i,
              loaders: [
                  'url?limit=8192', 'img'
              ]
          }
      ]
    }
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
    }
    return sources;
}

module.exports = config;