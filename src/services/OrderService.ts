import { Order } from 'src/types/Order'
import HttpService from './HttpService'

class OrderService extends HttpService {
  postOrder(AccessToken = '', order: Order) {
    return this.post('/orders', order, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyOrders(AccessToken = '') {
    return this.get('/orders', AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyOrder(AccessToken = '', orderId: string | number) {
    return this.get(`/orders/${orderId}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postOrderStatus(AccessToken = '', orderId: string | number, status: 0 | 1 | 2) {
    return this.post(
      `/status/orders`,
      { id: orderId, status_id: status },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }
}

export default new OrderService()
