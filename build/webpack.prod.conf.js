const path = require('path')
const utils = require('./utils')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
const sourceMapEnabled =
  process.env.NODE_ENV === 'production'
    ? config.build.productionSourceMap
    : config.dev.cssSourceMap

const webpackConfig = merge(baseWebpackConfig, {
  // https://webpack.docschina.org/configuration/mode/
  mode: 'production',
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
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      env: config.build.env,
      title: config.build.title,
      favicon: config.build.icon,
      filename: config.build.index,
      template: 'index.html'
    }),
    // new PreloadWebpackPlugin({
    //   rel: 'prefetch'
    // }),
    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   as (entry) {
    //     if (/\.css$/.test(entry)) return 'style'
    //     if (/\.woff$/.test(entry)) return 'font'
    //     if (/\.png$/.test(entry)) return 'image'
    //     return 'script'
    //   },
    //   include: ['app', 'vendor', 'manifest']
    // }),
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
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
