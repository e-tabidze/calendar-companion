import { getWeek } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const CurrentWeekCount = () => {
  const { currentPeriod } = useCalendarContext()

  const weekNumber = getWeek(currentPeriod)

  return (
    <div className='w-9 rounded bg-strokes-mute px-2 py-[6px] text-center text-grey-80 text-xs bg-grey-20'>
      w{weekNumber}
    </div>
  )
}

export default CurrentWeekCount
