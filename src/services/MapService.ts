import HttpService from './HttpService'

class MapService extends HttpService {
  getLocationSuggestions(address: string) {
    return this.get(`livoapi/suggestions?address=${address}`)
  }

  getCitiesSuggestions(city: string) {
    return this.get(`livoapi/custom-cities?address=${city}`)
  }

  getAllCities() {
    return this.get('all-cities')
  }
}

export default new MapService()
