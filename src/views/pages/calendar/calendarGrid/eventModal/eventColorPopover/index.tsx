import React, { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Controller, useWatch } from 'react-hook-form'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'

const colorOptions = [
  {
    color: 'Green',
    hex: '#6FC81E'
  },
  {
    color: 'Blue',
    hex: '#006FD3'
  },
  {
    color: 'Purple',
    hex: '#5300AC'
  },
  {
    color: 'Pink',
    hex: '#B60786'
  },
  {
    color: 'Red',
    hex: '#E73130'
  },
  {
    color: 'Orange',
    hex: '#FF9420'
  }
]

interface Props {
  control: any
}

const EventColorPopover: React.FC<Props> = ({ control }) => {
  const [searchTermHex, setSearchTermHex] = useState<string>('')

  const filteredColors = colorOptions.filter(
    color =>
      color.color.toLowerCase().includes(searchTermHex.toLowerCase()) ||
      color.hex.toLowerCase().includes(searchTermHex.toLowerCase())
  )

  const { event_color } = useWatch({ control })

  console.log(event_color, 'event_color')

  return (
    <Popover>
      <PopoverButton className='mt-px text-[13px] flex items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
        <span className='w-4 h-4 rounded-full' style={{ background: event_color }} />
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
              name='event_color'
              render={({ field: { onChange, value } }) => (
                <div className='w-full'>
                  <div className='gap-3 flex items-center p-4'>
                    <Icon svgPath='hex' width={14} height={14} className='fill-transparent' />
                    <input
                      type='text'
                      placeholder='Type hex #000'
                      value={searchTermHex}
                      onChange={e => setSearchTermHex(e.target.value)}
                      className='w-full'
                    />
                  </div>
                  <div className='w-full h-px bg-grey-10' />
                  <div className='flex flex-col mt-2 px-4'>
                    {filteredColors.map((color, index) => (
                      <div
                        key={index}
                        className='flex items-center cursor-pointer'
                        onClick={() => {
                          setSearchTermHex('')
                          onChange(color.hex)
                        }}
                      >
                        <div className='w-4 h-4 rounded-full' style={{ background: color.hex }} />
                        <Typography type='subtitle' color='light' className='text-[13px] p-2'>
                          {color.color}
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
    </Popover>
  )
}

export default EventColorPopover
