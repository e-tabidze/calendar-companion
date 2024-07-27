import { addDays, subDays } from 'date-fns';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GridConstants } from 'src/@core/configs/calendarConstants';

interface CalendarContextProps {
  visibleDays: number;
  setVisibleDays: (days: number) => void;
  headerHeight: string;
  setHeaderHeight: (height: string) => void;
  cellHeight: number;
  setCellHeight: (height: number) => void;
  currentPeriod: Date;
  setCurrentPeriod: (date: Date) => void;
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
  handleToday: () => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState('99px');
  const [cellHeight, setCellHeight] = useState(GridConstants.hourCellHeight);
  const [currentPeriod, setCurrentPeriod] = useState(new Date());
  const [visibleDays, setVisibleDays] = useState<number>(7);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVisibleDays = localStorage.getItem('visibleDays');
      if (savedVisibleDays) {
        setVisibleDays(Number(savedVisibleDays));
      } else {
        localStorage.setItem('visibleDays', '7');
      }
    }
  }, []);

  const handlePrevWeek = () => {
    setCurrentPeriod(prevDate => subDays(prevDate, visibleDays));
  };

  const handleNextWeek = () => {
    setCurrentPeriod(prevDate => addDays(prevDate, visibleDays));
  };

  const handleToday = () => {
    setCurrentPeriod(new Date());
  };

  const handleVisibleDaysChange = (days: number) => {
    localStorage.setItem('visibleDays', String(days));
    setVisibleDays(days);
  };

//   useEffect(() => {
//     console.log('visibleDays updated in context:', visibleDays);
//   }, [visibleDays]);

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
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
};
