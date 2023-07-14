import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const LocationDropdown = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  return (
    <Menu as='div' className='inline-block text-left mx-2 w-full tablet:max-w-72'>
      <Menu.Button className='py-5 px-4 inline-flex w-full justify-center rounded-md bg-raisin bg-opacity-20 text-sm font-medium text-white focus-visible:ring-white focus-visible:ring-opacity-75'>
        <FilterContainer>
          <Typography type='body' color='dark'>
            ქირაობის პერიოდი
          </Typography>
          <InnerFilterContainer>
            <Typography type='subtitle' className='text-raisin-50'>
              აირჩიეთ თარიღი და დრო
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
        <Menu.Items className='absolute z-10 p-4 right-0 mt-4 w-full flex justify-center origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
          <DatePicker
            className='text-center border-l-4 border-red-500  w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-transparent'
            inline
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            monthsShown={2}
            onChange={(update: any) => {
              setDateRange(update)
            }}
            minDate={new Date()}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LocationDropdown
