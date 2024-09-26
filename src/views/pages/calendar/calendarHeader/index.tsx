import Icon from 'src/views/app/Icon'
import CurrentDays from './currentDays'
import CurrentWeekCount from './currentWeekCount'
import { DefaultButton, IconButton } from 'src/views/components/button'
import SettingsDropdownMenu from './settingsDropdownMenu'
import { useCalendarContext } from 'src/contexts/CalendarContext'
import SearchCalendarDropdown from './searchCalendarDropdown'

const CalendarHeader = () => {
  const { handlePrevWeek, handleNextWeek, handleToday } = useCalendarContext()

  return (
    <>
      <div className='top-0 z-20 w-full bg-white'>
        <div className='flex w-full justify-between border-b border-solid border-strokes-1 p-4 text-secondary-2'>
          <div className='flex items-center gap-4'>
            <Icon svgPath='calendar' width={24} height={24} />

            <CurrentDays />

            <CurrentWeekCount />

            <IconButton
              icon='arrowLeft'
              height={12}
              width={12}
              className='bg-grey-20 p-2 hover:bg-grey-60'
              onClick={handlePrevWeek}
            />

            <IconButton
              icon='arrowRight'
              height={12}
              width={12}
              className='bg-grey-20 p-2 hover:bg-grey-60'
              onClick={handleNextWeek}
            />

            <DefaultButton
              text='Today'
              className='text-xs w-[12] h-6 '
              bg='bg-primary-15'
              textColor='!text-primary-100'
              onClick={handleToday}
            />
          </div>

          <div className='flex items-center gap-4 text-sm'>
            <DefaultButton
              text='Invite companion now'
              bg='bg-primary-15'
              className='rounded-full py-1 text-2sm !text-primary-100'
            />
            <SearchCalendarDropdown />
            <DefaultButton text='Share Calendar' bg='bg-primary-100' className='rounded-full py-1 text-2sm' />
            <SettingsDropdownMenu />
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarHeader
