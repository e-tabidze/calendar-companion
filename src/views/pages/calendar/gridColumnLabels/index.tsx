import { addDays, format, isToday } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const GridColumnLabels = () => {
  const { visibleDays, currentPeriod } = useCalendarContext()

  // const now = new Date()
  // const startOfWeekDate = startOfWeek(currentPeriod, { weekStartsOn: 1 })
  
  const startOfPeriod = addDays(currentPeriod, 0)

  return (
    <div className='flex w-full bg-white border-b pl-12 lg:pl-16'>
      {new Array(visibleDays).fill(0).map((_, index) => {
        const date = addDays(startOfPeriod, index)
        const isTodayDate = isToday(date)
        const labelClass = isTodayDate ? 'text-primary-100' : 'text-gray-700'
        
        return (
          <div key={index} className={`flex-1 text-center text-2sm font-medium my-1 ${labelClass}`}>
            {format(date, 'd')} {format(date, 'EEE')}
          </div>
        )
      })}
    </div>
  )
}

export default GridColumnLabels
