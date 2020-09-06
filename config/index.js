// https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
const path = require('path')
const resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  base: {
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@constants': resolve('src/constants'),
      '@pages': resolve('src/pages'),
      '@routes': resolve('src/routes'),
      '@styles': resolve('src/styles'),
      '@utils': resolve('src/utils')
    },
    // cdn 数组可以设置需要
    // 如果 js 或者 css 选项不是以 http 或者 https 开头
    // 则会根据 package.json 的信息设置从 cdnDomain 读取对应的文件信息
    // 注意，对应的 cdn 文件安装时必须安装到 dependencies 而非 devDependencies
    cdnDomain: 'https://unpkg.com',
    // 不同的 cdn 主域有不同的匹配规则，这里可以自定义匹配规则，有以下参数
    // [package]: 要放置 CDN 的包名
    // [version]: 要放置 CDN 的版本
    // [file]: 对应 node_modules 的文件路径，在替换时对应 cdn 数组里的 js 和 css 文件
    cdnLinkPath: '[package]@[version]/[file]',
    cdn: [
      { name: 'react', globalVar: 'React', js: 'umd/react.production.min.js' },
      { name: 'react-dom', globalVar: 'ReactDOM', js: 'umd/react-dom.production.min.js' },
      { name: 'react-router', globalVar: 'ReactRouter', js: 'umd/react-router.min.js' },
      { name: 'react-router-dom', globalVar: 'ReactRouterDOM', js: 'umd/react-router-dom.min.js' }
    ]
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
    useEslint: true,
    useCDN: true
  },
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    useCDN: false,

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
