import { addDays, format, startOfWeek } from 'date-fns'

interface Props {
  currentPeriod: any
  visibleDays: number
}

const GridColumnLabels: React.FC<Props> = ({ currentPeriod, visibleDays }) => {
  const now = new Date()
  const startOfWeekDate = startOfWeek(currentPeriod, { weekStartsOn: 1 })
  const startOfPeriod = addDays(currentPeriod, 0)

  return (
    <div className='flex w-full bg-white border-b pl-12 lg:pl-16'>
      {new Array(visibleDays).fill(0).map((_, index) => {
        // const date = addDays(new Date(), index)
        const date = addDays(startOfPeriod, index)
        return (
          <div key={index} className='flex-1 text-center text-2sm font-medium my-1'>
            {format(date, 'd')} {format(date, 'EEE')}
          </div>
        )
      })}
    </div>
  )
}

export default GridColumnLabels
