import { parseISO, format, addDays } from 'date-fns'
import useCalendar from 'src/views/pages/calendar/useCalendar'

const { visibleDays } = useCalendar()

export const convertEventToGridFormat = (event: any, currentPeriod: Date) => {
  const start = parseISO(event.start.dateTime)
  const end = parseISO(event.end.dateTime)

  // Adjust start and end times to fit within the current view period
  const startTime = start > currentPeriod ? start : currentPeriod
  const endTime = end < addDays(currentPeriod, 7) ? end : addDays(currentPeriod, visibleDays)

  return {
    ...event,
    start: startTime,
    end: endTime,
    formattedStart: format(startTime, 'MMM d, yyyy h:mm a'),
    formattedEnd: format(endTime, 'MMM d, yyyy h:mm a')
  }
}

export const isEventVisible = (event: any, currentPeriod: Date) => {
  const start = parseISO(event.start.dateTime)
  const end = parseISO(event.end.dateTime)
  return start >= currentPeriod && end <= addDays(currentPeriod, visibleDays)
}
