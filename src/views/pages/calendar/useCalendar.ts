import { addDays, subDays } from 'date-fns'
import { useState, useRef } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'

const useCalendar = () => {
  const [headerHeight, setHeaderHeight] = useState('99px')
  const [cellHeight, setCellHeight] = useState(GridConstants.hourCellHeight)
  const [currentPeriod, setCurrentPeriod] = useState(new Date())
  const [visibleDays, setVisibleDays] = useState(7)
  const currentHourCellRef = useRef<HTMLDivElement>(null)

  const handlePrevWeek = () => {
    setCurrentPeriod(prevDate => subDays(prevDate, visibleDays))
  }

  const handleNextWeek = () => {
    setCurrentPeriod(prevDate => addDays(prevDate, visibleDays))
  }

  const handleToday = () => {
    setCurrentPeriod(new Date())
  }

  return {
    headerHeight,
    cellHeight,
    currentHourCellRef,
    currentPeriod,
    setHeaderHeight,
    setCellHeight,
    handlePrevWeek,
    handleNextWeek,
    handleToday,
    visibleDays
  }
}

export default useCalendar
