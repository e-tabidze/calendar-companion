import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Typography from 'src/views/components/typography'
import { DateSelectContainer, InnerDateSelectContainer } from './styles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'

interface Props {
  label: string
}

const DateDropdown: React.FC<Props> = ({ label }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <Menu as='div' className='inline-block text-left w-full border border-raisin-10 rounded-xl'>
      <Menu.Button className='inline-flex w-full justify-center rounded-md text-sm font-medium text-white focus-visible:ring-white focus-visible:ring-opacity-75'>
        <DateSelectContainer>
          <InnerDateSelectContainer>
            <Image src='/icons/calendar.svg' alt='' height={24} width={24} />
            <Typography type='subtitle'>{label}</Typography>
          </InnerDateSelectContainer>
          <Image src='/icons/chevron.svg' className='inline fill-white m-2' alt='img' height={6} width={10} />
        </DateSelectContainer>
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
        <Menu.Items className='absolute z-10 p-1 -ml-4 mt-4 flex justify-center origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
          <DatePicker
            className='text-center border-l-4 border-red-500 w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-transparent'
            inline
            selected={selectedDate}
            monthsShown={1}
            onChange={date => {
              setSelectedDate(date)
            }}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DateDropdown
