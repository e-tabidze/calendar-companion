import { useCalendarContext } from 'src/contexts/CalendarContext'
import authHOC from 'src/hoc/authHOC'
import CalendarGrid from 'src/views/pages/calendar/calendarGrid'
import CalendarGridTimeline from 'src/views/pages/calendar/calendarGridTimeline'
import CalendarHeader from 'src/views/pages/calendar/calendarHeader'
import Dock from 'src/views/pages/calendar/dock'
import GridColumnLabels from 'src/views/pages/calendar/gridColumnLabels'

const Calendar = () => {
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
          <CalendarGrid />
        </div>
      </div>
      <Dock />
    </>
  )
}

export default authHOC(Calendar)
