import { addDays, subDays } from 'date-fns'
import { useState, useRef } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'

const useCalendar = () => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [cellHeight, setCellHeight] = useState(GridConstants.hourCellHeight)
  const [currentPeriod, setCurrentPeriod] = useState(new Date())
  const currentHourCellRef = useRef<HTMLDivElement>(null)

  const handlePrevWeek = () => {
    setCurrentPeriod(prevDate => subDays(prevDate, 7))
  }

  const handleNextWeek = () => {
    setCurrentPeriod(prevDate => addDays(prevDate, 7))
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
    handleToday
  }
}

export default useCalendar
