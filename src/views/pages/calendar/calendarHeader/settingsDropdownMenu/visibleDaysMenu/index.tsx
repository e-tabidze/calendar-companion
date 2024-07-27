import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import useCalendar from '../../../useCalendar'

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

interface Props {
  visibleDays: number
}

const VisibleDaysMenu: React.FC<Props> = ({ visibleDays }) => {
  const { handleVisibleDaysChange } = useCalendar()

  console.log(visibleDays, 'visibleDays')

  return (
    <div className='text-left relative'>
      <Menu>
        <MenuButton className='inline-flex items-center hover:bg-purple-10 w-full rounded gap-2 py-1.5 px-3 text-raisin-80 font-medium focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white'>
          Visible days
        </MenuButton>

        <MenuItems
          transition
          className='absolute right-[230px] w-52 !bg-white shadow-lg origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
        >
          {visibleDaysMenuItems.map(menuItem => (
            <MenuItem key={menuItem?.value}>
              <button
                className='group flex w-full items-center justify-between gap-2 text-raisin-90 font-medium rounded py-1.5 px-3 hover:bg-purple-10'
                onClick={() => handleVisibleDaysChange(menuItem.value)}
              >
                <span>{menuItem?.label}</span>
                <span>{menuItem?.value}</span>
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}

export default VisibleDaysMenu
