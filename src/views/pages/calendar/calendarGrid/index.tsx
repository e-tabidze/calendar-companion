import { useEffect, useState } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'
import EventModal from './eventModal'
import useCalendar from '../useCalendar'
import { differenceInMinutes, getDay, getHours, getMinutes, parseISO } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'

interface Event {
  title: string
  startTime: string
  endTime: string
  color: string
  dayIndex: number
}

const googleEvents = [
  {
    kind: 'calendar#event',
    etag: '"p33m87p3j8gqj0"',
    id: 'abcd1234efgh5678ijkl9012mnop3456qrstuvwx4',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    created: '2023-07-01T00:00:00.000Z',
    updated: '2023-07-01T01:00:00.000Z',
    summary: '1',
    description: 'This is a sample event description.',
    location: '123 Sample St, Sample City, SC 12345',
    colorId: '7',
    creator: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    organizer: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    start: {
      dateTime: '2024-07-01T02:45:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2024-07-01T10:30:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    attendees: [
      {
        email: 'attendee1@domain.com',
        displayName: 'Attendee One',
        responseStatus: 'accepted'
      }
    ],
    reminders: {
      useDefault: true
    },
    eventType: 'default'
  },
  {
    kind: 'calendar#event',
    etag: '"p33m87p3j8gqj0"',
    id: 'abcd1234efgh5678ijkl9012mnop3456qrstuvwx3',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    created: '2023-07-01T00:00:00.000Z',
    updated: '2023-07-01T01:00:00.000Z',
    summary: '2',
    description: 'This is a sample event description.',
    location: '123 Sample St, Sample City, SC 12345',
    colorId: '7',
    creator: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    organizer: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    start: {
      dateTime: '2024-07-01T02:45:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2024-07-01T10:30:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    attendees: [
      {
        email: 'attendee1@domain.com',
        displayName: 'Attendee One',
        responseStatus: 'accepted'
      }
    ],
    reminders: {
      useDefault: true
    },
    eventType: 'default'
  },
  {
    kind: 'calendar#event',
    etag: '"p33m87p3j8gqj0"',
    id: 'abcd1234efgh5678ijkl9012mnop3456qrstuvwx2',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    created: '2023-07-01T00:00:00.000Z',
    updated: '2023-07-01T01:00:00.000Z',
    summary: '3',
    description: 'This is a sample event description.',
    location: '123 Sample St, Sample City, SC 12345',
    colorId: '7',
    creator: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    organizer: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    start: {
      dateTime: '2024-07-01T02:45:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2024-07-01T10:30:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    attendees: [
      {
        email: 'attendee1@domain.com',
        displayName: 'Attendee One',
        responseStatus: 'accepted'
      }
    ],
    reminders: {
      useDefault: true
    },
    eventType: 'default'
  },
  {
    kind: 'calendar#event',
    etag: '"p33m87p3j8gqj0"',
    id: 'abcd1234efgh5678ijkl9012mnop3456qrstuvwx1',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    created: '2023-07-01T00:00:00.000Z',
    updated: '2023-07-01T01:00:00.000Z',
    summary: '4',
    description: 'This is a sample event description.',
    location: '123 Sample St, Sample City, SC 12345',
    colorId: '7',
    creator: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    organizer: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    start: {
      dateTime: '2024-07-01T02:45:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2024-07-01T10:30:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    attendees: [
      {
        email: 'attendee1@domain.com',
        displayName: 'Attendee One',
        responseStatus: 'accepted'
      }
    ],
    reminders: {
      useDefault: true
    },
    eventType: 'default'
  }
]

// interface Props {
//   visibleDays: number
// }

const CalendarGrid = () => {
  const [eventModal, setEventModal] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  const { visibleDays } = useCalendarContext()

  console.log(visibleDays, 'visibleDays context')

  // useEffect(() => {
  //   console.log('Visible days updated in CalendarGrid:', visibleDays)
  // }, [visibleDays])

  const toggleEventModal = () => setEventModal(!eventModal)

  const handleSaveEvent = (event: Event) => {
    setEvents(prevEvents => [...prevEvents, event])
  }

  // const mappedEvents = useMemo(() => {
  //   const groupedEvents: any = {}

  //   googleEvents.forEach(event => {
  //     const startDate = parseISO(event.start.dateTime)
  //     const endDate = parseISO(event.end.dateTime)
  //     const dayIndex = getDay(startDate) - 1
  //     const startHour = getHours(startDate)
  //     const startMinutes = getMinutes(startDate)
  //     const durationInMinutes = differenceInMinutes(endDate, startDate)
  //     const eventHeight = (durationInMinutes / 60) * GridConstants.hourCellHeight
  //     const topOffset = (startMinutes / 60) * GridConstants.hourCellHeight

  //     const key = `${dayIndex}-${startHour}`

  //     if (!groupedEvents[key]) {
  //       groupedEvents[key] = []
  //     }

  //     groupedEvents[key].push({
  //       ...event,
  //       dayIndex,
  //       startHour,
  //       topOffset,
  //       eventHeight
  //     })
  //   })

  //   return groupedEvents
  // }, [])

  const mappedEvents: any = () => {
    const groupedEvents: { [key: string]: any[] } = {}

    googleEvents.forEach(event => {
      const startDate = parseISO(event.start.dateTime)
      const endDate = parseISO(event.end.dateTime)
      const dayIndex = getDay(startDate) - 1
      const startHour = getHours(startDate)
      const startMinutes = getMinutes(startDate)
      const durationInMinutes = differenceInMinutes(endDate, startDate)
      const eventHeight = (durationInMinutes / 60) * GridConstants.hourCellHeight
      const topOffset = (startMinutes / 60) * GridConstants.hourCellHeight

      const key = `${dayIndex}-${startHour}`

      if (!groupedEvents[key]) {
        groupedEvents[key] = []
      }

      groupedEvents[key].push({
        ...event,
        dayIndex,
        startHour,
        topOffset,
        eventHeight
      })
    })

    return groupedEvents
  }

  return (
    <>
      <div className='flex flex-grow flex-col z-0'>
        {new Array(GridConstants.rowsCount).fill(0).map((_, i) => (
          <div key={i} className={`flex flex-grow ${i === 0 ? 'z-10 bg-white' : ''}`}>
            {new Array(visibleDays).fill(0).map((_, index) => {
              const key = `${index}-${i}`
              const events = mappedEvents[key] || []

              return (
                <div
                  onClick={toggleEventModal}
                  key={index}
                  className='relative flex flex-1 flex-grow cursor-pointer border-b border-r border-solid border-strokes-1'
                  style={{ height: `${GridConstants.hourCellHeight}vhh` }}
                >
                  {events.slice(0, 3).map((event: any, idx: number) => (
                    <div
                      key={event.id}
                      className='absolute bg-blue-500 text-white rounded p-1 z-10'
                      style={{
                        height: `${event.eventHeight}px`,
                        top: `${event.topOffset}px`,
                        left: `${idx * (100 / Math.min(events.length, 3))}%`,
                        width: `${100 / Math.min(events.length, 3)}%`
                      }}
                    >
                      {event.summary}
                    </div>
                  ))}

                  {events.length > 3 && (
                    <span
                      className='absolute top-0 right-0 bg-red-100 text-white px-1 text-xs z-20 more-indicator'
                      style={{ top: `calc(${events[0].topOffset}px - 14px)` }}
                    >
                      {events.length - 3} more
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      {/*  */}
      {/* <EventModal isOpen={eventModal} toggleIsOpen={toggleEventModal} onSaveEvent={handleSaveEvent} /> */}
    </>
  )
}

export default CalendarGrid
