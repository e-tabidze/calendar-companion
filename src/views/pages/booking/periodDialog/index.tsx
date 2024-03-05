import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Typography from 'src/views/components/typography'
import DatePicker, { registerLocale } from 'react-datepicker'
import ka from 'date-fns/locale/ka'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useWatch } from 'react-hook-form'
import { formatDate } from 'src/utils/formatDate'
import useSingleProductDetails from '../../details/useSingleProductDetails'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { useRouter } from 'next/router'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Icon from 'src/views/app/Icon'
import {i18n, useTranslation} from "next-i18next";

interface Props {
  control: any
  open: boolean
  setOpen: any
  setValue: any
}
registerLocale('ka', ka)

const PeriodDialog: React.FC<Props> = ({ control, open, setOpen, setValue }) => {
  const {t} = useTranslation()
  const router = useRouter()
  const { id, book_from, book_to, price_day, company_id } = router.query

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

  const { orderDatesData } = useSingleProductDetails(id)
  const { width } = useWindowDimensions()

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

  const onSubmit = () => {
    setOpen()
    router.push({
      pathname: '/booking',
      query: {
        id: id,
        book_from: formState?.booking?.book_from,
        book_to: formState?.booking?.book_to,
        price_day: price_day,
        company_id: company_id
      }
    })
  }

  const handleClose = () => {
    setValue('booking.book_from', book_from)
    setValue('booking.book_to', book_to)
    setDateRange([new Date(book_from as string | number), new Date(book_to as string | number)])
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => {
          handleClose()
          setOpen()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-max transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <div className='mb-8 p-6 border-b border-raisin-10 flex justify-between'>
                  <Typography type='h3'>{t('select_rent_period')}</Typography>
                  <Icon
                    svgPath='close'
                    width={40}
                    height={40}
                    className='cursor-pointer'
                    onClick={() => {
                      handleClose()
                      setOpen()
                    }}
                  />
                </div>
                <div className='p-6'>
                  <Controller
                    name='booking'
                    control={control}
                    render={({ field: { onChange } }) => (
                      <DatePicker
                        key={startDate ? startDate.toString() : 'null'}
                        locale={i18n?.language}
                        className='p-6 text-center border-l-4 border-red-500 w-full rounded text-sm outline-none focus:ring-0 bg-transparent'
                        inline
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        monthsShown={width > 800 ? 2 : 1}
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
                        excludeDates={orderDatesData?.flatMap(({ start_date, end_date }: any) => {
                          const start = new Date(start_date)
                          const end = new Date(end_date)
                          const excludedDates = []

                          for (
                            let currentDate = start;
                            currentDate <= end;
                            currentDate.setDate(currentDate.getDate() + 1)
                          ) {
                            excludedDates.push(new Date(currentDate))
                          }

                          return excludedDates
                        })}
                      />
                    )}
                  />
                </div>

                <div className='w-full flex flex-row items-center justify-between p-6 border-t-1 border-grey-90'>
                  <IconTextButton
                    label={t('clear')}
                    icon='rotate'
                    className='fill-transparent'
                    width={24}
                    height={24}
                    onClick={handleClose}
                    type='button'
                  />

                  <div className='flex items-center justify-between md:justify-start text-md gap-4'>
                    <DefaultButton text={t('save')} bg='bg-green-100 transition-all' type='submit' onClick={onSubmit} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PeriodDialog
