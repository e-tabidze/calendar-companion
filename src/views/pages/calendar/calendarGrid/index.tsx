import { useMemo, useState } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'
import EventModal from './eventModal'
import { differenceInMinutes, getDate, getHours, getMinutes, isEqual, parseISO } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'
import useUserData from 'src/hooks/useUserData'
import useCalendar from '../useCalendar'
import { GOOGLE_EVENT_COLORS } from 'src/@core/configs/googleEventColors'
import Typography from 'src/views/components/typography'
import { convertToAMPM } from 'src/utils/convertAMPM'
import { getRadiantBackground } from 'src/utils/getRadiantBackground'

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

      const eventBgSolid = event.colorId
        ? GOOGLE_EVENT_COLORS[event.colorId]?.solid || GOOGLE_EVENT_COLORS[0].solid
        : GOOGLE_EVENT_COLORS[0].solid

      const eventBgRadiant = getRadiantBackground(
        GOOGLE_EVENT_COLORS[event.colorId]?.id || GOOGLE_EVENT_COLORS[0].id
      ).background

      const eventTitleColor = event.colorId
        ? GOOGLE_EVENT_COLORS[event.colorId]?.color || GOOGLE_EVENT_COLORS[0].color
        : GOOGLE_EVENT_COLORS[0].color

      const startTime = convertToAMPM(event.start.dateTime)

      const organizerSelf = event?.attendees?.find(
        (item: { organizer: boolean; self: boolean }) => item.organizer === true && item.self === true
      )

      groupedEvents[key].push({
        ...event,
        dayIndex,
        startHour,
        topOffset,
        eventHeight,
        eventBgSolid,
        eventBgRadiant,
        eventTitleColor,
        startTime,
        organizerSelf
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
                    <div key={event.id}>
                      <div
                        className='absolute text-2sm rounded p-1 z-10 flex gap-2'
                        style={{
                          height: `${event.eventHeight}px`,
                          top: `${event.topOffset}px`,
                          left: `${idx * (95 / Math.min(events.length, 3))}%`,
                          width: `${95 / Math.min(events.length, 3)}%`,
                          background:
                            event.organizerSelf?.responseStatus === 'declined'
                              ? event.eventBgSolid
                              : event.organizerSelf?.responseStatus === 'accepted'
                              ? event.eventBgSolid
                              : event.organizerSelf?.responseStatus === 'tentative'
                              ? event.eventBgRadiant
                              : '#fff',
                          color: event.eventTitleColor,
                          opacity: event.organizerSelf?.responseStatus === 'declined' ? 0.6 : 1
                        }}
                      >
                        <div
                          className='w-full h-1 rounded-2xl'
                          style={{
                            height: `${event.eventHeight - 8}px`,
                            top: `${event.topOffset}px`,
                            left: `${idx * (95 / Math.min(events.length, 3))}%`,
                            width: '3px',
                            backgroundColor: event.eventTitleColor
                          }}
                        />
                        <div className='flex flex-col justify-between'>
                          <Typography
                            type='body'
                            className={`text-[${event.eventTitleColor}] ${
                              event.organizerSelf?.responseStatus === 'declined' ? 'line-through' : ''
                            } `}
                          >
                            {event.summary || 'No Title'}
                          </Typography>
                          <Typography type='body' className={`text-[${event.eventTitleColor}] text-xs`}>
                            {event.startTime}
                          </Typography>
                        </div>
                      </div>
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
