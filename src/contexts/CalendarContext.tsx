import { addDays, subDays, isBefore, getDate, isEqual } from 'date-fns'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { GridConstants } from 'src/@core/configs/calendarConstants'

interface CalendarContextProps {
  visibleDays: number
  setVisibleDays: (days: number) => void
  headerHeight: string
  setHeaderHeight: (height: string) => void
  cellHeight: number
  setCellHeight: (height: number) => void
  currentPeriod: Date
  setCurrentPeriod: (date: Date) => void
  handlePrevWeek: () => void
  handleNextWeek: () => void
  handleToday: () => void
  startOfPeriod: Date
  endOfPeriod: Date
  daysArray: number[]
  zoomLevel: number
  setZoomLevel: (zoom: number) => void
  selectedCalendars: any[]
  setSelectedCalendars: (calendars: any[]) => void
  addCalendar: (calendar: any) => void
  removeCalendar: (calendarId: string) => void
  clearSelectedCalendars: () => void
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined)

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState('99px')
  const [cellHeight, setCellHeight] = useState(GridConstants.hourCellHeight)
  const [currentPeriod, setCurrentPeriod] = useState(new Date())
  const [visibleDays, setVisibleDays] = useState<number>(7)
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [selectedCalendars, setSelectedCalendars] = useState<any[]>(() => {
    const savedCalendars = typeof window !== 'undefined' && localStorage.getItem('selectedCalendars')
    return savedCalendars ? JSON.parse(savedCalendars) : []
  })

  console.log(selectedCalendars, 'selectedCalendars')

  useEffect(() => {
    localStorage.setItem('selectedCalendars', JSON.stringify(selectedCalendars))
  }, [selectedCalendars])

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

  useEffect(() => {
    if (zoomLevel === 50) {
      const windowHeight = window.innerHeight
      const remainingHeight = windowHeight - parseInt(headerHeight)
      setCellHeight(remainingHeight / GridConstants.rowsCount)
    } else {
      const baseCellHeight = GridConstants.hourCellHeight
      const newHeight = baseCellHeight * (zoomLevel / 100)
      setCellHeight(newHeight)
    }
  }, [zoomLevel, headerHeight])

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
    localStorage.setItem('visibleDays', String(days))
    setVisibleDays(days)
  }

  const addCalendar = (calendar: any) => {
    setSelectedCalendars(prevCalendars => [...prevCalendars, calendar])
  }

  const removeCalendar = (calendarId: string) => {
    setSelectedCalendars(prevCalendars => prevCalendars.filter(cal => cal !== calendarId))
  }

  const clearSelectedCalendars = () => {
    setSelectedCalendars([])
  }

  const startOfPeriod = addDays(currentPeriod, 0)
  const endOfPeriod = addDays(currentPeriod, visibleDays - 1)

  const getDaysArray = (startDate: Date, endDate: Date): number[] => {
    const days = []
    let currentDate = startDate

    while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
      days.push(getDate(currentDate))
      currentDate = addDays(currentDate, 1)
    }

    return days
  }

  const daysArray = getDaysArray(startOfPeriod, endOfPeriod)

  return (
    <CalendarContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        cellHeight,
        setCellHeight,
        currentPeriod,
        setCurrentPeriod,
        visibleDays,
        setVisibleDays: handleVisibleDaysChange,
        handlePrevWeek,
        handleNextWeek,
        handleToday,
        startOfPeriod,
        endOfPeriod,
        daysArray,
        zoomLevel,
        setZoomLevel,
        selectedCalendars,
        setSelectedCalendars,
        addCalendar,
        removeCalendar,
        clearSelectedCalendars
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendarContext = () => {
  const context = useContext(CalendarContext)
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider')
  }

  return context
}
