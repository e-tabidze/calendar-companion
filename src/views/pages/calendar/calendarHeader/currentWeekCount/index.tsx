import { getWeek } from 'date-fns'

interface Props {
  currentPeriod: Date
}

const CurrentWeekCount: React.FC<Props> = ({ currentPeriod }) => {
  const weekNumber = getWeek(currentPeriod)

  return (
    <div className='w-9 rounded bg-strokes-mute px-2 py-[6px] text-center text-grey-80 text-xs bg-grey-20'>
      w{weekNumber}
    </div>
  )
}

export default CurrentWeekCount
