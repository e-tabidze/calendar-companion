import { addDays, subDays } from 'date-fns'
import { useState, useRef, useEffect } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'

const useCalendar = () => {
  const [headerHeight, setHeaderHeight] = useState('99px')
  const [cellHeight, setCellHeight] = useState(GridConstants.hourCellHeight)
  const [currentPeriod, setCurrentPeriod] = useState(new Date())
  const [visibleDays, setVisibleDays] = useState<number>(7)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVisibleDays = localStorage.getItem('visibleDays')
      if (savedVisibleDays) {
        setVisibleDays(Number(savedVisibleDays))
      } else {
        localStorage.setItem('visibleDays', '7')
      }
    }
  }, [])

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

  const handleVisibleDaysChange = (days: number) => {
    localStorage?.setItem('visibleDays', String(days))
    setVisibleDays(days)
  }

  useEffect(() => {
    console.log('visibleDays updated:', visibleDays);
  }, [visibleDays]);

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
    visibleDays,
    handleVisibleDaysChange
  }
}

export default useCalendar
