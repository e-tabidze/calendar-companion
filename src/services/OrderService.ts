import { Order } from 'src/types/Order'
import HttpService from './HttpService'

class OrderService extends HttpService {
  postOrder(AccessToken = '', order: Order) {
    return this.post('/orders', order, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyOrders(AccessToken = '', statusId: string | string[], page: number) {
    return this.get(
      `/orders?status_id=${statusId}&page=${page}`,
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  getCompanyOrder(AccessToken = '', orderId: string | number) {
    return this.get(`/orders/${orderId}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postCompanyOrderStatus(AccessToken = '', orderId: string | number, status: 0 | 1 | 2) {
    return this.post(
      `/status/orders`,
      { id: orderId, status_id: status },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  getUserOrders(AccessToken = '', page: number) {
    return this.get(`/user-orders?page=${page}`, {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getUserOrdersDetails(AccessToken = '', orderId: number | string | undefined) {
    return this.get(`/user-orders/${orderId}`, {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postUserCancelOrder(AccessToken = '', orderId: string | number, status: string | number) {
    return this.post(
      `/status/orders`,
      { id: orderId, status_id: status },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  selfBookProduct(AccessToken = '', order: Order) {
    return this.post('/self-book', order, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  orderDates(AccessToken = '', productId: number) {
    return this.get(`/order-dates/${productId}`, {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new OrderService()
