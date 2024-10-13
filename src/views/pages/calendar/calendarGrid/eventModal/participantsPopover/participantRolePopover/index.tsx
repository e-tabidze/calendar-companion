import { useEffect, useRef, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import Typography from 'src/views/components/typography'
import { useQuery } from '@tanstack/react-query'
import { IconButton } from 'src/views/components/button'

interface Props {
  control: any
}

const ParticipantRolePopover: React.FC<Props> = ({ control }) => {
  const popoverRef = useRef(null)

  return (
    <div className='w-full'>
      <Popover ref={popoverRef}>
        <PopoverButton className='mt-px text-[13px] w-full justify-between flex items-center gap-1 font-semibold text-grey-90 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
          <div className='flex'>
            Role <br /> Editor
            <Icon svgPath='arrowDown' width={18} height={18} />
          </div>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor='bottom'
          className='divide-y shadow-md divide-white/5 w-[130px] h-fit rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'
        >
          <div className='px-3 py-2 w-full'>
            <Typography type='subtitle' color='light' className='my-2 px-2 py-1 hover:bg-grey-70 w-full cursor-pointer'>
              Editor
            </Typography>
            <Typography type='subtitle' color='light' className='my-2 px-2 py-1 hover:bg-grey-70 w-full cursor-pointer'>
              Viewer
            </Typography>
            <Typography type='subtitle' color='light' className='my-2 px-2 py-1 hover:bg-grey-70 w-full cursor-pointer'>
              Set for all
            </Typography>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  )
}

export default ParticipantRolePopover
