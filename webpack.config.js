const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  bail: true,
  entry: {
    background: path.join(__dirname, 'src', 'background.js'),
    popup: path.join(__dirname, 'src', 'popup.js'),
    index: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './manifest.json', to: './manifest.json' },
      { from: './assets/logo16.png', to: './logo16.png' },
      { from: './assets/logo24.png', to: './logo24.png' },
      { from: './assets/logo32.png', to: './logo32.png' },
      { from: './assets/logo48.png', to: './logo48.png' },
      { from: './assets/logo128.png', to: './logo128.png' },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('dev'),
        NODE_ENV: JSON.stringify('dev'),
        DEBUG: JSON.stringify(true),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
};
