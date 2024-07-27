import CalendarGrid from 'src/views/pages/calendar/calendarGrid'
import CalendarGridTimeline from 'src/views/pages/calendar/calendarGridTimeline'
import CalendarHeader from 'src/views/pages/calendar/calendarHeader'
import GridColumnLabels from 'src/views/pages/calendar/gridColumnLabels'
import useCalendar from 'src/views/pages/calendar/useCalendar'

const Calendar = () => {
  const { headerHeight, currentPeriod, handlePrevWeek, handleNextWeek, handleToday, visibleDays } = useCalendar()

  return (
    <>
      <div className='fixed top-0 w-full z-40'>
        <CalendarHeader
          handlePrevWeek={handlePrevWeek}
          handleNextWeek={handleNextWeek}
          handleToday={handleToday}
          currentPeriod={currentPeriod}
          visibleDays={visibleDays}
        />
        <GridColumnLabels currentPeriod={currentPeriod} visibleDays={visibleDays} />
      </div>

      <div style={{ marginTop: headerHeight }}>
        <div className='flex min-w-full max-w-full flex-1'>
          <CalendarGridTimeline />
          <CalendarGrid visibleDays={visibleDays} />
        </div>
      </div>
    </>
  )
}

export default Calendar
