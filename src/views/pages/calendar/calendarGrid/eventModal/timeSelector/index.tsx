import React, { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Controller, useWatch } from 'react-hook-form'
import Icon from 'src/views/app/Icon'

const generateTimeSlots = (startHour: number, endHour: number, interval: number): string[] => {
  const slots: string[] = []
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      const period = hour < 12 ? 'AM' : 'PM'
      const displayHour = hour % 12 === 0 ? 12 : hour % 12
      const timeString = `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
      slots.push(timeString)
    }
  }
  return slots
}

interface Props {
  control: any
}

const TimeSelector: React.FC<Props> = ({ control }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const times = generateTimeSlots(3, 16, 15)

  const filteredTimes = times.filter(time => time.includes(searchTerm))

  const { selected_start_hour, selected_end_hour } = useWatch({ control })

  const formState = useWatch({ control })

  console.log(formState, 'formState')

  return (
    <Popover>
      <PopoverButton className='block mt-px text-[13px] w-[140px] font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
        {selected_start_hour && selected_end_hour ? `${selected_start_hour} - ${selected_end_hour}` : 'Select time'}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor='bottom'
        className='divide-y shadow-md divide-white/5 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'
        style={{ maxWidth: '200px', maxHeight: '170px' }}
      >
        <div className='p-4'>
          <div className='flex justify-between space-x-4 overflow-y-auto'>
            <Controller
              control={control}
              name='selected_start_hour'
              render={({ field: { onChange, value } }) => (
                <div className=''>
                  <div className='gap-3 flex items-center'>
                    <Icon svgPath='clock' width={14} height={14} className='fill-transparent' />
                    <input
                      type='text'
                      placeholder='From'
                      value={value || searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className='w-8'
                    />
                  </div>
                  <div className='flex flex-col h-[140px] overflow-y-auto mt-2'>
                    {filteredTimes.map(time => (
                      <button
                        key={time}
                        onClick={() => {
                          setSearchTerm('') // Reset search term
                          onChange(time) // Pass selected time to react-hook-form
                        }}
                        className={`py-1 w-[102px] rounded ${
                          value === time ? 'bg-primary-15 text-primary-100' : 'bg-grey-70 text-raisin-100 mb-1'
                        } hover:bg-orange-200`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            />
            <Controller
              control={control}
              name='selected_end_hour'
              render={({ field: { onChange, value } }) => (
                <div className=''>
                  <div className='gap-3 flex items-center'>
                    <Icon svgPath='clock' width={14} height={14} className='fill-transparent' />
                    <input
                      type='text'
                      placeholder='To'
                      value={value || searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className='w-8'
                    />
                  </div>
                  <div className='flex flex-col h-[140px] overflow-y-auto mt-2'>
                    {filteredTimes.map(time => (
                      <button
                        key={time}
                        onClick={() => {
                          setSearchTerm('') // Reset search term
                          onChange(time) // Pass selected time to react-hook-form
                        }}
                        className={`py-1 w-[102px] rounded ${
                          value === time ? 'bg-primary-15 text-primary-100' : 'bg-grey-70 text-raisin-100 mb-1'
                        } hover:bg-orange-200`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            />

            {/* <Controller
              control={control}
              name='start_time'
              render={({ field: { onChange, value } }) => (
                <div className='flex flex-col overflow-y-auto'>
                  <Icon svgPath='clock' width={14} height={14} />
                  <input
                    type='text'
                    placeholder='Search time'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className='mb-2 p-1 border border-gray-300 rounded w-full'
                  />
                  <label className='mb-2 font-semibold'>From</label>
                  {filteredTimes.map(time => (
                    <button
                      key={time}
                      onClick={() => handleFromSelect(time)}
                      className={`p-2 rounded ${
                        fromTime === time ? 'bg-orange-500 text-white' : 'bg-white border border-gray-300'
                      } hover:bg-orange-200`}
                      disabled={fromTime && time < fromTime} // Disable times before selected fromTime
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            /> */}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export default TimeSelector
