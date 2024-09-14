import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useCalendarContext } from 'src/contexts/CalendarContext'
import Icon from 'src/views/app/Icon'

const visibleDaysMenuItems = [
  {
    value: 1,
    label: '1 Day'
  },
  {
    value: 2,
    label: '2 Days'
  },
  {
    value: 3,
    label: '3 Days'
  },
  {
    value: 4,
    label: '4 Days'
  },
  {
    value: 5,
    label: '5 Days'
  },
  {
    value: 6,
    label: '6 Days'
  },
  {
    value: 7,
    label: '7 Days'
  }
]

const VisibleDaysMenu = () => {
  const { setVisibleDays, visibleDays } = useCalendarContext()

  return (
    <div className='text-left relative mx-3 my-2'>
      <Menu>
        {({ open }) => (
          <>
            <MenuButton
              className={`inline-flex items-center hover:bg-primary-10 w-full rounded gap-2 py-1.5 px-2  font-medium focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white transition ${
                open ? 'bg-primary-15 text-primary-100' : 'text-raisin-80'
              }`}
            >
              Visible days
            </MenuButton>

            <MenuItems
              transition
              className='absolute right-[230px] w-52 !bg-white shadow-lg origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
            >
              {visibleDaysMenuItems.map(menuItem => (
                <MenuItem key={menuItem?.value}>
                  <button
                    className={`group flex w-full items-center justify-between gap-2 text-raisin-90 font-medium rounded py-1.5 px-3 hover:bg-primary-10 ${
                      visibleDays === menuItem.value ? 'bg-primary-10 pointer-events-none' : ''
                    }`}
                    onClick={() => setVisibleDays(menuItem.value)}
                  >
                    <span>{menuItem?.label}</span>
                    {visibleDays === menuItem?.value ? (
                      <Icon svgPath='tick' width={16} height={16} />
                    ) : (
                      <span>{menuItem?.value}</span>
                    )}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  )
}

export default VisibleDaysMenu
