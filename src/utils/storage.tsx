export default class WebStorage {
  name: string
  storage: Storage;
  data: { [key: string]: any }

  constructor(name, initialValue = {}, storage = sessionStorage) {
    this.name = name
    this.storage = storage
    this.data = storage[this.name]
      ? JSON.parse(storage[this.name])
      : initialValue
  }

  set = (key: string, value) => {
    this.data[key] = value
    this.storage[this.name] = JSON.stringify(this.data)
  }

  get = (key: string, defaultValue = undefined) => {
    if (!this.storage[this.name]) return defaultValue
    const data = JSON.parse(this.storage[this.name])
    return data[key]
  }

  remove = (key: string) => {
    delete this.data[key]
    this.storage[this.name] = JSON.stringify(this.data)
  }

  clear = () => {
    this.data = {}
    this.storage[this.name] = JSON.stringify(this.data)
  }
}
