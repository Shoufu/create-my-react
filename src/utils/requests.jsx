require('es6-promise').polyfill()
require('isomorphic-fetch')

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

function get(url) {
  return fetch(url, {
    headers
  })
}

function post(url, data) {
  const body = serialize(data)
  return fetch(url, {
    method: 'POST',
    headers,
    body
  })
}

function serialize(data) {
  const [str, keys] = [[], Object.keys(data)]
  if (!keys.length) return ''
  keys.forEach(item => {
    str.push(`${encodeURIComponent(item)}=${encodeURIComponent(data[item])}`)
  })

  return `${str.join('&')}`
}

export default { get, post }
