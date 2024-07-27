import { useCalendarContext } from 'src/contexts/CalendarContext'
import CalendarGrid from 'src/views/pages/calendar/calendarGrid'
import CalendarGridTimeline from 'src/views/pages/calendar/calendarGridTimeline'
import CalendarHeader from 'src/views/pages/calendar/calendarHeader'
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
    </>
  )
}

export default Calendar
