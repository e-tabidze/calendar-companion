import { useState } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'
import EventModal from './eventModal'

const CalendarGrid = () => {
  const [eventModal, setEventModal] = useState(false)

  const toggleEventModal = () => setEventModal(!eventModal)
  return (
    <>
      <div className='flex flex-grow flex-col z-0'>
        {new Array(GridConstants.rowsCount).fill(0).map((_, i) => (
          <div key={i} className={`flex flex-grow ${i === 0 ? 'z-10 bg-white' : ''}`}>
            {new Array(7).fill(0).map((_, index) => (
              <div
                onClick={toggleEventModal}
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
      <EventModal isOpen={eventModal} toggeIsOpen={toggleEventModal} />
    </>
  )
}

export default CalendarGrid
