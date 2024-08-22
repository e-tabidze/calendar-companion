import HttpService from './HttpService'

class CalendarService extends HttpService {
  getGoogleEvents(AccessToken = '', workspaceId: string, start_date: string, end_date: string) {
    const headers = {
      ...(AccessToken && { Authorization: `Bearer ${AccessToken}` }),
      'X-workspace-id': workspaceId
    }

    return this.get(`/lightweight-api/google-events?startDate=${start_date}&endDate=${end_date}`, {}, headers)
  }
}

export default new CalendarService()
