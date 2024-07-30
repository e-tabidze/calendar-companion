import Typography from 'src/views/components/typography'
import { format, addDays } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const CurrentDays = () => {
  const { visibleDays, currentPeriod } = useCalendarContext()

  // const startOfWeekDate = startOfWeek(currentPeriod, { weekStartsOn: 1 })
  // const endOfWeekDate = endOfWeek(currentPeriod, { weekStartsOn: 1 })

  const startOfPeriod = addDays(currentPeriod, 0)
  const endOfPeriod = addDays(currentPeriod, visibleDays - 1)

  return (
    <div className='flex items-center gap-4 w-[210px]'>
      <Typography type='h2'>{format(startOfPeriod, 'd MMM')}</Typography>-
      <Typography type='h2'>{format(endOfPeriod, 'd MMM')}</Typography>
    </div>
  )
}

export default CurrentDays
