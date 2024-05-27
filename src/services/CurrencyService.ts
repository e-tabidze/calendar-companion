import HttpService from './HttpService'

class CurrencyService extends HttpService {
    getCurrencyRates(AccessToken = '') {
    return this.get(`/fetch-currencies`, {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new CurrencyService()
