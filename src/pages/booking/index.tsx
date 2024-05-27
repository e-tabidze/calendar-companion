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
const DateDropdown = dynamic(() => import('src/views/components/dateDropdown'), { ssr: false })
const BookingModal = dynamic(() => import('src/views/pages/booking/bookingModal'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const CheckServices = dynamic(() => import('src/views/pages/booking/checkServices'), { ssr: false })
import Toast from 'src/views/components/toast'

import toast from 'react-hot-toast'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import PeriodDialog from 'src/views/pages/booking/periodDialog'
import PageMeta from 'src/@core/meta/PageMeta'
import { useTranslation } from 'next-i18next'
import AddressesRadio from 'src/views/pages/booking/addressesRadio'
import OfficeService from 'src/views/pages/booking/officeService'
import AddressService from 'src/views/pages/booking/addressService'
import useCurrency from 'src/hooks/useCurrency'

const Booking = () => {
  const [additionalServices, toggleAdditionalServices] = useState(true)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [changeDatesDialog, setChangeDatesDialog] = useState(false)

  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { t, i18n } = useTranslation()

  const { book_from, book_to, price_day, company_id, id } = router.query

  useEffect(() => {
    if (book_from && book_to && price_day) {
      setLoading(false)
    }
  }, [book_from, book_to, price_day])

  const toggleEditModal = () => setOpenEditModal(!openEditModal)

  const toggleChangeDatesDialog = () => setChangeDatesDialog(!changeDatesDialog)

  const { width } = useWindowDimensions()

  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)

  const { activeCompanyId } = useProfile()

  const { singleProductDetails } = useSingleProductDetails(id)

  const { currencyRates, currency } = useCurrency()

  console.log(singleProductDetails, 'singleProductDetails in booking')

  const { singleCompanyBranches } = useCompanyInfo(company_id && company_id)

  const { control, bookingValues, errors, handleSubmit, postOrder, selfBookProduct, setValue } = useBooking(
    id,
    company_id
  )

  const formState = useWatch({ control })

  console.log(formState, 'formState')

  console.log(currencyRates, 'currencyRates', currency, 'currency')

  const queryClient = useQueryClient()

  const onClickLogo = () => {
    router.push('/')
  }

  const renderSupplyValue = () => {
    if (formState.supply == '1') {
      const startCityId = formState.other_start_city

      const cityData = singleProductDetails?.other_delivery_locations?.find((item: any) => item.id === startCityId)

      if (cityData) {
        return { price: cityData?.price, currency: cityData?.currency }
      } else {
        return {}
      }
    } else {
      return {}
    }
  }

  const renderReturnValue = () => {
    if (formState.return_location == '1') {
      const startCityId = formState.other_end_city

      const cityData = singleProductDetails?.other_return_locations?.find((item: any) => item.id == startCityId)

      if (cityData) {
        return { price: cityData?.price, currency: cityData?.currency }
      } else {
        return {}
      }
    } else {
      return {}
    }
  }

  const resultReturnValue =
    renderReturnValue().price !== undefined && renderReturnValue().currency !== undefined
      ? `${renderReturnValue().price} ${renderReturnValue().currency}`
      : ''

  const resultSupplyValue =
    renderSupplyValue().price !== undefined && renderSupplyValue().currency !== undefined
      ? `${renderSupplyValue().price} ${renderSupplyValue().currency}`
      : ''

  const supplyOptions = [
    {
      label: t('take_away_from_office'),
      value: '0',
      children: (
        <OfficeService
          control={control}
          errors={errors}
          city={singleProductDetails?.start_city}
          address={singleProductDetails?.start_address}
        />
      )
    },
    {
      label: 'მიწოდება მისამართზე',
      value: '1',
      children: (
        <AddressService
          control={control}
          errors={errors}
          otherServiceLocations={singleProductDetails?.other_delivery_locations}
          nameCity='other_start_city'
          addressName='other_start_address'
          serviceValue={resultSupplyValue}
          timeName='start_time'
        />
      )
    }
  ]

  const returnOptions = [
    {
      label: 'ოფისში დაბრუნება',
      value: '0',
      children: (
        <OfficeService
          control={control}
          errors={errors}
          city={singleProductDetails?.end_city}
          address={singleProductDetails?.end_address}
        />
      )
    },
    {
      label: 'მისამართზე დატოვება',
      value: '1',
      children: (
        <AddressService
          control={control}
          errors={errors}
          otherServiceLocations={singleProductDetails?.other_return_locations}
          nameCity='other_end_city'
          addressName='other_end_address'
          serviceValue={resultReturnValue}
          timeName='end_time'
        />
      )
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
      if (ex.response?.data?.result?.message === 'Already booked') {
        toast.custom(<Toast type='error' title={t('car_already_booked')} description={t('select_other_date')} />)
      }
    }
  })

  const selfBookMutation = useMutation(() => selfBookProduct(bookingValues), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo'])
      router.push('/dashboard/orders/?status_id=5&page=1')
    },
    onError: (ex: any) => {
      ex.response.data.result.message.start_time == 'The start time field is required.' &&
        toast.custom(
          <Toast
            type='error'
            title='The start time field is required.'
            description='The start time field is required.'
          />
        )

      ex.response.data.result.message.end_time == 'The end time field is required.' &&
        toast.custom(
          <Toast type='error' title='The end time field is required.' description='The end time field is required.' />
        )
    }
  })

  const onSubmit = () => {
    singleProductDetails.company_id === activeCompanyId ? selfBookMutation.mutate() : createOrderMutation.mutate()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const pageMeta = {
    title: `ქირავდება ${singleProductDetails?.manufacturer?.title} ${singleProductDetails?.manufacturer_model?.title} ${singleProductDetails?.prod_year} ${singleProductDetails?.start_city} |  Rent.myauto.ge | მანქანის ქირაობის პლატფორმა`,
    desc: '',
    img: singleProductDetails?.large_images?.split(',')[0]
  }

  return (
    <>
      <PageMeta meta={pageMeta} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <LargeContainer className='flex justify-center md:justify-start items-center pt-5 flex-row-reverse md:flex-row relative'>
          <Image src='/images/logo-rent.svg' alt='logo' className='cursor-pointer' onClick={onClickLogo} />
          <IconTextButton
            label={t('back')}
            icon='back'
            width={18}
            height={18}
            labelClassname='text-sm'
            className='md:ml-10 md:static absolute left-5 mt-2 top-1/2 -translate-y-1/2'
            onClick={() => router.back()}
          />
        </LargeContainer>
        <ContentContainer className='flex gap-12'>
          <div className='w-full pb-28 md:pb-20'>
            <div className='flex justify-between items-center'>
              <div className='flex items-baseline my-8 gap-3'>
                <Typography type='h3' className='font-bold'>
                  {book_from && book_to
                    ? `${format(
                        new Date(String(book_from)),
                        'd MMM yyyy',
                        i18n.language === 'ka' ? { locale: ka } : {}
                      )} - ${format(
                        new Date(String(book_to)),
                        'd MMM yyyy',
                        i18n.language === 'ka' ? { locale: ka } : {}
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
                  {t('day')}
                </Typography>
              </div>
              <DefaultButton text={t('change')} type='button' onClick={toggleChangeDatesDialog} />
            </div>
            <Divider />
            <Typography type='h3' className='mt-11'>
              {t('personal_info')} *
            </Typography>
            <div className='grid gap-3 my-6 grid-cols-1 lg:grid-cols-2 lg:gap-4'>
              <DefaultInput control={control} name='first_name' errors={errors} label={t('first_name')} />
              <DefaultInput control={control} name='last_name' errors={errors} label={t('last_name')} />
              <DefaultInput control={control} name='identification_number' errors={errors} label={t('personal_id')} />
              <DefaultInput control={control} name='phone' errors={errors} label={t('phone_number')} />
              <DefaultInput control={control} name='email' errors={errors} label={t('e_mail')} />

              <DateDropdown label={t('dob')} name='dob' control={control} errors={errors} />
              <DateDropdown
                label={t('driver_licence_exp_date')}
                name='driver_license_expiration'
                control={control}
                errors={errors}
              />
            </div>
            <Typography type='body' color='light' className='mb-14'>
              {t('booking_notice')}
            </Typography>
            <Divider />
            <Typography type='h3' className='text-3md md:text-2lg my-6 md:my-10'>
              {t('location')} *
            </Typography>

            {/* <BookingRadio name='supply' options={options} control={control} color='bg-green-100' /> */}

            <Typography type='subtitle' className='text-md my-6 md:my-10'>
              მიწოდება
            </Typography>

            <AddressesRadio name='supply' options={supplyOptions} control={control} color='bg-green-100' />

            <Typography type='subtitle' className='text-md my-6 md:my-10'>
              დაბრუნება
            </Typography>

            <AddressesRadio name='return_location' options={returnOptions} control={control} color='bg-green-100' />

            {formState?.additional_services && formState?.additional_services?.length > 0 && (
              <div className='mb-20'>
                <div
                  className='mt-11 flex items-center justify-between mb-8 cursor-pointer'
                  onClick={() => toggleAdditionalServices(!additionalServices)}
                >
                  <Typography type='h3' className='text-3md md:text-2lg'>
                    {t('services_price')}
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
                  <CheckServices control={control} options={formState?.additional_services as any} />
                )}
              </div>
            )}

            {/* <div>
              <div className='mt-11 flex items-center justify-between mb-8' onClick={() => toggleInsurance(!insurance)}>
                <Typography type='h3'>  {t('insurance')}</Typography>
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
              price={currency === 'GEL' ? singleProductDetails?.price_gel : singleProductDetails?.price_usd}
              isBooking
              control={control}
              startDate={
                book_from &&
                format(new Date(String(book_from)), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})
              }
              endDate={
                book_to && format(new Date(String(book_to)), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})
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
              carDeliveryPrice={renderSupplyValue()}
              carReturnPrice={renderReturnValue()}
            />
          </div>
        </ContentContainer>

        {isOpenDrawer && width < 779 ? (
          <Drawer
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            price={currency === 'GEL' ? singleProductDetails?.price_gel : singleProductDetails?.price_usd}
            startDate={
              book_from &&
              format(new Date(String(book_from)), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})
            }
            endDate={
              book_to && format(new Date(String(book_to)), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})
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
        <PeriodDialog
          control={control}
          open={changeDatesDialog}
          setOpen={toggleChangeDatesDialog}
          setValue={setValue}
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
