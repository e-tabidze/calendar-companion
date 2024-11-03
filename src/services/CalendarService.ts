import HttpService from './HttpService'

class CalendarService extends HttpService {
  getGoogleEvents(
    AccessToken = '',
    workspaceId: string,
    start_date: string,
    end_date: string,
    calendarIds: any[] = []
  ) {
    const headers = {
      ...(AccessToken && { Authorization: `Bearer ${AccessToken}` }),
      'X-Workspace-Id': workspaceId
    }

    const calendarIdsQuery = calendarIds.map(calendar => `calendar_id[]=${encodeURIComponent(calendar.id)}`).join('&')

    return this.get(
      `/lightweight-api/google-events?startDate=${start_date}&endDate=${end_date}&${calendarIdsQuery}`,
      {},
      headers
    )
  }

  getGoogleCalendars(AccessToken = '', workspaceId: string) {
    const headers = {
      ...(AccessToken && { Authorization: `Bearer ${AccessToken}` }),
      'X-Workspace-Id': workspaceId
    }

    return this.get(`lightweight-api/google-calendars`, {}, headers)
  }

  getPrimaryCalendar(AccessToken = '') {
    return this.get(`/api/my-primary-calendar`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getParticipants(AccessToken = '', username: string) {
    return this.get(`/api/participants?username=${username}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postCreateGoogleEvent(AccessToken = '', account_id: string, event_data: any) {
    return this.post(
      `/api/create-google-event`,
      { account_id: account_id, event_data: event_data },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  putUpdateGoogleEvent(AccessToken = '', event_id: string,  account_id: string, event_data: any) {
    return this.put(
      `/api/update-google-event`,
      { event_id: event_id, account_id: account_id, event_data: event_data },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }
}

export default new CalendarService()
