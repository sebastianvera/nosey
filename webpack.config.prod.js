const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildDir = 'dist';

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    index: './src/index.js',
    popup: path.join(__dirname, 'src', 'popup.js'),
    background: './src/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin([buildDir]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new CopyWebpackPlugin([
      {from: './manifest.json', to: './manifest.json'},
      {from: './assets/logo16.png', to: './logo16.png'},
      {from: './assets/logo24.png', to: './logo24.png'},
      {from: './assets/logo32.png', to: './logo32.png'},
      {from: './assets/logo48.png', to: './logo48.png'},
      {from: './assets/logo128.png', to: './logo128.png'},
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('production'),
        NODE_ENV: JSON.stringify('production'),
        DEBUG: JSON.stringify(false),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
      sourceMap: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {presets: ['es2015']},
          },
        ],
      },
    ],
  },
};
