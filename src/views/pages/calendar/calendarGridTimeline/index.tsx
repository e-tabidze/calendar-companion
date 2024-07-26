import { GridConstants } from 'src/@core/configs/calendarConstants'
import useCalendar from '../useCalendar'
import { useRef } from 'react'
import CurrentTimeThread from './currentTimeThread'

const CalendarGridTimeline = () => {
  const { cellHeight } = useCalendar()
  const currentHourCellRef = useRef<HTMLDivElement | null>(null)
  const currentHour = new Date().getHours()

  return (
    <div className='relative w-12 border-r border-solid border-r-strokes-1 lg:w-16'>
      {new Array(GridConstants.rowsCount).fill(0).map((_, index) => {
        const isCurrentHour = index === currentHour
        const isAllDay = index === 0

        return (
          <div
            ref={isCurrentHour ? currentHourCellRef : null}
            className='relative w-full text-center text-2sm text-grey-80 '
            key={index}
            style={{ height: cellHeight }}
          >
            {isAllDay ? 'all day' : `${index}`.padStart(2, '0') + ':00'}
          </div>
        )
      })}
      <CurrentTimeThread />
    </div>
  )
}

export default CalendarGridTimeline
