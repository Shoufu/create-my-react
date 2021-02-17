interface CookieOptions {
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
}

export default {
  // 读取 Cookie
  get(name: string) {
    const { cookie } = document
    const cookieName = encodeURIComponent(name)
    const cookieStart = cookie.indexOf(cookieName)
    let cookieValue: string | null = null

    if (cookieStart > -1) {
      let cookieEnd = cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = cookie.length
      }

      cookieValue = decodeURIComponent(
        cookie.substring(cookieStart + cookieName.length, cookieEnd)
      )
    }

    return cookieValue
  },
  // 设置 Cookie
  set(
    name: string,
    value: string | number | boolean,
    { expires, path, domain, secure }: CookieOptions = {}
  ) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toUTCString()}`
    }
    if (path) cookieText += `; path=${path}`
    if (domain) cookieText += `; domain=${domain}`
    if (secure) cookieText += '; secure'

    document.cookie = cookieText
  },
  // 删除 Cookie
  delete(name: string, { path, domain, secure }: CookieOptions = {}) {
    this.set(name, '', { expires: new Date(0), path, domain, secure })
  }
}
