import React, { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Controller, useWatch } from 'react-hook-form'
import Icon from 'src/views/app/Icon'

const generateTimeSlots = (startHour: number, endHour: number, interval: number): string[] => {
  const slots: string[] = []
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      if (hour === 24 && minutes > 0) break
      const timeString = `${hour === 24 ? '24' : hour.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
      slots.push(timeString)
    }
  }
  return slots
}

interface Props {
  control: any
}

const TimeSelectorPopover: React.FC<Props> = ({ control }) => {
  const [searchTermStart, setSearchTermStart] = useState<string>('')
  const [searchTermEnd, setSearchTermEnd] = useState<string>('')

  const times = generateTimeSlots(0, 24, 15)

  const filteredTimesStart = times.filter(time => time.includes(searchTermStart))
  const filteredTimesEnd = times.filter(time => time.includes(searchTermEnd))

  const { selected_start_hour, selected_end_hour } = useWatch({ control })

  return (
    <Popover>
      <PopoverButton className='block mt-px text-[13px] w-[84px] text-left font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
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
                      value={searchTermStart}
                      onChange={e => setSearchTermStart(e.target.value)}
                      className='w-8'
                    />
                  </div>
                  <div className='flex flex-col h-[140px] overflow-y-auto mt-2'>
                    {filteredTimesStart.map(time => (
                      <button
                        key={time}
                        onClick={() => {
                          setSearchTermStart('')
                          onChange(time)
                        }}
                        className={`py-1 w-[102px] rounded mb-1 ${
                          value === time ? 'bg-primary-15 text-primary-100' : 'bg-grey-70 text-raisin-100'
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
                      value={searchTermEnd}
                      onChange={e => setSearchTermEnd(e.target.value)}
                      className='w-8'
                    />
                  </div>
                  <div className='flex flex-col h-[140px] overflow-y-auto mt-2'>
                    {filteredTimesEnd.map(time => (
                      <button
                        key={time}
                        onClick={() => {
                          setSearchTermEnd('')
                          onChange(time)
                        }}
                        className={`py-1 w-[102px] rounded mb-1 ${
                          value === time ? 'bg-primary-15 text-primary-100' : 'bg-grey-70 text-raisin-100'
                        } hover:bg-primary-15`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}

export default TimeSelectorPopover
