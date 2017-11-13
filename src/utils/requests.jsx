require('es6-promise').polyfill()
require('isomorphic-fetch')

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

async function get(url) {
  const response = await fetch(url, {
    headers
  })
  return response.json()
}

async function post(url, data) {
  const body = serialize(data)
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body
  })
  return response.json()
}

function serialize(data) {
  const str = []
  const keys = Object.keys(data)
  if (!keys.length) return ''
  keys.forEach(item => {
    str.push(`${encodeURIComponent(item)}=${encodeURIComponent(data[item])}`)
  })

  return `${str.join('&')}`
}

export default { get, post }
