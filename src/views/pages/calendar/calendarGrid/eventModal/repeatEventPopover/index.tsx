import React, { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Controller, useWatch } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'

const repeatOptions = [
  {
    header: 'Repeat Daily',
    options: ['Every day', 'Every weekday', 'Every Thursday', 'Every other Thursday']
  },
  {
    header: 'Repeat Monthly',
    options: ['Monthly on the 14th', 'Monthly on the 2nd Thursday']
  },
  {
    header: 'Repeat Yearly',
    options: ['Every year on September 14th']
  }
]

interface Props {
  control: any
}

const RepeatEventPopover: React.FC<Props> = ({ control }) => {
  const [searchTermStart, setSearchTermStart] = useState<string>('')

  return (
    <Popover>
      <PopoverButton className='mt-px text-[13px] flex items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
        <Icon svgPath='repeat' width={14} height={14} className='fill-transparent' />
        Repeat
      </PopoverButton>
      <PopoverPanel
        transition
        anchor='bottom'
        className='divide-y shadow-md divide-white/5 w-[236px] h-fit rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'
      >
        <div className=''>
          <div className='flex justify-between space-x-4 overflow-y-auto'>
            <Controller
              control={control}
              name='repeat_option'
              render={({ field: { onChange, value } }) => (
                <div className='w-full'>
                  <div className='gap-3 flex items-center p-4'>
                    <Icon svgPath='repeat' width={14} height={14} className='fill-transparent' />
                    <input
                      type='text'
                      placeholder='Search Combination'
                      value={searchTermStart}
                      onChange={e => setSearchTermStart(e.target.value)}
                      className='w-full'
                    />
                  </div>
                  <div className='w-full h-px bg-grey-10' />
                  <div className='flex flex-col mt-2 px-4'>
                    {repeatOptions.map((section, index) => (
                      <div key={index}>
                        <Typography type='subtitle' color='light' className='text-[13px] p-2 mb-1'>
                          {section.header}
                        </Typography>
                        <ul className='dropdown-list'>
                          {section.options.map((option, optionIndex) => (
                            <li key={optionIndex} className='bg-primary-15 mb-1 rounded-[2px] p-2'>
                              <Typography type='subtitle' className='text-[13px]'>
                                {option}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </div>
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

export default RepeatEventPopover
