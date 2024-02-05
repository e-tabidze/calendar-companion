import HttpService from './HttpService'

class NotificationsService extends HttpService {
  getNotifications(AccessToken = '', page: number) {
    return this.get(`/notifications?is_all=1&page=${page}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getNotificationDetails(AccessToken = '', notificationId: string, companyId: string) {
    return this.get(`/notifications/${notificationId}?company_id=${companyId}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new NotificationsService()
