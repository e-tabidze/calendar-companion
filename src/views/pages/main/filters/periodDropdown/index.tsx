import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import DatePicker, { registerLocale } from 'react-datepicker'
import ka from 'date-fns/locale/ka'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller } from 'react-hook-form'
import { formatDate } from 'src/utils/formatDate'
import Icon from 'src/views/app/Icon'

import { format } from 'date-fns'
import {useTranslation} from "next-i18next";

interface Props {
  control: any
  resetField?: any
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
registerLocale('ka', ka)

const PeriodDropdown: React.FC<Props> = ({ control, resetField, setOpen }) => {
  const [dateRange, setDateRange] = useState<[Date, Date] | [null, null]>([null, null])
  const [startDate, endDate] = dateRange
  const {t} = useTranslation()

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateButtonState = () => {
      const newButtonState = buttonRef?.current?.getAttribute('aria-expanded')
      newButtonState === 'false' ? setOpen(false) : setOpen(true)
    }
    updateButtonState()
    const observer = new MutationObserver(updateButtonState)
    observer.observe(buttonRef.current!, { attributes: true, attributeFilter: ['aria-expanded'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Menu as='div' className='flex text-left w-full'>
      {({ open }) => (
        <>
          <Menu.Button
            ref={buttonRef}
            className={`py-6 px-6 inline-flex w-full justify-center rounded-2xl text-sm font-medium text-white focus-visible:ring-white focus-visible:ring-opacity-75 ${
              open ? 'bg-white' : ''
            }`}
          >
            <FilterContainer>
              <Typography type='body' color='dark'>
                {t('rental_period')}
              </Typography>
              <InnerFilterContainer>
                <Typography
                  type='subtitle'
                  className={`${startDate && endDate ? 'text-green-100' : 'text-raisin-50'} `}
                >
                  {startDate && endDate
                    ? `${format(startDate, 'd MMM', { locale: ka })} - ${format(endDate, 'd MMM', {
                        locale: ka
                      })}`
                    : t('date')}
                </Typography>
                {startDate || endDate ? (
                  <span
                    className='flex shrink-0 ml-1 p-2 rounded-full hover:bg-raisin-5 transition-all'
                    onClick={e => {
                      setDateRange([null, null])
                      resetField(), e.stopPropagation()
                    }}
                  >
                    <Icon svgPath='clear-xs' width={7} height={7} color='raisin-10' className='fill-transparent' />
                  </span>
                ) : (
                  <span className='flex shrink-0 ml-1 p-2 rounded-full hover:bg-raisin-5 transition-all'>
                    <Icon
                      svgPath='chevron'
                      width={8}
                      height={6}
                      className={`fill-transparent transition-all ${open ? 'rotate-180' : ''}`}
                    />
                  </span>
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
                    selected={startDate}
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
