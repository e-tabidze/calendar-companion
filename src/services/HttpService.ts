import Cookie from '../helpers/Cookie'
import { API_URL, ACCESS_TOKEN_NAME, TOKEN_TIME_MINUTES, TOKEN_EXPIRE_TIME_NAME } from 'src/env'

// import { errorCodes } from "@helpers/Utils";

import axios from 'axios'

const apiUrl = API_URL
class HttpService {
  post(endpoint: any, data: any = {}, headers: any = null, serverReq = null, responseType = 'json') {
    let dataMerged = {
      ...data
    }

    if (typeof FormData !== 'undefined' && data instanceof FormData) {
      dataMerged = data
    }
    if (data?.File || data?.Func) {
      const formData = new FormData()
      Object.entries(dataMerged).forEach(([key, value]) => {
        if (typeof value == 'object') {
          // @ts-ignore
          for (const val of value) {
            formData.append(key, val)
          }
        } else {
          // @ts-ignore
          formData.append(key, value)
        }
      })
      dataMerged = formData
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.request(headers, serverReq, responseType).post(endpoint, dataMerged)
        resolve(response)
      } catch (e: any) {
        // let error = 'INTERNAL_SERVER_ERROR'
        // if (e.response && e.response.data) {
        //   error = e.response.data.message
        // }
        reject(e)
      }
    })
  }

  put(endpoint: any, data = {}, headers: any = null, serverReq = null) {
    let dataMerged = { ...data }
    if (typeof FormData !== 'undefined' && data instanceof FormData) {
      dataMerged = data
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.request(headers, serverReq).put(endpoint, dataMerged)
        resolve(response)
      } catch (e: any) {
        // let error = 'INTERNAL_SERVER_ERROR'
        // if (e.response) {
        //   error = e.response.data.message
        // }
        reject(e)
      }
    })
  }

  get(endpoint: any, data = {}, headers: any = null, serverReq = null, responseType = 'json') {
    const dataMerged = {
      ...data
    }
    const params = this.getQueryString(dataMerged)

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.request(headers, serverReq, responseType).get(
          endpoint + (params ? `?${params}` : '')
        )
        resolve(response)
      } catch (e: any) {
        // let error = 'INTERNAL_SERVER_ERROR'
        // if (e.response) {
        //   error = e.response.data.message
        // }
        reject(e)
      }
    })
  }

  delete(endpoint: any, data = {}, headers: any = null, serverReq = null, responseType = 'json') {
    const dataMerged = { ...data }

    const params = this.getQueryString(dataMerged)

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.request(headers, serverReq, responseType).delete(
          endpoint + (params ? `?${params}` : '')
        )
        resolve(response)
      } catch (e: any) {
        // let error = 'INTERNAL_SERVER_ERROR'
        // if (e.response) {
        //   error = e.response.data.message
        // }
        reject(e)
      }
    })
  }

  getQueryString(params: any = {}) {
    return Object.keys(params)
      .map(k => {
        let url = `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
        if (Array.isArray(params[k])) {
          url = params[k].map((item: any, index: any) => `${k}[${index}]=${encodeURIComponent(item)}`).join('&')
        }

        return url
      })
      .join('&')
  }

  setToken(token: any, tokenTime = null) {
    const date = new Date()
    const minutes = TOKEN_TIME_MINUTES
    if (token) {
      date.setTime(date.getTime() + minutes * 60 * 10999)
      Cookie.set(ACCESS_TOKEN_NAME, token, { expires: date, secure: true })
    }
    if (tokenTime) {
      this.setTokenExpireTime(tokenTime)
    }
  }

  setTokenExpireTime(seconds: any) {
    Cookie.set(TOKEN_EXPIRE_TIME_NAME, `${seconds * 999999 - 2 * 10}-${new Date().getTime()}`, {})
  }

  static getTokenTime() {
    return Cookie.get(TOKEN_EXPIRE_TIME_NAME)
  }

  getToken(req = null) {
    return Cookie.get(ACCESS_TOKEN_NAME, req)
  }

  request(headers = {}, serverReq = null, responseType: any = 'json') {
    if (!headers || (headers && !headers.hasOwnProperty('Authorization'))) {
      headers = {
        ...headers,
        Authorization: this.getToken(serverReq)?.length > 0 ? `${this.getToken(serverReq)}` : ''
      }
    }

    return axios.create({
      baseURL: apiUrl,
      responseType: responseType,
      headers
    })
  }
}

export default HttpService
