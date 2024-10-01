import { Fragment, useEffect, useState } from 'react'
import { Transition, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { useCalendarContext } from 'src/contexts/CalendarContext'
import useSearchCalendarDropdown from '../../../calendarHeader/searchCalendarDropdown/useSearchCalendarDropdown'
import { Controller } from 'react-hook-form'

interface Props {
  control: any
}

const SearchCalendarDropdown: React.FC<Props> = ({ control }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const { googleCalendarsDataLoading, googleCalendarsData } = useSearchCalendarDropdown()

  return (
    <div className='w-fit'>
      <Popover>
        <PopoverButton className='mt-px text-[13px] flex items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
          <Icon svgPath='calendarCircle' width={22} height={22} />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor='bottom'
          className='divide-y shadow-md divide-white/5 w-fit h-fit rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'
        >
          <div className='flex items-center pl-3 pt-3 pb-1 pr-[50px]'>
            <Icon svgPath='calendar' width={13} height={13} className='fill-transparent' />
            <input
              placeholder='Select calendar'
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

                  {data[1]?.map((calendar: any) => (
                    <Controller
                      control={control}
                      name='selected_calendar'
                      render={({ field: { onChange, value } }) => (
                        <div
                          key={calendar.id}
                          className='flex items-center gap-3 cursor-pointer transition-all py-2'
                          onClick={() => onChange(calendar.id)}
                        >
                          <span
                            className={`flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full border cursor-pointer ${
                              value === calendar.id
                                ? 'border-primary-100 bg-primary-100'
                                : 'border-grey-10 bg-grey-70'
                            }`}
                          >
                            {value === calendar.id && <span className='w-3 h-3 rounded-full bg-primary-100 border border-white' />}
                          </span>

                          <label htmlFor={calendar.id} className='flex items-center cursor-pointer'>
                            <Icon svgPath='calendarSmall' width={18} height={18} color={calendar.backgroundColor} />
                            <Typography type='body' className='w-max text-sm lg:text-2sm ml-2'>
                              {calendar.summary}
                            </Typography>
                          </label>
                        </div>
                      )}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  )
}

export default SearchCalendarDropdown
