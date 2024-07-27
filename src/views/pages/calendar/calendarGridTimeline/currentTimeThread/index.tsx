import { useEffect, useState } from 'react'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const CurrentTimeThread = () => {
  const { cellHeight } = useCalendarContext()
  const [currentHourOffset, setCurrentHourOffset] = useState<number | null>(null)

  useEffect(() => {
    const calculateCurrentHourOffset = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const totalMinutes = currentHour * 60 + currentMinute
      const offset = (totalMinutes * cellHeight) / 60
      setCurrentHourOffset(offset)
    }

    calculateCurrentHourOffset()

    window.addEventListener('resize', calculateCurrentHourOffset)
    window.addEventListener('scroll', calculateCurrentHourOffset)

    return () => {
      window.removeEventListener('resize', calculateCurrentHourOffset)
      window.removeEventListener('scroll', calculateCurrentHourOffset)
    }
  }, [cellHeight])

  return (
    <>
      {currentHourOffset !== null && (
        <div
          className='absolute ml-9 flex h-[1px] flex-row items-center bg-red-500 w-[calc(100vw-36px)] z-30'
          style={{ top: currentHourOffset }}
        >
          <div className='h-2 w-2 rounded-full bg-red-100' />
          <div className='flex h-[1px] flex-grow bg-red-100' />
        </div>
      )}
    </>
  )
}

export default CurrentTimeThread
