import { useMemo, useState } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'
import EventModal from './eventModal'
import { differenceInMinutes, getDate, getHours, getMinutes, isEqual, parseISO } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'
import useUserData from 'src/hooks/useUserData'
import useCalendar from '../useCalendar'

const CalendarGrid = () => {
  const [eventModal, setEventModal] = useState(false)

  const { visibleDays, startOfPeriod, daysArray } = useCalendarContext()

  const { activeWorkspace } = useUserData()
  const { googleEventsData } = useCalendar(activeWorkspace?.id)

  const toggleEventModal = () => setEventModal(!eventModal)

  const mappedEvents = useMemo(() => {
    const groupedEvents: any = {}

    googleEventsData?.forEach((event: any) => {
      const startDate = parseISO(event.start.dateTime)
      const endDate = parseISO(event.end.dateTime)
      const dayIndex = daysArray.findIndex(day => isEqual(getDate(startDate), day))
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
  }, [googleEventsData, visibleDays, startOfPeriod, daysArray])

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
      <EventModal isOpen={eventModal} toggleIsOpen={toggleEventModal} />
    </>
  )
}

export default CalendarGrid
