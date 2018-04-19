require('es6-promise').polyfill()
require('isomorphic-fetch')

const headers = new Headers({
  'Accept': '*/*',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Requested-With': 'XMLHttpRequest'
})

const uploadOptions = {
  mode: 'no-cors',
  credentials: 'include',
}

const options = {
  ...uploadOptions,
  headers,
}

/**
 * 对表单的数据进行序列化
 * @param {object} data 表单数据（注意类型不是 FormData）
 */
function serialize(data) {
  return Object.keys(data).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
  }).join('&')
}

/**
 * 将字符串转换成对象 Object，如果失败则返回该字符串
 * @param {string} text 要转换的字符串
 */
function parse(text) {
  try {
    const data = JSON.parse(text)
    return data
  } catch (e) {
    if (e instanceof SyntaxError) {
      return text
    } else {
      throw e
    }
  }
}

/**
 * 模拟 HTTP GET 方法
 * @param {string} url 要访问的 url
 */
async function get(url) {
  const response = await fetch(url, options)
  const text = await response.text()
  return parse(text)
}

/**
 * 模拟 HTTP POST 方法
 * @param {string}            url         要访问的 url
 * @param {object|FormData}   data        要 POST 的数据
 */
async function post(url, data) {
  let body, option
  if (data instanceof FormData) {
    body = data
    option = uploadOptions
  } else {
    body = serialize(data)
    option = options
  }

  const response = await fetch(
    url,
    Object.assign({
      method: 'POST',
      body
    }, option)
  )

  const text = await response.text()
  return parse(text)
}

export default { get, post }
