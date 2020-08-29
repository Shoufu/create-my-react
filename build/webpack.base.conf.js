const path = require('path')
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  entry: {
    app: './src/App'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isProduction
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: config.base.alias
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src')],
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // See #6846 for context on why cacheCompression is disabled
          cacheCompression: false,
          compact: isProduction
        }
      },
      {
        test: /\.css$/,
        use: utils.generateCSSLoaders()
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

if (config.base.styleLoaders) {
  config.base.styleLoaders.forEach((loader) => {
    webpackConfig.module.rules.push(
      Array.isArray(loader)
        ? utils.generateCSSLoaders(loader[0], loader[1])
        : utils.generateCSSLoaders(loader)
    )
  })
}

if (config.build.useEslint) {
  const eslintLoader = {
    test: /\.(js|jsx|ts|tsx)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    options: {
      formatter: require('eslint-formatter-friendly')
    }
  }

  webpackConfig.module.rules.unshift(eslintLoader)
}

module.exports = webpackConfig
