import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import DatePicker, { registerLocale } from 'react-datepicker'
import ka from 'date-fns/locale/ka'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { formatDate } from 'src/utils/formatDate'
import Icon from 'src/views/app/Icon'

import { format } from 'date-fns'

interface Props {
  control: any
  resetField?:any
}
registerLocale('ka', ka)

const PeriodDropdown: React.FC<Props> = ({ control, resetField }) => {
  const [dateRange, setDateRange] = useState<[Date, Date] | [null, null]>([null, null])
  const [startDate, endDate] = dateRange

  return (
    <Menu as='div' className='flex text-left w-full'>
      {({ open }) => (
        <>
          <Menu.Button
            className={`py-6 px-6 inline-flex w-full justify-center rounded-2xl bg-raisin bg-opacity-20 text-sm font-medium text-white focus-visible:ring-white focus-visible:ring-opacity-75 ${
              open ? '' : ''
            }`}
          >
            <FilterContainer>
              <Typography type='body' color='dark'>
                დაქირავების პერიოდი
              </Typography>
              <InnerFilterContainer>
                <Typography type='subtitle' className='text-raisin-50'>
                  {startDate && endDate
                    ? `${format(startDate, 'd MMM yyyy', { locale: ka })} - ${format(endDate, 'd MMM yyyy', {
                        locale: ka
                      })}`
                    : 'თარიღი'}
                </Typography>
                {startDate || endDate ? (
                    <Icon
                        svgPath='clear-xs'
                        width={7}
                        height={7}
                        color='raisin-10'
                        onClick={e => {
                          setDateRange([null, null])
                          resetField(), e.stopPropagation()
                        }}
                        className="fill-transparent ml-2"
                    />
                ) : (
                    <Icon svgPath='chevron' width={10} height={10} className={`fill-transparent ml-2 transition-all ${open ? 'rotate-180': ''}`}/>
                )}
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
            <Menu.Items className='absolute top-full z-[11] p-4 right-0 mt-2 w-full flex justify-center origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
              <Controller
                name='booking'
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePicker
                    className='text-center border-l-4 border-red-500 w-full p-3 rounded text-sm outline-none focus:ring-0 bg-transparent'
                    inline
                    locale='ka'
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
        </>
      )}
    </Menu>
  )
}

export default PeriodDropdown
