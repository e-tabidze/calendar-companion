import { Order } from 'src/types/Order'
import HttpService from './HttpService'

class OrderService extends HttpService {
  postOrder(AccessToken = '', order: Order) {
    return this.post('/orders', order, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getOrders(AccessToken = '') {
    return this.get('/orders', AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new OrderService()
