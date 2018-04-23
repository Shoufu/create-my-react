var path = require('path')
var config = require('../config')
var packageConfig = require('../package.json')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var sourceMapEnabled = process.env.NODE_ENV === 'production' ?
  config.build.productionSourceMap :
  config.dev.cssSourceMap

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.createNotifierCallback = function () {
  var notifier = require('node-notifier')

  return function (severity, errors) {
    if (severity !== 'error') return

    var error = errors[0]
    var filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.generateCSSLoaders = function (loader, loaderOptions) {
  var loaders = [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: sourceMapEnabled
    }
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: sourceMapEnabled
    }
  }]

  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: sourceMapEnabled
      })
    })
  }

  return config.build.extractCSS ?
    ExtractTextPlugin.extract({
      use: loaders
    }) :
    loaders
}
