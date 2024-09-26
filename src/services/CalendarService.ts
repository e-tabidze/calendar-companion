import HttpService from './HttpService'

class CalendarService extends HttpService {
  getGoogleEvents(AccessToken = '', workspaceId: string, start_date: string, end_date: string, calendarIds: string[] = []) {
    const headers = {
      ...(AccessToken && { Authorization: `Bearer ${AccessToken}` }),
      'X-Workspace-Id': workspaceId
    }

    const calendarIdsQuery = calendarIds.map(id => `calendar_id[]=${encodeURIComponent(id)}`).join('&')

    return this.get(`/lightweight-api/google-events?startDate=${start_date}&endDate=${end_date}&${calendarIdsQuery}`, {}, headers)
  }

  getGoogleCalendars(AccessToken = '', workspaceId: string) {
    const headers = {
      ...(AccessToken && { Authorization: `Bearer ${AccessToken}` }),
      'X-Workspace-Id': workspaceId
    }

    return this.get(`lightweight-api/google-calendars`, {}, headers)
  }
}

export default new CalendarService()
