import { useQuery } from '@tanstack/react-query'
import CalendarService from 'src/services/CalendarService'

interface TranscriptResponse {
  bot_id: string
  transcript: Array<{
    speaker: string
    offset: number
    words: Array<{
      start: number
      end: number
      word: string
    }>
  }>
  speakers: string[]
  mp4?: string
}

const useDetails = (eventId: string) => {
  const useEventDetails = useQuery({
    queryKey: ['single-event', eventId],
    queryFn: () => {
      if (!eventId) {
        return Promise.resolve({ data: null })
      }

      return getSigleEvent(eventId)
    },
    enabled: !!eventId,
    staleTime: Infinity
  })

  const eventDetails = useEventDetails.data?.result?.data
  const isEventDataLoading = useEventDetails.isLoading
  const isEventDataError = useEventDetails?.isError
  const botSendBy = useEventDetails.data?.result?.data?.bot_send_by
  const filename = useEventDetails.data?.result?.data?.filename

  const useMeetingJSON = useQuery<TranscriptResponse>({
    queryKey: ['meeting-json', eventId],
    queryFn: async () => {
      if (!botSendBy) {
        return null
      }
      const response = await getMeetingJSON(botSendBy, filename)

      // Return the transcript data directly without additional nesting

      return response.data
    },
    enabled: !!botSendBy
  })

  const meetingJson = useMeetingJSON.data

  const getSigleEvent = async (event_id: string) => {
    try {
      const response: any = await CalendarService.getSingleEvent('', event_id)

      return response.data
    } catch (error) {
      throw error
    }
  }

  const getMeetingJSON = async (bot_send_by: string, filename: string) => {
    try {
      const response: any = await CalendarService.getMeetingJSON('', bot_send_by, filename)

      return response
    } catch (error) {
      throw error
    }
  }

  return { getSigleEvent, eventDetails, isEventDataLoading, isEventDataError, meetingJson }
}

export default useDetails
