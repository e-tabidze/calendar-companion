import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import VisibleDaysMenu from './visibleDaysMenu'

const SettingsDropdownMenu = () => {
  return (
    <div className='relative'>
      <Popover>
        <PopoverButton className='block text-sm/6 font-semibold focus:outline-none data-[focus]:outline-1'>
          <Icon svgPath='settings' width={24} height={24} />
        </PopoverButton>
        <PopoverPanel
          transition
          className='bg-white z-40 w-60 shadow-lg absolute right-0 top-10 rounded-xl  transition duration-200 ease-in-out  data-[closed]:opacity-0'
        >
          <div className='p-3'>
            <VisibleDaysMenu />
            <a className='block rounded py-2 px-3 transition font-medium hover:bg-purple-10' href='#'>
              <p className='font-semibold text-raisin-80'>Automations</p>
            </a>
            <a className='block rounded py-2 px-3 transition font-medium hover:bg-purple-10' href='#'>
              <p className='font-semibold text-raisin-80'>Reports</p>
            </a>
            <a className='block rounded py-2 px-3 transition font-medium hover:bg-purple-10' href='#'>
              <p className='font-semibold text-raisin-80'>Log out</p>
            </a>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  )
}

export default SettingsDropdownMenu
