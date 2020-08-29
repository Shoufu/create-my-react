// https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
const path = require('path')
const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  base: {
    alias: {
      '@': resolve('src'),
      '@actions': resolve('src/actions'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@constants': resolve('src/constants'),
      '@containers': resolve('src/containers'),
      '@decorators': resolve('src/decorators'),
      '@reducers': resolve('src/reducers'),
      '@routes': resolve('src/routes'),
      '@store': resolve('src/store'),
      '@styles': resolve('src/styles'),
      '@utils': resolve('src/utils')
    }
    // 封装对应的 css 预处理器，可以为数组（预处理器名+预处理器配置）或者预处理器的名字
    // 具体代码可以参考 webpack.base.conf.js
    // 以 less 为例，配置如下，还需要安装 less 和 less-loader
    // styleLoaders: [
    //   [
    //     'less',
    //     {
    //       javascriptEnabled: true
    //     }
    //   ]
    // ]
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    title: 'React App',
    icon: path.resolve(__dirname, '../src/assets/favicon.ico'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    extractCSS: true,
    useEslint: true
  },
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // Various Dev Server settings
    port: 8080, // can be overwritten by process.env.PORT
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    proxyTable: {
      '/test': {
        target: 'http://localhost:8080/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '/test$': '/test-dev-server'
        }
      }
    }
  }
}
