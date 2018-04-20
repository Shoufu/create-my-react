var webpack = require('webpack')
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var isProduction = process.env.NODE_ENV === 'production'
var sourceMapEnabled = isProduction ?
  config.build.productionSourceMap :
  config.dev.cssSourceMap

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/App.jsx'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isProduction ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      'actions': resolve('src/actions'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'constants': resolve('src/constants'),
      'containers': resolve('src/containers'),
      'decorators': resolve('src/decorators'),
      'reducers': resolve('src/reducers'),
      'routes': resolve('src/routes'),
      'store': resolve('src/store'),
      'styles': resolve('src/styles'),
      'utils': resolve('src/utils')
    }
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
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
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // Webpack3 的 Scope Hositing 特性
    new webpack.optimize.ModuleConcatenationPlugin(),
    // DefinePlugin 是webpack 的内置插件，该插件可以在打包时候替换制定的变量
    new webpack.DefinePlugin({
      'process.env': isProduction ?
        config.build.env : config.dev.env
    }),
    // 提取 CSS 为单独的文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
    // 压缩 CSS 文件
    new OptimizeCSSPlugin({
      cssProcessorOptions: sourceMapEnabled ? {
        safe: true,
        map: {
          inline: false
        }
      } : {
        safe: true
      }
    }),
  ]
}
