const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env
}

const proxy = config.dev.proxyTable
const port = process.env.PORT || config.dev.port
const uri = `http://localhost:${port}`

module.exports = merge(baseWebpackConfig, {
  devtool: 'cheap-eval-source-map',
  entry: {
    app: [
      `webpack-dev-server/client?${uri}`,
      'webpack/hot/only-dev-server'
    ].concat(baseWebpackConfig.entry.app)
  },
  devServer: {
    // webpack-dev-server options
    hot: true,
    historyApiFallback: true,
    compress: true,
    open: config.dev.autoOpenBrowser,
    proxy: proxy,
    before: function (app) {
      app.get('/test-dev-server', function (req, res) {
        res.send('Yeah you find it!')
      })
    },
    overlay: config.dev.errorOverlay
      ? {
          warnings: false,
          errors: true
        }
      : false,

    // webpack-dev-middleware options
    publicPath: config.dev.assetsPublicPath,
    headers: {
      'X-Custom-Header': 'yes'
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new AddAssetHtmlPlugin({
    //   filepath: path.resolve(__dirname, '../static/vendors.bundle.js'),
    //   includeSourcemap: false,
    //   hash: true
    // }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Listening at ${uri}`],
        notes: Object.keys(proxy).map(function (url) {
          let target = proxy[url].target.replace(/\/$/, '')
          const { pathRewrite } = proxy[url]
          if (pathRewrite) {
            Object.keys(pathRewrite).forEach(function (regex) {
              if (new RegExp(regex).test(url)) {
                target = target + pathRewrite[regex]
              }
            })
          } else {
            target = target + url
          }
          return `[HPM] Proxy created: ${url} -> ${target}`
        })
      },
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    })
  ]
})
