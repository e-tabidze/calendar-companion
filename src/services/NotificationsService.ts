import HttpService from './HttpService'

class NotificationsService extends HttpService {
  getNotifications(AccessToken = '') {
    return this.get('notifications', AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new NotificationsService()
