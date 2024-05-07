import {
  PriceDetailsContainer,
  PriceDetailsWrapper,
  RentalDetailsContainer,
  RentalDetailsWrapper,
  TakeAway,
  TakeAwayInfoContsiner,
  TakeAwayWrapper
} from '../../views/pages/successful-payment/styles'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate } from '@tanstack/react-query'
import { queryClient } from '../_app'
import { DefaultButton } from 'src/views/components/button'
import useOrders from 'src/views/pages/profile/orders/useOrders'
import {useTranslation} from "next-i18next";

const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: true })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Image = dynamic(() => import('src/views/components/image'), { ssr: false })

const SuccessfulPayment = () => {
  const {t, i18n} = useTranslation()
  const router = useRouter()

  const { carOrderID } = router.query

  const { userOrderDetails, productData } = useOrders(Number(carOrderID))

  console.log(userOrderDetails, 'userOrderDetails')

  console.log(productData, 'productData')

  return (
    <div className='bg-white'>
      <RentalDetailsContainer>
        <PriceDetailsContainer>
          <div className='lg:w-4/12 xl:w-5/12 flex flex-col items-center shrink-0'>
            <div className='flex items-center mb-4 md:mb-0'>
              <Icon svgPath='success' height={40} width={40} className='fill-transparent mr-4 flex shrink-0' />
              <Typography type='h3' className='text-white text-md md:text-2lg'>
                {t('transaction_success')}
              </Typography>
            </div>
          </div>
          <div className='w-full lg:w-8/12 xl:w-7/12 md:pl-10 lg:pl-0 flex flex-col md:flex-row  gap-4 md:gap-24'>
            <RentalDetailsWrapper>
              <Typography type='body' color='light' className='text-white/50'>
                {t('order_date')}
              </Typography>
              {userOrderDetails?.created_at && (
                <Typography type='subtitle' className='text-white'>
                  {format(parseISO(userOrderDetails?.created_at), 'd MMM yyyy HH:mm', i18n.language === 'ka' ? { locale: ka } : {})}
                </Typography>
              )}
            </RentalDetailsWrapper>
            <RentalDetailsWrapper>
              <Typography type='body' color='light' className='text-white/50'>
                {t('order_number')}
              </Typography>
              <Typography type='subtitle' className='text-white'>
                #{userOrderDetails?.id}
              </Typography>
            </RentalDetailsWrapper>
            <RentalDetailsWrapper>
              <Typography type='body' color='light' className='text-white/50'>
                {t('publisher')}
              </Typography>
              <Typography type='subtitle' className='text-white'>
                {productData?.company?.information?.name}
              </Typography>
            </RentalDetailsWrapper>
          </div>
        </PriceDetailsContainer>
      </RentalDetailsContainer>
      <Divider />
      <PriceDetailsContainer className='md:py-10 lg:py-16 p-4 md:px-10 lg:px-0 justify-center'>
        <div className='lg:w-4/12 xl:w-5/12 flex flex-col xl:items-start shrink-0'>
          <div className='flex flex-col'>
            <div className='xl:w-[400px] w-[320px] shrink-0'>
              <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                <Image src={productData?.images?.split(',')[0]} alt='' height={'100%'} width={'100%'} className='object-cover' />
              </div>
            </div>

            <Typography type='h5' className='font-bold my-4 text-[24px]'>
              {productData?.manufacturer?.title} {productData?.manufacturer_model?.title} {productData?.prod_year}
            </Typography>
            <Typography type='subtitle' className='font-bold text-[#3EB75E] text-[24px]'>
              {t('active')}
            </Typography>
          </div>
        </div>
        <div className='w-full lg:w-6/12 xl:w-5/12 md:pl-10 lg:pl-0'>
          <div className=''>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <div className='flex shrink-0'>
                    <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent' />
                  </div>
                  <Typography type='body' color='light'>
                    {t('take_away')}
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='lg:w-7/12'>
                <Typography type='subtitle'>{userOrderDetails?.start_address}</Typography>
                {userOrderDetails?.start_date && userOrderDetails?.start_time && (
                  <Typography type='body' color='light'>
                    {format(parseISO(userOrderDetails?.start_date), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})}
                    {' - '}
                    {format(parseISO(`1970-01-01T${userOrderDetails?.start_time}`), 'HH:mm')}
                  </Typography>
                )}
              </div>
            </TakeAwayInfoContsiner>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <div className='flex shrink-0'>
                    <Icon svgPath='booking-stop' height={24} width={24} className='fill-transparent' />
                  </div>
                  <Typography type='body' color='light'>
                    {t('return')}
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='lg:w-7/12'>
                <Typography type='subtitle'>{userOrderDetails?.end_address}</Typography>
                {userOrderDetails?.end_date && userOrderDetails?.end_time && (
                  <Typography type='body' color='light'>
                    {format(parseISO(userOrderDetails?.end_date), 'd MMM yyyy', i18n.language === 'ka' ? { locale: ka } : {})}
                    {' - '}
                    {format(parseISO(`1970-01-01T${userOrderDetails?.end_time}`), 'HH:mm')}
                  </Typography>
                )}
              </div>
            </TakeAwayInfoContsiner>
          </div>
          <Divider />
          <div>
            <PriceDetailsWrapper>
              <Typography type='subtitle'>{t('rent_price')} x {userOrderDetails?.days} {t('day')}</Typography>
              <Typography type='subtitle' className='whitespace-nowrap flex shrink-0'>
                {productData?.price} ₾
              </Typography>
            </PriceDetailsWrapper>

            {productData?.user_selected_product_services.map((service: any, index: number) => (
              <PriceDetailsWrapper key={index}>
                <Typography type='subtitle'>
                  {service?.title} {service?.quantity && 'x'} {service?.quantity}
                </Typography>
                <Typography type='subtitle'>
                  {service?.company_service_type_id == 1
                    ? service?.price * service?.count * userOrderDetails?.days
                    : service?.price * service?.count}
                  ₾
                </Typography>
              </PriceDetailsWrapper>
            ))}

            <PriceDetailsWrapper>
              <Typography type='subtitle'>{t('service_commission')}  {userOrderDetails?.fee} %</Typography>
              <Typography type='subtitle'>
                {((productData?.price * userOrderDetails?.days) / 100) * userOrderDetails?.fee}{' '}
              </Typography>
            </PriceDetailsWrapper>

            <Divider />
            <PriceDetailsWrapper>
              <Typography type='subtitle' className='font-bold'>
                {t('sum')}
              </Typography>
              <Typography type='subtitle' className='font-bold'>
                {userOrderDetails?.price} ₾
              </Typography>
            </PriceDetailsWrapper>
            <DefaultButton
              text={t('view_bookings')}
              onClick={() => router.push('/profile/orders')}
              textColor='text-white'
              icon
              bg='bg-raisin-100'
              className='text-[14px] font-normal px-6 h-10 md:h-12'
            />
          </div>
        </div>
      </PriceDetailsContainer>
    </div>
  )
}

export default SuccessfulPayment

export async function getStaticProps({ locale }: { locale: string }) {
  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...translations
    }
  }
}
