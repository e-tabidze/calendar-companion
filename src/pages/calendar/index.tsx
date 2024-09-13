import { useState } from 'react'
import { useCalendarContext } from 'src/contexts/CalendarContext'
import authHOC from 'src/hoc/authHOC'
import CalendarGrid from 'src/views/pages/calendar/calendarGrid'
import EventModal from 'src/views/pages/calendar/calendarGrid/eventModal'
import CalendarGridTimeline from 'src/views/pages/calendar/calendarGridTimeline'
import CalendarHeader from 'src/views/pages/calendar/calendarHeader'
import Dock from 'src/views/pages/calendar/dock'
import GridColumnLabels from 'src/views/pages/calendar/gridColumnLabels'

const Calendar = () => {
  const [eventModal, setEventModal] = useState(false)
  const [showDock, setShowDock] = useState(true)

  const toggleEventModal = () => {
    setShowDock(!showDock)
    setEventModal(!eventModal)
  }
  const { headerHeight } = useCalendarContext()

  return (
    <>
      <div className='fixed top-0 w-full z-40'>
        <CalendarHeader />
        <GridColumnLabels />
      </div>
      <div style={{ marginTop: headerHeight }}>
        <div className='flex min-w-full max-w-full flex-1'>
          <CalendarGridTimeline />
          <CalendarGrid toggleEventModal={toggleEventModal} />
        </div>
      </div>
      {/* {showDock ? <Dock /> : <EventModal isOpen={eventModal} toggleIsOpen={toggleEventModal} />} */}
      <Dock />
      <EventModal isOpen={eventModal} toggleIsOpen={toggleEventModal} />
    </>
  )
}

export default authHOC(Calendar)
