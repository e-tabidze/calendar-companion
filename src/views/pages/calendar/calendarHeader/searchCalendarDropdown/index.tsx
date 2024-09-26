import { Fragment, useEffect, useState } from 'react'
import { Transition, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import useSearchCalendarDropdown from './useSearchCalendarDropdown'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const SearchCalendarDropdown = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const [searchTerm, setSearchTerm] = useState('')

  const { googleCalendarsDataLoading, googleCalendarsData } = useSearchCalendarDropdown()

  const { selectedCalendars, addCalendar, removeCalendar } = useCalendarContext()

  const handleCheckboxClick = (calendar: any) => {
    if (selectedCalendars.some(c => c.id === calendar.id)) {
      removeCalendar(calendar.id)
    } else {
      addCalendar(calendar)
    }
  }

  return (
    <div className='w-fit'>
  
      <Popover>
        {({ open }) => (
          <>
            {selectedCalendars && (
              <PopoverButton className='h-[29px] border border-solid relative w-max flex items-center cursor-default rounded-full bg-white text-left focus:outline-none pl-3'>
                {isMounted &&
                  selectedCalendars?.map((calendar: any) => (
                    <span
                      key={calendar.id}
                      className={`h-4 w-4 rounded-full border-2 border-[#fff] -ml-[6px]`}
                      style={{ backgroundColor: calendar.backgroundColor }}
                    />
                  ))}
                {isMounted && <span className='block truncate'>{selectedCalendars?.length} calendars</span>}
                <div className='h-full w-px bg-raisin-10 mx-2' />
                <Icon
                  svgPath='chevron'
                  width={10}
                  height={8}
                  className={`mr-3 transform transition-all ${open ? 'rotate-180' : ''}`}
                />
              </PopoverButton>
            )}
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <PopoverPanel className='absolute mt-4 right-40  w-[300px] h-[350px] overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                <div className='flex items-center pl-3 pt-3 pb-1 pr-[50px]'>
                  <Icon svgPath='search' width={13} height={13} className='fill-transparent' />
                  <input
                    placeholder='Search calendar'
                    className='ml-2 w-full'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className='h-px w-full bg-raisin-10 mt-3' />

                <div className='pl-3 pb-3 pt-1 pr-[50px]'>
                  {googleCalendarsDataLoading ? (
                    <>Loading</>
                  ) : (
                    googleCalendarsData &&
                    Object.entries(googleCalendarsData)?.map((data: any[], index: number) => (
                      <div key={index}>
                        <Typography type='subtitle' weight='medium' className='text-raisin-70 font-semibold mt-2 mb-1'>
                          {data[0]}
                        </Typography>

                        {data[1]?.map((calendar: any) => (
                          <div key={calendar.id} className='flex items-center gap-3 cursor-pointer transition-all py-2'>
                            <span
                              className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded border cursor-pointer ${
                                selectedCalendars.some(c => c.id === calendar.id)
                                  ? 'border-primary-100 bg-primary-100 !fill-red-100'
                                  : 'border-raisin-10'
                              }`}
                            >
                              <Icon
                                svgPath='check'
                                height={11}
                                width={11}
                                className={`fill-transparent cursor-pointer ${
                                  selectedCalendars.some(c => c.id === calendar.id) ? 'fill-white' : ''
                                }`}
                              />
                            </span>
                            <input
                              type='checkbox'
                              id={calendar.id}
                              checked={selectedCalendars.some(c => c.id === calendar.id)}
                              onChange={() => handleCheckboxClick(calendar)}
                              className='absolute opacity-0 w-5 h-5 cursor-pointer'
                            />
                            <label htmlFor={calendar.id} className='flex items-center cursor-pointer'>
                              <Icon svgPath='calendarSmall' width={18} height={18} color={calendar.backgroundColor} />
                              <Typography type='body' className='w-max text-sm lg:text-2sm ml-2'>
                                {calendar.summary}
                              </Typography>
                            </label>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SearchCalendarDropdown
