import Icon from 'src/views/app/Icon'
import CurrentDays from './currentDays'
import CurrentWeekCount from './currentWeekCount'
import { DefaultButton, IconButton } from 'src/views/components/button'
import SettingsDropdownMenu from './settingsDropdownMenu'

interface Props {
  handlePrevWeek: () => void
  handleNextWeek: () => void
  handleToday: () => void
  currentPeriod: Date
  visibleDays: number
}

const CalendarHeader: React.FC<Props> = ({ handlePrevWeek, handleNextWeek, handleToday, currentPeriod, visibleDays }) => {
  return (
    <>
      <div className='top-0 z-20 w-full bg-white'>
        <div className='flex w-full justify-between border-b border-solid border-strokes-1 p-4 text-secondary-2'>
          <div className='flex items-center gap-4'>
            <Icon svgPath='calendar' width={24} height={24} />

            <CurrentDays currentPeriod={currentPeriod} visibleDays={visibleDays} />

            <CurrentWeekCount currentPeriod={currentPeriod} />

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
              bg='bg-purple-10'
              textColor='!text-purple-100'
              onClick={handleToday}
            />
          </div>

          <div className='flex items-center gap-4 text-sm'>
            <DefaultButton
              text='Invite companion now'
              bg='bg-purple-10'
              className='rounded-full py-1 text-2sm !text-purple-100'
            />
            <DefaultButton text='0 Calendars' bg='bg-purple-100' className='rounded-full py-1 text-2sm' />
            <DefaultButton text='Share Calendar' bg='bg-purple-100' className='rounded-full py-1 text-2sm' />
            <SettingsDropdownMenu visibleDays={visibleDays} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarHeader
