import Typography from 'src/views/components/typography'
import { format, startOfWeek, endOfWeek } from 'date-fns'

interface Props {
  currentPeriod: Date
}

const CurrentDays: React.FC<Props> = ({ currentPeriod }) => {
  const startOfWeekDate = startOfWeek(currentPeriod, { weekStartsOn: 1 })
  const endOfWeekDate = endOfWeek(currentPeriod, { weekStartsOn: 1 })

  return (
    <div className="flex items-center gap-4 w-[210px]">
      <Typography type='h2'>{format(startOfWeekDate, 'd MMM')}</Typography>-
      <Typography type='h2'>{format(endOfWeekDate, 'd MMM')}</Typography>
    </div>
  )
}

export default CurrentDays
