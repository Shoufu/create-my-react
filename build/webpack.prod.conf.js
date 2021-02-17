const path = require('path')
const utils = require('./utils')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const env = 'production'
const sourceMapEnabled =
  process.env.NODE_ENV === env ? config.build.productionSourceMap : false

const webpackConfig = merge(baseWebpackConfig, {
  // https://webpack.docschina.org/configuration/mode/
  mode: env,
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  // webpack 4 update, see: https://webpack.docschina.org/configuration/optimization
  optimization: {
    minimize: true,
    noEmitOnErrors: true
  },
  plugins: [
    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[chunkhash].css'),
      chunkFilename: utils.assetsPath('css/[id].[chunkhash].css')
    }),
    // 压缩 CSS 文件
    new OptimizeCSSPlugin({
      cssProcessorOptions: sourceMapEnabled
        ? {
            safe: true,
            map: {
              inline: false
            }
          }
        : {
            safe: true
          }
    })
  ]
})

if (config.build.productionGzip) {
  // https://github.com/webpack-contrib/compression-webpack-plugin
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      test: new RegExp(
        `\\.(${config.build.productionGzipExtensions.join('|')})$`
      ),
      threshold: 10240
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
