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
    <Transition appear show={open} as={Fragment}>
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
                <div className='mb-8 p-6 border-b border-raisin-10 flex justify-between items-center'>
                  <Typography type='h5' className='text-2md'>
                    აირჩიე ავტომობილის დაკავების თარიღები და საათები
                  </Typography>
                  <div className='w-10'>
                    <Icon
                      svgPath='close'
                      width={40}
                      height={40}
                      className='cursor-pointer'
                      onClick={() => {
                        setOpen()
                        handleClear()
                      }}
                    />
                  </div>
                </div>
                <div className='p-6 flex items-center gap-6'>
                  <SelectTimeContainer>
                    <SelectTimeText>
                      <Typography type='body' color='light'>
                        დაწყების თარიღი
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
                        დასრულების თარიღი
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
                    <Typography type='subtitle' className='font-medium text-2md'>
                      {differenceInDays(endDate, startDate)} დღე
                    </Typography>
                  )}
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
                    onClick={handleClear}
                    type='button'
                  />

                  <div className='flex items-center justify-between md:justify-start text-md gap-4'>
                    <DefaultButton
                      text='თარიღების დაკავება'
                      bg='bg-green-100 transition-all'
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
