import { useEffect, useState } from 'react'
import { DefaultInput } from 'src/views/components/input'
import { LargeContainer, ContentContainer } from 'src/styled/styles'
import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import useBooking from 'src/views/pages/booking/useBooking'

import { useWatch } from 'react-hook-form'
import useCompanyInfo from 'src/hooks/useCompanyInfo'
import useSingleProductDetails from '../../views/pages/details/useSingleProductDetails'

import { dehydrate, useMutation, useQueryClient } from '@tanstack/react-query'

import { format } from 'date-fns'
import { ka } from 'date-fns/locale'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { queryClient } from '../_app'
import dynamic from 'next/dynamic'
import useProfile from 'src/hooks/useProfile'

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const PriceCalcCard = dynamic(() => import('src/views/pages/details/priceCalcCard'), { ssr: false })
const Drawer = dynamic(() => import('src/views/pages/details/drawer'), { ssr: false })
const ResponsivePriceCalcCard = dynamic(() => import('src/views/pages/details/responsivePriceCalcCard'), { ssr: false })
const BookingRadio = dynamic(() => import('../../views/pages/booking/bookingRadio'), { ssr: false })
const DateDropdown = dynamic(() => import('src/views/components/dateDropdown'), { ssr: false })
const TakeAway = dynamic(() => import('src/views/pages/booking/takeAway'), { ssr: false })
const Delivery = dynamic(() => import('src/views/pages/booking/delivery'), { ssr: false })
const BookingModal = dynamic(() => import('src/views/pages/booking/bookingModal'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const CheckServices = dynamic(() => import('src/views/pages/booking/checkServices'), { ssr: false })
import Toast from 'src/views/components/toast'

import toast from 'react-hot-toast'

const Booking = () => {
  const [additionalServices, toggleAdditionalServices] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const { book_from, book_to, price_day, company_id, id } = router.query

  useEffect(() => {
    if (book_from && book_to && price_day) {
      setLoading(false)
    }
  }, [book_from, book_to, price_day])

  const toggleEditModal = () => setOpenEditModal(!openEditModal)

  const { width } = useWindowDimensions()

  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)

  const { activeCompanyId } = useProfile()

  const { singleProductDetails } = useSingleProductDetails(id)

  console.log(singleProductDetails, 'singleProductDetails booking')

  console.log(company_id, 'company_id')

  const { singleCompanyBranches } = useCompanyInfo(company_id && company_id)

  const { control, bookingValues, errors, handleSubmit, postOrder, selfBookProduct } = useBooking(id)

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
    },

    onError: (ex: any) => {
      if (ex.response.status === 400) {
        toast.custom(
          <Toast
            type='error'
            title='ავტომობილი მოცემულ თარიღებში უკვე დაჯავშნილია'
            description='გთხოვთ სცადეთ სხვა თარიღი'
          />
        )
      }
    }
  })

  const selfBookMutation = useMutation(() => selfBookProduct('', bookingValues), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo'])
      router.push('/dashboard/orders/')
    },
    onError: (ex: any) => {
      ex.response.status === 400
      toast.custom(
        <Toast
          type='error'
          title='ავტომობილი მოცემულ თარიღებში უკვე დაჯავშნილია'
          description='გთხოვთ სცადეთ სხვა თარიღი'
        />
      )
    }
  })

  const onSubmit = () => {
    singleProductDetails.company_id === activeCompanyId ? selfBookMutation.mutate() : createOrderMutation.mutate()
  }

  const formsState = useWatch({ control })

  if (loading) {
    // Display a loading indicator or return null
    return <div>Loading...</div>
  }

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

              <DateDropdown label={'აირჩიე დაბადების თარიღი'} name='dob' control={control} errors={''} />
              <DateDropdown
                label={'მართვის მოწმობის მოქმედების ვადა'}
                name='driver_license_expiration'
                control={control}
                errors={''}
              />
            </div>
            <Typography type='body' color='light' className='mb-14'>
              გთხოვთ გადაამოწმოთ მითითებული პარამეტრები და შემდეგ დაასრულოთ დაჯავშნის პროცესი, ეს პარამეტრები
              მნიშვნელოვანია შემდგომში თქვენსა და გამქირავებელს შორის კომუნიკაციისთვის
            </Typography>
            <Divider />
            <Typography type='h3' className='text-3md md:text-2lg my-6 md:my-10'>
              მდებარეობა *
            </Typography>

            <BookingRadio name='supply' options={options} control={control} color='bg-green-100' />

            {formsState?.additional_services && formsState?.additional_services?.length > 0 && (
                <div>
                  <div
                      className='mt-11 flex items-center justify-between mb-8 cursor-pointer'
                      onClick={() => toggleAdditionalServices(!additionalServices)}
                  >
                    <Typography type='h3' className='text-3md md:text-2lg'>
                      დამატებითი სერვისები
                    </Typography>
                    <Icon
                        svgPath='chevron-md'
                        width={16}
                        height={10}
                        className={`${
                            additionalServices ? 'rotate-180' : ''
                        } fill-transparent w-auto h-4 transition duration-300 mr-6`}
                    />
                  </div>
                  {additionalServices && (
                      <CheckServices control={control} options={formsState?.additional_services as any} />
                  )}
                </div>
            )}

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
              image={singleProductDetails?.images.split(',')[0]}
              manufacturer={singleProductDetails?.manufacturer?.title}
              model={singleProductDetails?.manufacturer_model?.title}
              year={singleProductDetails?.prod_year}
              price={singleProductDetails?.price}
              control={control}
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
              companyId={singleProductDetails?.company_id}
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
        <button type='submit' className='hidden'>
          PAY
        </button>
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
