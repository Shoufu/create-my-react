const path = require('path')
const config = require('../config')
const packageConfig = require('../package.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

function assetsPath(subPath) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, subPath)
}

function createNotifierCallback() {
  const notifier = require('node-notifier')

  return function (severity, errors) {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: config.build.icon
    })
  }
}

function generateCSSLoaders(loader, loaderOptions) {
  const loaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: sourceMapEnabled
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: sourceMapEnabled
      }
    }
  ]

  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: sourceMapEnabled
      })
    })
  }

  // MiniCssExtractPlugin 仅在 prod 环境下使用
  if (isProduction) {
    return config.build.extractCSS
      ? [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: isProduction
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
        },
      }, ...loaders]
      : loaders
  } else {
    return ['style-loader'].concat(loaders)
  }
}

exports.assetsPath = assetsPath;
exports.createNotifierCallback = createNotifierCallback;
exports.generateCSSLoaders = generateCSSLoaders;
