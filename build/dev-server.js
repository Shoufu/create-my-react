var opn = require('opn')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackDevConfig = require('./webpack.dev.conf')
var config = require('../config')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.dev.env
}

var port = process.env.PORT || config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var proxy = config.dev.proxyTable

var uri = 'http://localhost:' + port
webpackDevConfig.entry.app = [
  'webpack-dev-server/client?' + uri,
  'webpack/hot/only-dev-server'
].concat(webpackDevConfig.entry.app)

var server = new WebpackDevServer(webpack(webpackDevConfig), {
  // webpack-dev-server options
  hot: true,
  historyApiFallback: true,
  compress: true,
  proxy: proxy,
  before: function (app) {
    app.get('/test', function (req, res) {
      res.json({ response: 'Yeah awesome!' });
    });
  },

  // webpack-dev-middleware options
  publicPath: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath,
  headers: { "X-Custom-Header": "yes" },
  stats: {
    modules: false,
    chunks: false,
    colors: true
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  }
})

server.listen(port, "localhost", function (err, result) {
  if (err) {
    return console.log(err);
  }

  if (autoOpenBrowser && process.env.NODE_ENV !== 'production') {
    opn(uri)
  }

  console.log('Listening at ' + uri)
})
