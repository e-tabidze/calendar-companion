import React, { useRef } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Controller, useWatch } from 'react-hook-form'
import Typography from 'src/views/components/typography'

const goingOptions = [
  {
    option: 'Going',
    hex: '#61C554',
    going: 'yes'
  },
  {
    option: 'Not going',
    hex: '#FA6666',
    going: 'no'
  },
  {
    option: 'Maybe',
    hex: '#FFCA0C',
    going: 'maybe'
  }
]

interface Props {
  control: any
}

const GoingPopover: React.FC<Props> = ({ control }) => {
  const { going } = useWatch({ control })

  const selectedOption = goingOptions.find(option => option.going === going) || {
    option: 'Select Status',
    hex: '#FFFFFF'
  }

  const popoverRef = useRef(null)

  return (
    <Popover ref={popoverRef}>
      {({ close }) => (
        <>
          <PopoverButton className='mt-px text-[13px] w-[90px] flex items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
            <div
              className='w-4 h-[10px] rounded-full border border-[#00000026] mr-2'
              style={{ background: selectedOption.hex }}
            />
            {selectedOption.option}
          </PopoverButton>
          <PopoverPanel
            transition
            anchor='bottom'
            className='divide-y shadow-md divide-white/5 w-[160px] h-fit rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'
          >
            <div className=''>
              <div className='flex justify-between space-x-4 overflow-y-auto'>
                <Controller
                  control={control}
                  name='going'
                  render={({ field: { onChange } }) => (
                    <div className='w-full'>
                      <div className='flex flex-col mt-2'>
                        {goingOptions.map((goinOption, index) => (
                          <div
                            key={index}
                            className='flex items-center cursor-pointer hover:bg-gray-100 px-3'
                            onClick={() => {
                              onChange(goinOption.going)
                              close()
                            }}
                          >
                            <div
                              className='w-4 h-[10px] rounded-full border border-[#00000026]'
                              style={{ background: goinOption.hex }}
                            />
                            <Typography type='subtitle' color='light' className='text-[13px] ml-2 pb-1'>
                              {goinOption.option}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}

export default GoingPopover
