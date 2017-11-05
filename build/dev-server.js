var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackDevConfig = require('./webpack.dev.conf')
var config = require('../config')

var compiler = webpack(webpackDevConfig)


var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options
  contentBase: "http://localhost/",
  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
  historyApiFallback: false,
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  compress: true,
  // Set this if you want to enable gzip compression for assets
  proxy: {},
  before: function (app) {
    // Here you can access the Express app object and add your own custom middleware to it.
    // For example, to define custom handlers for some paths:
    app.get('/test', function (req, res) {
      res.json({ custom: 'response' });
    });
  },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  // webpack-dev-middleware options
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  // It's a required option.
  publicPath: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath,
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
})

server.listen(8080, "localhost", function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening at http://localhost:8080/`)
})
