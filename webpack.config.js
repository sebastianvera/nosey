const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  bail: true,
  entry: {
    index: './src/index.js',
    background: './src/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './manifest.json', to: './manifest.json' }]),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('dev'),
        NODE_ENV: JSON.stringify('dev'),
        DEBUG: JSON.stringify(true),
      },
    }),
  ],
};
