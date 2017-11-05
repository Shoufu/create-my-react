var path = require('path')
var utils = require('./utils')
var config = require('../config')

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
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      'assets': resolve('src', 'assets'),
      'components': resolve('src', 'components'),
      'redux': resolve('src', 'redux'),
      'router': resolve('src', 'router'),
      'views': resolve('src', 'views')
    }
  },
  module: {
    // webpack拥有一个类似于插件的机制，名为Loader，通过Loader，webpack能够针对每一种特定的资源做出相应的处理
    // 1.test参数用来指示当前配置项针对哪些资源，该值应是一个条件值(condition)。
    // 2.exclude参数用来剔除掉需要忽略的资源，该值应是一个条件值(condition)。
    // 3.include参数用来表示本loader配置仅针对哪些目录/文件，该值应是一个条件值(condition)。
    // 而include参数则用来指示目录；注意同时使用这两者的时候，实际上是and的关系。
    // 4.loader/loaders参数，用来指示用哪个或哪些loader来处理目标资源，这俩货
    // 表达的其实是一个意思，只是写法不一样，我个人推荐用loader写成一行，多个
    // loader间使用!分割，这种形式类似于管道的概念，又或者说是函数式编程。形
    // 如loader: 'css?!postcss!less'，可以很明显地看出，目标资源先经less-loader
    // 处理过后将结果交给postcss-loader作进一步处理，然后最后再交给css-loader。
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src')],
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          },
          {
            loader: 'babel-loader',
            include: [resolve('src')]
          }
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
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
  }
}
