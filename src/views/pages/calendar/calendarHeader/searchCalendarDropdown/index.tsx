import { Fragment, useState } from 'react'
import { Transition, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import useSearchCalendarDropdown from './useSearchCalendarDropdown'
import CheckboxField from 'src/views/components/checkboxField'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'

const SearchCalendarDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const {
    googleCalendarsDataLoading,
    googleCalendarsData,
    control,
    selectedCalendars,
    appendSelectedCalendar,
    selectedCalendarsValues
  } = useSearchCalendarDropdown()

  console.log(selectedCalendarsValues, 'selectedCalendarsValues')

  // const filteredCalendars = googleCalendarsData?.filter((calendar: any) =>
  //   calendar.summary.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  return (
    <div className='w-fit'>
      <Popover>
        {({ open }) => (
          <>
            <PopoverButton className='h-[29px] border border-solid relative w-max flex items-center cursor-default rounded-full bg-white text-left focus:outline-none'>
              {/* <span className='flex items-center space-x-2'>
                {selectedCalendars
                  .filter((c: any) => c.selected)
                  .map((calendar: any) => (
                    <span key={calendar.id} className={`h-4 w-4 rounded-full ${calendar.color}`} />
                  ))}
                <span className='block truncate'>
                  {selectedCalendars.filter((c: any) => c.selected).length} calendars
                </span>
              </span> */}
              <span className='ml-3 '>5 Calendars</span>
              <div className='h-full w-px bg-raisin-10 mx-2' />
              <Icon
                svgPath='chevron'
                width={10}
                height={8}
                className={`mr-3 transform transition-all ${open ? 'rotate-180' : ''}`}
              />
            </PopoverButton>
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
                    Object.entries(googleCalendarsData)?.map((data: any[]) => (
                      <div>
                        <Typography type='subtitle' weight='medium' className='text-raisin-70 font-semibold mt-2 mb-1'>
                          {data[0]}
                        </Typography>
                        <div className='flex w-max items-center'>

                          <CheckboxField
                            name={`selected_calendars`}
                            control={control}
                            options={data[1]}
                            append={() => appendSelectedCalendar(selectedCalendars)}
                            svgPath="calendarSmall"
                          />

                        </div>
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
