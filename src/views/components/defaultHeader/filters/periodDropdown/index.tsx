import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import DatePicker, { registerLocale } from 'react-datepicker';
import  ka  from 'date-fns/locale/ka';
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { formatDate } from 'src/utils/formatDate'
import {i18n, useTranslation} from "next-i18next";

interface Props {
  control: any
}
registerLocale("ka", ka);

const LocationDropdown: React.FC<Props> = ({ control }) => {
  const [dateRange, setDateRange] = useState<[Date, Date] | [null, null]>([null, null])
  const [startDate, endDate] = dateRange
    const {t} = useTranslation()

  return (
    <Menu as='div' className='flex text-left mx-0 sm:mx-2 w-full'>
      <Menu.Button className='py-5 px-4 inline-flex w-full justify-center rounded-md bg-raisin bg-opacity-20 text-sm font-medium text-white focus-visible:ring-white focus-visible:ring-opacity-75'>
        <FilterContainer>
          <Typography type='body' color='dark'>
              {t('rental_period')}
          </Typography>
          <InnerFilterContainer>
            <Typography type='subtitle' className='text-raisin-50'>
              {startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : t('date')}
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
        <Menu.Items className='absolute top-full z-[11] p-4 right-0 mt-4 w-full flex justify-center origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
          <Controller
            name='booking'
            control={control}
            render={({ field: { onChange } }) => (
              <DatePicker
                locale={i18n?.language}
                className='text-center border-l-4 border-red-500  w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-transparent'
                inline
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                monthsShown={2}
                onChange={(update: any) => {
                  if (update) {
                    const [start, end] = update
                    onChange({ book_from: formatDate(start), book_to: formatDate(end) })
                    setDateRange(update)
                  } else {
                    onChange(null)
                    setDateRange([null, null])
                  }
                }}
                dateFormat='yyyy-MM-dd'
                onChangeRaw={e => e.preventDefault()}
                minDate={new Date()}
              />
            )}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LocationDropdown
