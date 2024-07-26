import CalendarGrid from 'src/views/pages/calendar/calendarGrid'
import CalendarGridTimeline from 'src/views/pages/calendar/calendarGridTimeline'
import CalendarHeader from 'src/views/pages/calendar/calendarHeader'
import GridColumnLabels from 'src/views/pages/calendar/gridColumnLabels'
import useCalendar from 'src/views/pages/calendar/useCalendar'

const Calendar = () => {
  const { headerHeight, currentPeriod, handlePrevWeek, handleNextWeek, handleToday } = useCalendar()

  return (
    <>
      <CalendarHeader handlePrevWeek={handlePrevWeek} handleNextWeek={handleNextWeek} handleToday={handleToday} currentPeriod={currentPeriod} />
      <GridColumnLabels currentPeriod={currentPeriod} />

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
