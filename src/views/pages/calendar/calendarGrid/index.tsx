import { useMemo } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'
import { differenceInMinutes, getDate, getHours, getMinutes, isEqual, parseISO } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'
import useUserData from 'src/hooks/useUserData'
import useCalendar from '../useCalendar'
import { GOOGLE_EVENT_COLORS } from 'src/@core/configs/googleEventColors'
import Typography from 'src/views/components/typography'
import { convertToAMPM } from 'src/utils/convertAMPM'
import { getRadiantBackground } from 'src/utils/getRadiantBackground'

interface Props {
  toggleEventModal: () => void
}

const CalendarGrid: React.FC<Props> = ({ toggleEventModal }) => {
  const { visibleDays, startOfPeriod, daysArray, cellHeight } = useCalendarContext()

  const { activeWorkspace } = useUserData()
  const { googleEventsData } = useCalendar(activeWorkspace?.id)

  const mappedEvents = useMemo(() => {
    const groupedEvents: any = {}

    googleEventsData?.forEach((event: any) => {
      const startDate = parseISO(event.start.dateTime)
      const endDate = parseISO(event.end.dateTime)
      const dayIndex = daysArray.findIndex(day => isEqual(getDate(startDate), day))
      const startHour = getHours(startDate)
      const startMinutes = getMinutes(startDate)
      const durationInMinutes = differenceInMinutes(endDate, startDate)
      const eventHeight = (durationInMinutes / 60) * cellHeight
      const topOffset = (startMinutes / 60) * cellHeight

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

  const calculateEventPositions = (events: any[]) => {
    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime()
    )

    const columns: any = []

    sortedEvents.forEach(event => {
      let placed = false
      for (let i = 0; i < columns.length; i++) {
        if (!doEventsOverlap(columns[i][columns[i].length - 1], event)) {
          columns[i].push(event)
          placed = true
          break
        }
      }
      if (!placed) {
        columns.push([event])
      }
    })

    const totalColumns = columns.length

    return sortedEvents.map(event => {
      const columnIndex = columns.findIndex((column: any) => column.includes(event))

      return {
        ...event,
        width: `${95 / totalColumns}%`,
        left: `${(columnIndex * 95) / totalColumns}%`
      }
    })
  }

  const doEventsOverlap = (event1: any, event2: any) => {
    const start1 = new Date(event1.start.dateTime).getTime()
    const end1 = new Date(event1.end.dateTime).getTime()
    const start2 = new Date(event2.start.dateTime).getTime()
    const end2 = new Date(event2.end.dateTime).getTime()

    return start1 < end2 && end1 > start2
  }

  return (
    <>
      <div className='flex flex-grow flex-col z-0'>
        {new Array(GridConstants.rowsCount).fill(0).map((_, i) => (
          <div key={i} className={`flex flex-grow ${i === 0 ? 'z-10 bg-white' : ''}`}>
            {new Array(visibleDays).fill(0).map((_, index) => {
              const key = `${index}-${i}`
              const events = mappedEvents[key] || []
              const positionedEvents = calculateEventPositions(events)

              return (
                <div
                  onDoubleClick={() => toggleEventModal()}
                  key={index}
                  className='relative flex flex-1 flex-grow cursor-pointer border-b border-r border-solid border-strokes-1'
                  style={{ height: `${GridConstants.hourCellHeight}vhh` }}
                >
                  {positionedEvents.map((event, eventIndex) => (
                    <div
                      key={event.id}
                      className='absolute rounded-sm overflow-hidden'
                      style={{
                        height: `${event.eventHeight}px`,
                        top: `${event.topOffset}px`,
                        left: event.left,
                        width: event.width,
                        background:
                          event.organizerSelf?.responseStatus === 'declined'
                            ? event.eventBgSolid
                            : event.organizerSelf?.responseStatus === 'accepted'
                            ? event.eventBgSolid
                            : event.organizerSelf?.responseStatus === 'tentative'
                            ? event.eventBgRadiant
                            : '#fff',
                        border: `1px solid ${
                          event.organizerSelf?.responseStatus === 'declined'
                            ? event.eventBgSolid
                            : event.organizerSelf?.responseStatus === 'accepted'
                            ? event.eventBgSolid
                            : event.organizerSelf?.responseStatus === 'tentative'
                            ? event.eventBgRadiant
                            : event.eventBgSolid
                        }`,
                        color: event.eventTitleColor,
                        opacity: event.organizerSelf?.responseStatus === 'declined' ? 0.6 : 1,
                        zIndex: eventIndex + 10
                      }}
                    >
                      <div className='flex flex-col justify-between h-full p-1'>
                        <Typography
                          type='body'
                          className={`text-xs font-bold truncate ${
                            event.organizerSelf?.responseStatus === 'declined' ? 'line-through' : ''
                          } ${`text-$[event.eventTitleColor]`}`}
                        >
                          {event.summary || 'No Title'}
                        </Typography>
                        <Typography type='body' className='text-xs'>
                          {event.startTime}
                        </Typography>
                      </div>
                    </div>
                  ))}

                  {/* {events.length > 3 && (
                    <span
                      className='absolute top-0 right-0 bg-red-500 text-white px-1 text-xs z-50 more-indicator'
                      style={{ top: `calc(${events[0].topOffset}px - 14px)` }}
                    >
                      {events.length - 3} more
                    </span>
                  )} */}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}

export default CalendarGrid
