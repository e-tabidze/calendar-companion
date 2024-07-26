import { addDays } from 'date-fns'
import { GridConstants } from 'src/@core/configs/calendarConstants'

const CalendarGrid = () => {
  return (
    <div className='flex flex-grow flex-col'>
      {new Array(GridConstants.rowsCount).fill(0).map((_, i) => (
        <div
          key={i}
          className={`flex flex-grow ${i === 0 ? 'z-10 bg-white' : ''}`}
          // style={i === 0 ? { top: '12%' } : {}} key={i}
        >
          {/* const date = addDays(new Date(), index); */}
          {new Array(7).fill(0).map((_, index) => (
            <div
              key={index}
              className='relative flex flex-1 flex-grow cursor-pointer border-b border-r border-solid border-r-strokes-1'
              style={{ height: `${GridConstants.hourCellHeight}vhh` }}
            >
              {/* Event components would go here */}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CalendarGrid
