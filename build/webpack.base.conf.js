const path = require('path')
const utils = require('./utils')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const env = isProduction ? 'production' : 'development'
const useCDN = isProduction ? config.build.useCDN : config.dev.useCDN
const moduleCDNConfs = utils.getModuleCDNConfigs()
const externals = useCDN ? moduleCDNConfs.externals : {}
const cdnConfigs = useCDN ? moduleCDNConfs.cdnConfigs : []

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
  externals,
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
  },
  plugins: [
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: config.build.title,
      favicon: config.build.icon,
      filename: config.build.index,
      template: 'index.html',
      cdnConfigs,
      env
    }),
    // https://github.com/mzgoddard/hard-source-webpack-plugin
    new HardSourceWebpackPlugin()
  ]
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
