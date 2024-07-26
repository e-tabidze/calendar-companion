import { useMemo, useState } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'
import EventModal from './eventModal'
import useCalendar from '../useCalendar'
import { addDays, differenceInMinutes, getDay, getHours, getMinutes, parseISO, startOfDay, startOfWeek } from 'date-fns'

interface Event {
  title: string
  startTime: string
  endTime: string
  color: string
}

const googleEvents = [
  {
    kind: 'calendar#event',
    etag: '"p33m87p3j8gqj0"',
    id: 'abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    created: '2023-07-01T00:00:00.000Z',
    updated: '2023-07-01T01:00:00.000Z',
    summary: 'Sample Event',
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
    id: 'abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    created: '2023-07-01T00:00:00.000Z',
    updated: '2023-07-01T01:00:00.000Z',
    summary: 'Sample Event',
    description: 'This is a sample event description.',
    location: '123 Sample St, Sample City, SC 12345',
    colorId: '2',
    creator: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    organizer: {
      email: 'example@domain.com',
      displayName: 'John Doe'
    },
    start: {
      dateTime: '2024-07-05T02:45:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2024-07-05T03:00:00-07:00',
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
    id: 'abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    created: '2023-07-01T00:00:00.000Z',
    updated: '2023-07-01T01:00:00.000Z',
    summary: 'Sample Event',
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
      dateTime: '2024-07-05T02:30:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2024-07-05T02:45:00-07:00',
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
    id: 'abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=abcd1234efgh5678ijkl9012mnop3456qrstuvwx',
    created: '2023-07-01T00:00:00.000Z',
    updated: '2023-07-01T01:00:00.000Z',
    summary: 'Sample Event',
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
      dateTime: '2024-07-05T02:30:00-07:00',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '2024-07-05T02:45:00-07:00',
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

const CalendarGrid = () => {
  const { currentPeriod, handlePrevWeek, handleNextWeek, handleToday } = useCalendar()
  const [eventModal, setEventModal] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  const toggleEventModal = () => setEventModal(!eventModal)

  const handleSaveEvent = (event: Event) => {
    setEvents(prevEvents => [...prevEvents, event])
  }

  console.log(events, 'events')

  console.log(currentPeriod, 'currentPeriod')

  // Process and map events to grid cells
  const mappedEvents = useMemo(() => {
    return googleEvents.map(event => {
      const startDate = parseISO(event.start.dateTime);
      const endDate = parseISO(event.end.dateTime);
      const dayIndex = getDay(startDate) - 1;
      const startHour = getHours(startDate);
      const startMinutes = getMinutes(startDate);
      const durationInMinutes = differenceInMinutes(endDate, startDate);
      const eventHeight = (durationInMinutes / 60) * GridConstants.hourCellHeight;
      const topOffset = (startMinutes / 60) * GridConstants.hourCellHeight;

      return {
        ...event,
        dayIndex,
        startHour,
        topOffset,
        eventHeight
      };
    });
  }, []);

  return (
    <>
      <div className='flex flex-grow flex-col z-0'>
        {new Array(GridConstants.rowsCount).fill(0).map((_, i) => (
          <div key={i} className={`flex flex-grow ${i === 0 ? 'z-10 bg-white' : ''}`}>
            {new Array(7).fill(0).map((_, index) => (
              <div
                onClick={toggleEventModal}
                key={index}
                className='relative flex flex-1 flex-grow cursor-pointer border-b border-r border-solid border-r-strokes-1'
                style={{ height: `${GridConstants.hourCellHeight}vhh` }}
              >
                {/* events */}
                {mappedEvents.map(event => {
                  if (event.dayIndex === index && event.startHour === i) {
                    return (
                      <div
                        key={event.id}
                        className='absolute bg-blue-500 text-white rounded p-1 z-10'
                        style={{ height: `${event.eventHeight}px`, top: `${event.topOffset}px`, left: 0, right: 0 }}
                      >
                        {event.summary}
                      </div>
                    );
                  }
                  return null;
                })}
                {/* events */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <EventModal isOpen={eventModal} toggleIsOpen={toggleEventModal} onSaveEvent={handleSaveEvent} />
    </>
  )
}

export default CalendarGrid
