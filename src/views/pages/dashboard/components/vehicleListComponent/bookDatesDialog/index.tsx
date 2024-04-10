import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Typography from 'src/views/components/typography'
import DatePicker, { registerLocale } from 'react-datepicker'
import ka from 'date-fns/locale/ka'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useWatch } from 'react-hook-form'
import { formatDate } from 'src/utils/formatDate'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { useRouter } from 'next/router'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Icon from 'src/views/app/Icon'
import { i18n, useTranslation } from 'next-i18next'
import useBooking from 'src/views/pages/booking/useBooking'
import useProfile from 'src/hooks/useProfile'
import SelectField from 'src/views/components/selectField'
import { generateTimeOptions } from 'src/utils/timeValues'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'src/views/components/toast'
import toast from 'react-hot-toast'
import useSingleProductDetails from 'src/views/pages/details/useSingleProductDetails'
import Divider from 'src/views/components/divider'
import { SelectTimeContainer, SelectTimeText } from './styles'
import { format, differenceInDays } from 'date-fns'

interface Props {
  open: boolean
  setOpen: any
  productId: number
}
registerLocale('ka', ka)

const PeriodDialog: React.FC<Props> = ({ open, setOpen, productId }) => {
  const { activeCompanyId } = useProfile()
  const { control, setValue, bookingValues, errors, selfBookProduct } = useBooking(productId, activeCompanyId)

  const formState = useWatch({ control })

  console.log(formState.booking?.book_from, 'formState')

  console.log(productId, 'productId')

  const { orderDatesData } = useSingleProductDetails(productId)

  console.log(orderDatesData, 'orderDatesData')

  console.log(bookingValues, 'bookingValues dashboard')

  const { t } = useTranslation()

  const queryClient = useQueryClient()

  const router = useRouter()

  const [dateRange, setDateRange] = useState<[Date, Date] | [null, null]>([null, null])
  const [startDate, endDate] = dateRange

  const { width } = useWindowDimensions()

  const selfBookMutation = useMutation(() => selfBookProduct(bookingValues), {
    onSuccess: () => {
      queryClient.invalidateQueries(['orderDates', productId])
      router.push('/dashboard/orders/?status_id=5&page=1')
    },

    onError: (ex: any) => {
      ex.response.data.result.message.start_time == 'The start time field is required.' &&
        toast.custom(
          <Toast type='error' title='გთხოვთ მონიშნოთ დაწყების დრო' description='გთხოვთ მონიშნოთ დაწყების დრო' />
        )

      ex.response.data.result.message.end_time == 'The end time field is required.' &&
        toast.custom(
          <Toast type='error' title='გთხოვთ მონიშნოთ დასრულების დრო' description='გთხოვთ მონიშნოთ დასრულების დრო' />
        )
    }
  })

  const onSubmit = () => {
    selfBookMutation.mutate()
  }

  const handleClear = () => {
    setValue('booking.book_from', null)
    setValue('booking.book_to', null)
    setDateRange([null, null])
  }

  console.log(startDate, 'startDate', endDate, 'endDate')

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-[111]'
        onClose={() => {
          setOpen()
          handleClear()
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
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 md:h-screen overflow-y-auto'>
          <div className='absolute left-1/2 -translate-x-1/2 w-full max-w-[790px] flex min-h-full items-end justify-center text-center md:items-center'>

          <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
            <Dialog.Panel className='relative transform overflow-hidden rounded-tl-3xl rounded-tr-3xl md:rounded-bl-3xl md:rounded-br-3xl bg-white text-left shadow-xl transition-all w-full md:my-4'>

                <div className='w-full flex justify-between items-center px-6 py-4 border-b-1 border-grey-90'>
                  <Typography type='h3' className='text-md md:text-2md'>
                     {t('choose_hold_date')}
                  </Typography>
                  <Icon svgPath='close'
                        onClick={() => {
                          setOpen()
                          handleClear()
                        }}
                        height={40} width={40} className='cursor-pointer flex shrink-0 ml-4' />
                </div>
              <div className="overflow-auto h-[60vh] md:h-[70vh] 2xl:h-[60vh] w-max-full">
                <div className='flex flex-col-reverse md:flex-col overflow-auto'>
                  <div className='md:py-10 py-6 px-6 flex flex-col md:flex-row items-center gap-6'>
                    <SelectTimeContainer>
                      <SelectTimeText>
                        <Typography type='body' color='light'>
                          {t('start_date')}
                        </Typography>
                        {startDate && (
                            <Typography type='subtitle' className='font-medium'>
                              {startDate ? format(startDate, 'd MMMM yyyy', { locale: ka }) : ''}
                            </Typography>
                        )}
                      </SelectTimeText>
                      <Divider vertical className='h-8' />
                      <SelectField
                          icon
                          control={control}
                          valueKey='value'
                          labelKey='label'
                          name='start_time'
                          options={generateTimeOptions()}
                          placeholder={t('time') + '*'}
                          className='bg-transparent fill-transparent border-green-100 group-color'
                          errors={errors}
                          errorAbsolute
                          hideBorder
                      />
                    </SelectTimeContainer>
                    <SelectTimeContainer>
                      <SelectTimeText>
                        <Typography type='body' color='light'>
                          {t('end_date')}
                        </Typography>
                        <Typography type='subtitle' className='font-medium'>
                          {endDate ? format(endDate, 'd MMMM yyyy', { locale: ka }) : ''}
                        </Typography>
                      </SelectTimeText>
                      <SelectField
                          control={control}
                          icon
                          valueKey='value'
                          labelKey='label'
                          name='end_time'
                          options={generateTimeOptions()}
                          placeholder={t('time') + '*'}
                          className='bg-transparent fill-transparent border-green-100 group-color'
                          errors={errors}
                          errorAbsolute
                          hideBorder
                      />
                    </SelectTimeContainer>
                    {startDate && endDate && (
                        <Typography type='subtitle' className='font-medium text-2md flex shrink-0'>
                          {differenceInDays(endDate, startDate)} {t('day')}
                        </Typography>
                    )}
                  </div>
                  <Divider className='md:hidden'/>
                  <div className='px-4 md:mb-10'>
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
                                monthsShown={width > 768 ? 2 : 1}
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
                </div>
              </div>
              <div className='w-full flex flex-row items-center justify-between px-6 py-4 border-t-1 border-grey-90 shadow-md'>
                <IconTextButton
                    label={t('clear')}
                    icon='clearFilter'
                    iconFill='!fill-black'
                    width={24}
                    height={24}
                    onClick={handleClear}
                    type='button'
                />

                <div className='flex items-center justify-between md:justify-start text-md gap-2'>
                  <DefaultButton
                      text={t('hold_dates')}
                      bg='bg-green-100 transition-all !h-10 md:!h-14 text-sm md:text-md'
                      type='submit'
                      onClick={onSubmit}
                  />
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
