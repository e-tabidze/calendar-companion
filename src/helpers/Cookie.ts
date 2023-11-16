import Cookies from 'js-cookie'

class Cookie {
  set(key: any, value: any, options: any) {
    Cookies.set(key, value, options)
  }

  get(key: any, req: any = null) {
    if (req) {
      return req.cookies[key] || null
    }

    return Cookies.get(key)
  }

  remove(key: any) {
    Cookies.remove(key)
  }

  removeAll() {
    const keys = Object.keys(Cookies.get())

    keys.forEach(key => {
      this.remove(key)
    })
  }
}

export default new Cookie()
