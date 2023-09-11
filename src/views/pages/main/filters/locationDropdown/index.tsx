import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer, ListItemBtn } from './styles'

const LocationDropdown = () => {
  return (
    <Menu as='div' className='relative inline-block text-left w-full sm:max-w-72'>
      <Menu.Button className='py-5 px-4 inline-flex w-full justify-center rounded-md bg-raisin bg-opacity-20 text-sm font-medium text-white focus-visible:ring-white focus-visible:ring-opacity-75'>
        <FilterContainer>
          <Typography type='body' color='dark'>
            ადგილმდებარეობა
          </Typography>
          <InnerFilterContainer>
            <Typography type='subtitle' className='text-raisin-50'>
              ქალაქი, აეროპორტი, მისამართი...
            </Typography>
            <Image src='/icons/chevron.svg' className='inline fill-white m-2' alt='img' />
          </InnerFilterContainer>
        </FilterContainer>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-10 p-4 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
          <div className='px-1 py-1 '>
            <Menu.Item>
              <ListItemBtn>
                <Image src='/icons/globe.svg' alt='location' />
                Edit
              </ListItemBtn>
            </Menu.Item>
            <Menu.Item>
              <ListItemBtn>
                <Image src='/icons/globe.svg' alt='location' />
                Edit
              </ListItemBtn>
            </Menu.Item>
            <Menu.Item>
              <ListItemBtn>
                <Image src='/icons/globe.svg' alt='location' />
                Edit
              </ListItemBtn>
            </Menu.Item>
            <Menu.Item>
              <ListItemBtn>
                <Image src='/icons/globe.svg' alt='location' />
                Edit
              </ListItemBtn>
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              <ListItemBtn>
                <Image src='/icons/globe.svg' alt='location' />
                Edit
              </ListItemBtn>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LocationDropdown
