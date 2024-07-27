import { parseISO, format, addDays } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const { visibleDays } = useCalendarContext()

export const convertEventToGridFormat = (event: any, currentPeriod: Date) => {
  const start = parseISO(event.start.dateTime)
  const end = parseISO(event.end.dateTime)

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
