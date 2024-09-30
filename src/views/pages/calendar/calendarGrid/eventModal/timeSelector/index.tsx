import React, { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Controller } from 'react-hook-form'
import Icon from 'src/views/app/Icon'

const generateTimeSlots = (startHour: number, endHour: number, interval: number): string[] => {
  const slots: string[] = []
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} AM`
      slots.push(timeString)
    }
  }
  return slots
}

interface Props {
  control: any
}

const TimeSelector: React.FC<Props> = ({ control }) => {
  const [fromTime, setFromTime] = useState<string | null>(null)
  const [toTime, setToTime] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const times = generateTimeSlots(3, 16, 15)

  const handleFromSelect = (time: string) => {
    setFromTime(time)
  }

  const handleToSelect = (time: string) => {
    setToTime(time)
  }

  const filteredTimes = times.filter(time => time.includes(searchTerm))

  return (
    <Popover>
      <PopoverButton className='block mt-px text-[13px] font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
        Solutions
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
              name='start_time'
              render={({ field: { onChange, value } }) => (
                <div className=''>
                  <div className='gap-3 flex items-center'>
                    <Icon svgPath='clock' width={14} height={14} className='fill-transparent' />
                    <input
                      type='text'
                      placeholder='From'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className='w-8'
                    />
                  </div>
                  <div className='flex flex-col h-[140px] overflow-y-auto mt-2'>
                    {filteredTimes.map(time => (
                      <button
                        key={time}
                        onClick={() => handleFromSelect(time)}
                        className={`py-1 w-[102px] rounded ${
                          fromTime === time ? 'bg-primary-15 text-primary-100' : 'bg-grey-70 text-raisin-100 mb-1'
                        } hover:bg-orange-200`}
                        disabled={fromTime && time < fromTime}
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
              name='end_time'
              render={({ field: { onChange, value } }) => (
                <div className=''>
                  <div className='gap-3 flex items-center'>
                    <Icon svgPath='clock' width={14} height={14} className='fill-transparent' />
                    <input
                      type='text'
                      placeholder='To'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className='w-8'
                    />
                  </div>
                  <div className='flex flex-col h-[140px] overflow-y-auto mt-2'>
                    {filteredTimes.map(time => (
                      <button
                        key={time}
                        onClick={() => handleFromSelect(time)}
                        className={`py-1 w-[102px] rounded ${
                          fromTime === time ? 'bg-primary-15 text-primary-100' : 'bg-grey-70 text-raisin-100 mb-1'
                        } hover:bg-orange-200`}
                        disabled={fromTime && time < fromTime}
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
