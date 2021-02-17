const path = require('path')
const config = require('../config')
const packageConfig = require('../package.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap
const { cdnDomain, cdnLinkPath } = config.base

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
      ? [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: isProduction
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
            }
          },
          ...loaders
        ]
      : loaders
  } else {
    return ['style-loader'].concat(loaders)
  }
}

function getModulesVersion() {
  const mvs = {}
  const regexp = /^npm_package_dependencies_/gi
  const processEnv = process.env
  Object.keys(processEnv).forEach((key) => {
    if (regexp.test(key)) {
      mvs[key.replace(regexp, '').replace(/_/g, '-')] = processEnv[key].replace(
        /(~|\^)/g,
        ''
      )
    }
  })
  return mvs
}

function getModuleCDNLink(file, name, version) {
  if (!file) return
  const domain = /^https?:\/\//.test(file) ? '' : cdnDomain
  const filePath = cdnLinkPath
    .replace('[package]', name)
    .replace('[version]', version)
    .replace('[file]', file)
  return `${domain}/${filePath}`
}

function getModuleCDNConfigs() {
  const { cdn } = config.base
  const externals = {} // 结果
  const deps = getModulesVersion()
  const cdnConfigs = cdn.map((item) => {
    const { name } = item
    // 遍历配置
    if (name in deps) {
      const version = deps[name]
      const css = getModuleCDNLink(item.css, name, version)
      const js = getModuleCDNLink(item.js, name, version)
      externals[name] = item.globalVar
      return { css, js }
    } else {
      throw new Error(`Cannot find package ${name}, please install it first`)
    }
  })
  return { externals, cdnConfigs }
}

exports.assetsPath = assetsPath
exports.createNotifierCallback = createNotifierCallback
exports.generateCSSLoaders = generateCSSLoaders
exports.getModuleCDNConfigs = getModuleCDNConfigs
