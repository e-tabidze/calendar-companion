import HttpService from './HttpService'

class MapService extends HttpService {
  getLocationSuggestions(address: string) {
    return this.get(`livoapi/suggestions?address=${address}`)
  }
}

export default new MapService()
