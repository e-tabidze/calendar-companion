import Typography from 'src/views/components/typography'
import { format } from 'date-fns'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const CurrentDays = () => {
  const { startOfPeriod, endOfPeriod } = useCalendarContext()

  return (
    <div className='flex items-center gap-4 w-[210px]'>
      <Typography type='h2'>{format(startOfPeriod, 'd MMM')}</Typography>-
      <Typography type='h2'>{format(endOfPeriod, 'd MMM')}</Typography>
    </div>
  )
}

export default CurrentDays
