import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Icon from 'src/views/app/Icon'
import VisibleDaysMenu from './visibleDaysMenu'
import { IconButton } from 'src/views/components/button'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const SettingsDropdownMenu = () => {
  const { zoomLevel, setZoomLevel } = useCalendarContext()

  const handleZoomIn = () => {
    if (zoomLevel < 150) {
      setZoomLevel((prev: number) => prev + 10)
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel((prev: number) => prev - 10)
    }
  }

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
          <div className=''>
            <VisibleDaysMenu />
            <div className='flex justify-between items-center rounded px-6 transition font-medium border-y border-raisin-10 py-3 my-2'>
              <p className='font-semibold text-raisin-80'>
                Zoom <span className='text-raisin-30 ml-1'>{zoomLevel}%</span>
              </p>
              <div className='flex gap-2'>
                <IconButton icon='plus' width={18} height={18} onClick={handleZoomIn} />
                <IconButton icon='minus' width={18} height={18} onClick={handleZoomOut} />
              </div>
            </div>
            <a className='block rounded py-2 px-3 transition font-medium hover:bg-primary-15' href='#'>
              <p className='font-semibold text-raisin-80'>Log out</p>
            </a>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  )
}

export default SettingsDropdownMenu
