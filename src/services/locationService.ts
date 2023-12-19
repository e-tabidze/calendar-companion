import HttpService from './HttpService'

class LocationService extends HttpService {
  getLocationSuggestions(address: string) {
    return this.get(`livoapi/suggestions?address=${address}`)
  }
}

export default new LocationService()
