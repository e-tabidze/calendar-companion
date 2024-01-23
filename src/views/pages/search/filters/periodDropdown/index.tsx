import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Typography from 'src/views/components/typography'
import { FilterContainer, InnerFilterContainer } from './styles'
import DatePicker, { registerLocale } from 'react-datepicker'
import ka from 'date-fns/locale/ka'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useWatch } from 'react-hook-form'
import { formatDate } from 'src/utils/formatDate'
import Icon from 'src/views/app/Icon'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

interface Props {
  control: any
  resetField: any
  setValue: any
}
registerLocale('ka', ka)

const PeriodDropwodn: React.FC<Props> = ({ control, resetField, setValue }) => {
  const router = useRouter()
  const { book_from, book_to } = router?.query

  const formState = useWatch({ control })

  const [dateRange, setDateRange] = useState<
    [Date, Date] | [null, null] | [Date, null] | [null, Date] | [undefined, undefined]
  >(
    Array.isArray(book_from) && Array.isArray(book_to)
      ? [new Date(book_from[0]), new Date(book_to[0])]
      : [
          book_from ? new Date(book_from as string | number) : null,
          book_to ? new Date(book_to as string | number) : null
        ]
  )

  const [startDate, endDate] = dateRange

  useEffect(() => {
    if (book_from && book_to) {
      const fromDate = Array.isArray(book_from)
        ? new Date(book_from[0] as string | number)
        : new Date(book_from as string | number)
      const toDate = Array.isArray(book_to)
        ? new Date(book_to[0] as string | number)
        : new Date(book_to as string | number)

      setDateRange([fromDate, toDate])
      setValue('booking.book_from', book_from)
      setValue('booking.book_to', book_to)
    }
  }, [book_from, book_to])

  return (
    <Menu as='div' className='flex text-left w-full h-full'>
      {({ open }) => (
        <>
          <Menu.Button className='h-full bg-transparent pl-3 lg:pl-4 pr-1 lg:pr-2 inline-flex justify-center items-center rounded-md text-sm font-medium text-white'>
            <FilterContainer>
              <InnerFilterContainer>
                <InnerFilterContainer>
                  <Typography type='body' className='whitespace-nowrap'>
                    {formState?.booking?.book_from?.length > 0 || formState?.booking?.book_to?.length > 0
                      ? `  ${
                          formState?.booking?.book_from?.length > 0 &&
                          `${format(new Date(formState?.booking?.book_from), 'd MMM', { locale: ka })}`
                        }
                        -
                    ${
                      formState?.booking?.book_to?.length > 0 && formState?.booking?.book_to !== 'თარიღი'
                        ? `${format(new Date(formState?.booking?.book_to), 'd MMM', { locale: ka })}`
                        : ''
                    }`
                      : 'დაქირავების პერიოდი'}
                  </Typography>
                  {formState?.booking?.book_from || formState?.booking?.book_to ? (
                    <span
                      className='flex shrink-0 p-2'
                      onClick={e => {
                        resetField(), e.stopPropagation()
                        setDateRange([null, null])
                      }}
                    >
                      <Icon svgPath='clear-xs' width={7} height={7} color='raisin-10' className='fill-transparent' />
                    </span>
                  ) : (
                    <span className='flex shrink-0 p-2'>
                      <Icon
                        svgPath='chevron'
                        width={8}
                        height={6}
                        className={`${open ? 'rotate-180' : ''} transition-all fill-transparent`}
                      />
                    </span>
                  )}
                </InnerFilterContainer>
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
            <Menu.Items className='absolute w-max left-0 top-full z-[11] p-4 right-0 mt-4 flex justify-center origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg focus:outline-none'>
              <Controller
                name='booking'
                control={control}
                render={({ field: { onChange } }) => (
                  <DatePicker
                    key={startDate ? startDate.toString() : 'null'}
                    locale='ka'
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
        </>
      )}
    </Menu>
  )
}

export default PeriodDropwodn
