import { useState } from 'react'
import Divider from 'src/views/components/divider'
import Image from 'src/views/components/image'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import PriceCalcCard from 'src/views/pages/details/priceCalcCard'
import { LargeContainer, ContentContainer } from 'src/styled/styles'
import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Drawer from 'src/views/pages/details/drawer'
import ResponsivePriceCalcCard from 'src/views/pages/details/responsivePriceCalcCard'
import useBooking from 'src/views/pages/booking/useBooking'
import BookingRadio from '../../views/pages/booking/bookingRadio'

import DateDropdown from 'src/views/components/dateDropdown'
import { useWatch } from 'react-hook-form'
import useCompanyInfo from 'src/hooks/useCompanyInfo'
import useSingleProductDetails from '../../views/pages/details/useSingleProductDetails'
import TakeAway from 'src/views/pages/booking/takeAway'
import Delivery from 'src/views/pages/booking/delivery'
import BookingModal from 'src/views/pages/booking/bookingModal'
import CheckServices from 'src/views/pages/booking/checkServices'
import { dehydrate, useMutation, useQueryClient } from '@tanstack/react-query'
import Icon from 'src/views/app/Icon'

import { format } from 'date-fns'
import { ka } from 'date-fns/locale'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { queryClient } from '../_app'

const Booking = () => {
  const [additionalServices, toggleAdditionalServices] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const toggleEditModal = () => setOpenEditModal(!openEditModal)

  const { width } = useWindowDimensions()

  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)

  const router = useRouter()

  const { book_from, book_to, price_day, company_id, id } = router.query

  const { singleProductDetails } = useSingleProductDetails(id)

  console.log(singleProductDetails, 'singleProductDetails booking')

  console.log(company_id, 'company_id')

  const { singleCompanyBranches } = useCompanyInfo(company_id && company_id)

  const { control, bookingValues, errors, handleSubmit, postOrder } = useBooking(id)

  console.log(bookingValues, 'bookingValues')

  const formState = useWatch({ control })

  console.log(formState, 'formState')

  const queryClient = useQueryClient()

  const onClickLogo = () => {
    router.push('/')
  }

  const options = [
    {
      label: 'წავიყვან ოფისიდან',
      value: '0',
      children: <TakeAway control={control} toggleEditModal={toggleEditModal} errors={errors} />
    },
    {
      label: 'მიწოდება',
      value: '1',
      children: <Delivery control={control} toggleEditModal={toggleEditModal} errors={errors} />
    }
  ]

  const createOrderMutation = useMutation(() => postOrder('', bookingValues), {
    onSuccess: data => {
      queryClient.invalidateQueries(['profileInfo'])
      const paymentResponse = JSON.parse(data?.result?.data?.payment_method)

      const trans_id = paymentResponse?.PaymentData?.trans_id
      const method = paymentResponse?.PaymentMethod
      const PaymentURL = paymentResponse?.PaymentURL

      const secondForm: any = document.getElementById('secondForm')

      if (secondForm) {
        const transIdInput = secondForm.querySelector('input[name="trans_id"]')
        if (transIdInput) {
          transIdInput.value = trans_id
          secondForm.action = PaymentURL
          secondForm.method = method

          secondForm.submit()
        }
      }
    }
  })

  const onSubmit = () => {
    createOrderMutation.mutate()
  }

  const formsState = useWatch({ control })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LargeContainer className='flex items-baseline pt-5 flex-col md:flex-row'>
          <Image src='/images/logo-rent.svg' alt='logo' className='cursor-pointer' onClick={onClickLogo} />
        </LargeContainer>
        <ContentContainer className='flex gap-12'>
          <div className='w-full'>
            <div className='flex items-baseline my-8 gap-3'>
              <Typography type='h3' className='font-bold'>
                {book_from && book_to
                  ? `${format(new Date(String(book_from)), 'd MMM yyyy', { locale: ka })} - ${format(
                      new Date(String(book_to)),
                      'd MMM yyyy',
                      {
                        locale: ka
                      }
                    )}`
                  : ''}
              </Typography>
              <Typography type='body'>
                |{' '}
                {Math.round(
                  (new Date(Array.isArray(book_to) ? book_to[0] : book_to).getTime() -
                    new Date(Array.isArray(book_from) ? book_from[0] : book_from).getTime()) /
                    (24 * 60 * 60 * 1000)
                )}{' '}
                დღე
              </Typography>
            </div>
            <Divider />
            <Typography type='h3' className='mt-11'>
              პირადი ინფორმაცია *
            </Typography>
            <div className='grid gap-3 my-6 grid-cols-1 lg:grid-cols-2 lg:gap-4'>
              <DefaultInput control={control} name='first_name' errors={errors} label='სახელი' />
              <DefaultInput control={control} name='last_name' errors={errors} label='გვარი' />
              <DefaultInput control={control} name='identification_number' errors={errors} label='პირადი ნომერი' />
              <DefaultInput control={control} name='phone' errors={errors} label='მობილურის ნომერი' />
              <DefaultInput control={control} name='email' errors={errors} label='ელ.ფოსტა' />

              <DateDropdown label={'აირჩიე დაბადების თარიღი'} name='dob' control={control} />
              <DateDropdown
                label={'მართვის მოწმობის მოქმედების ვადა'}
                name='driver_license_expiration'
                control={control}
              />
            </div>
            <Typography type='body' color='light' className='mb-14'>
              გთხოვთ გადაამოწმოთ მითითებული პარამეტრები და შემდეგ დაასრულოთ დაჯავშნის პროცესი, ეს პარამეტრები
              მნიშვნელოვანია შემდგომში თქვენსა და გამქირავებელს შორის კომუნიკაციისთვის
            </Typography>
            <Divider />
            <Typography type='h3' className='my-11'>
              ადგილმდებარეობა *
            </Typography>

            <BookingRadio name='supply' options={options} control={control} color='bg-green-100' />

            <div className='mb-24'>
              <div
                className='mt-11 flex items-center justify-between mb-8'
                onClick={() => toggleAdditionalServices(!additionalServices)}
              >
                <Typography type='h3'>დამატებითი სერვისები</Typography>
                <Icon
                  svgPath='chevron'
                  width={8}
                  height={6}
                  className={`${
                    additionalServices ? 'rotate-180' : ''
                  } fill-transparent  w-auto h-4 transition duration-300 mr-6`}
                />
              </div>
              {additionalServices && (
                <CheckServices control={control} options={formsState?.additional_services as any} />
              )}
            </div>

            {/* <div>
              <div className='mt-11 flex items-center justify-between mb-8' onClick={() => toggleInsurance(!insurance)}>
                <Typography type='h3'>დაზღვევა</Typography>
                <Icon
                  svgPath='chevron'
                  width={8}
                  height={6}
                  className={`${additionalServices ? '' : 'rotate-180'} fill-transparent w-auto h-4 transition duration-300`}
                  alt=''
                />
              </div>
              {insurance && <AdditionalServices control={control} />}
            </div> */}
          </div>
          <div className='hidden md:flex w-[300px] lg:w-[400px] shrink-0 h-fit'>
            <PriceCalcCard
              price={singleProductDetails?.price}
              dates={
                book_from && book_to
                  ? `${format(new Date(String(book_from)), 'd MMM yyyy', { locale: ka })} - ${format(
                      new Date(String(book_to)),
                      'd MMM yyyy',
                      {
                        locale: ka
                      }
                    )}`
                  : ''
              }
              days={Math.round(
                (new Date(Array.isArray(book_to) ? book_to[0] : book_to).getTime() -
                  new Date(Array.isArray(book_from) ? book_from[0] : book_from).getTime()) /
                  (24 * 60 * 60 * 1000)
              )}
              onClick={onSubmit}
              disabled={createOrderMutation?.isLoading}
              changeDates={false}
              services={formState?.additional_services?.filter(service => service?.is_selected)}
            />
          </div>
        </ContentContainer>

        {isOpenDrawer && width < 779 ? (
          <Drawer
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            price={singleProductDetails?.price}
            dates={
              book_from && book_to
                ? `${format(new Date(String(book_from)), 'd MMM yyyy', { locale: ka })} - ${format(
                    new Date(String(book_to)),
                    'd MMM yyyy',
                    {
                      locale: ka
                    }
                  )}`
                : ''
            }
            days={Math.round(
              (new Date(Array.isArray(book_to) ? book_to[0] : book_to).getTime() -
                new Date(Array.isArray(book_from) ? book_from[0] : book_from).getTime()) /
                (24 * 60 * 60 * 1000)
            )}
            onClick={onSubmit}
            services={formState?.additional_services?.filter(service => service?.is_selected)}
          />
        ) : (
          <ResponsivePriceCalcCard
            toggleDrawer={toggleDrawer}
            bookingModal
            price={Number(Array.isArray(price_day) ? price_day[0] : price_day)}
          />
        )}
        <BookingModal
          open={openEditModal}
          onClose={toggleEditModal}
          addresses={singleCompanyBranches}
          control={control}
        />
      </form>

      <form method='POST' action='https://ecommerce.ufc.ge/ecomm2/ClientHandler' id='secondForm'>
        <input name='trans_id' type='hidden' />
        <button type='submit'>PAY</button>
      </form>
    </>
  )
}

export default Booking

export async function getStaticProps({ locale }: { locale: string }) {
  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...translations
    }
  }
}
