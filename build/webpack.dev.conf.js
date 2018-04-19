var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '../static'),
      manifest: require('../static/manifest.json')
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      env: config.dev.env,
      title: config.build.title,
      filename: 'index.html',
      template: 'index.ejs',
      inject: true
    }),
    new FriendlyErrorsPlugin({
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    })
  ]
})
