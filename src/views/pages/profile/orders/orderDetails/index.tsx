import { useState } from 'react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import {
  PriceDetailsContainer,
  PriceDetailsWrapper,
  RentalDetailsContainer,
  RentalDetailsWrapper,
  TakeAway,
  TakeAwayInfoContsiner,
  TakeAwayWrapper
} from './styles'
import Icon from 'src/views/app/Icon'
import useOrders from '../useOrders'

import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import Image from 'src/views/components/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import CancelOrder from '../cancelOrder'
import Link from 'next/link'
import Toast from 'src/views/components/toast'
import { removeExtraDecimalDigits } from 'src/utils/priceFormat'

const OrderDetails = () => {
  const { t, i18n } = useTranslation()

  const [cancelOrderDialog, setCancelOrderDialog] = useState(false)

  const toggleCancelOrderDialog = () => setCancelOrderDialog(!cancelOrderDialog)

  const router = useRouter()
  const { id } = router.query

  const { userOrderDetails, productData } = useOrders(String(id))

  console.log(userOrderDetails, 'userOrderDetails')

  return (
    <div className='border border-raisin-10 rounded-3xl'>
      <div className='flex items-center md:w-full gap-6 p-4 md:p-8'>
        <IconTextButton icon='backWithBg' width={38} height={38} label={t('my_orders')} onClick={() => router.back()} />
      </div>
      {userOrderDetails?.status_id === 7 && (
        <div className='bg-red-70 w-full px-4 md:px-10 py-7'>
          <Typography type='subtitle' className='text-white'>
            {t('vehicle_order')}{' '}
            <span className='font-bold'>
              {productData?.manufacturer?.title} {productData?.manufacturer_model?.title} {productData?.prod_year}{' '}
            </span>{' '}
            {t('is_canceled')}
          </Typography>
          <Typography type='subtitle' className='text-white mt-3'>
            {t('reason')} : {userOrderDetails?.cancel_reason}
          </Typography>
        </div>
      )}
      <RentalDetailsContainer>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            {t('order_date')}
          </Typography>
          {userOrderDetails?.created_at && (
            <Typography type='subtitle'>
              {format(
                parseISO(userOrderDetails?.created_at),
                'd MMM yyyy HH:mm',
                i18n.language === 'ka' ? { locale: ka } : {}
              )}
            </Typography>
          )}
        </RentalDetailsWrapper>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            {t('order_number')}
          </Typography>
          <Typography type='subtitle'>#{userOrderDetails?.id}</Typography>
        </RentalDetailsWrapper>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            {t('publisher')}
          </Typography>
          <Typography type='subtitle'>{userOrderDetails && productData?.company?.information?.name}</Typography>
        </RentalDetailsWrapper>
        <a
          href={`tel:${productData?.company?.information?.phone_numbers}`}
          className='hidden md:flex items-center border border-green-80 rounded-lg gap-2 p-2'
        >
          <Icon svgPath='phone' width={20} height={20} className='fill-transparent' />
          <Typography type='subtitle'>{productData?.company?.information?.phone_numbers}</Typography>
        </a>
      </RentalDetailsContainer>
      <Divider />
      <PriceDetailsContainer>
        <div className='w-full lg:w-8/12 xl:w-7/12'>
          <div>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent' />
                  <Typography type='body' color='light'>
                    {t('take_away')}
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='lg:w-7/12 pl-9 lg:pl-0'>
                <Typography type='subtitle'>
                  {userOrderDetails?.start_city}, {userOrderDetails?.start_address}
                </Typography>
                {userOrderDetails?.start_date && userOrderDetails?.start_time && (
                  <Typography type='body' color='light'>
                    {format(
                      parseISO(userOrderDetails?.start_date),
                      'd MMM yyyy',
                      i18n.language === 'ka' ? { locale: ka } : {}
                    )}
                    {' - '}
                    {format(parseISO(`1970-01-01T${userOrderDetails?.start_time}`), 'HH:mm')}
                  </Typography>
                )}
              </div>
            </TakeAwayInfoContsiner>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <Icon svgPath='booking-stop' height={24} width={24} className='fill-transparent' />
                  <Typography type='body' color='light'>
                    {t('return')}
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='lg:w-7/12 pl-9 lg:pl-0'>
                <Typography type='subtitle'>
                  {userOrderDetails?.end_city}, {userOrderDetails?.end_address}
                </Typography>
                {userOrderDetails?.end_date && userOrderDetails?.end_time && (
                  <Typography type='body' color='light'>
                    {format(
                      parseISO(userOrderDetails?.end_date),
                      'd MMM yyyy',
                      i18n.language === 'ka' ? { locale: ka } : {}
                    )}
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
              <Typography type='subtitle'>
                {t('rent_price')} x {userOrderDetails?.days} {t('day')}
              </Typography>
              <Typography type='subtitle'>
                {removeExtraDecimalDigits(productData?.price_gel * userOrderDetails?.days)}₾
              </Typography>
            </PriceDetailsWrapper>
            {productData?.user_selected_product_services.map((service: any, index: number) => (
              <PriceDetailsWrapper key={index}>
                <Typography type='subtitle'>
                  {service?.title} {service?.count > 0 ? `x ${service?.count}` : ''}
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
              <Typography type='subtitle'>ავტომობილის მიწოდების ღირებულება</Typography>
              <Typography type='subtitle'>{removeExtraDecimalDigits(userOrderDetails?.supply_price_pay)}₾</Typography>
            </PriceDetailsWrapper>

            <PriceDetailsWrapper>
              <Typography type='subtitle'>ავტომობილის მისამართზე დატოვების ღირებულება</Typography>
              <Typography type='subtitle'>{removeExtraDecimalDigits(userOrderDetails?.return_location_price_pay)}₾</Typography>
            </PriceDetailsWrapper>

            <Divider />
            <PriceDetailsWrapper>
              <Typography type='subtitle' className='font-bold'>
                {t('sum')}
              </Typography>
              <Typography type='subtitle' className='font-bold'>
                {removeExtraDecimalDigits(userOrderDetails?.price)} ₾
              </Typography>
            </PriceDetailsWrapper>
          </div>
        </div>
        <div className='lg:w-4/12 xl:w-5/12 flex flex-col items-center md:pl-10 lg:pl-0 shrink-0'>
          <div className='w-[260px] shrink-0'>
            <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
              {productData?.images && (
                <Image
                  src={productData?.images?.split(',')[0]}
                  alt={
                    productData?.manufacturer?.title + productData?.manufacturer_model?.title + productData?.prod_year
                  }
                  height='100%'
                  width='100%'
                  className='object-cover'
                />
              )}
            </div>
          </div>

          <div className='text-center'>
            <Link href={`/details/${productData?.id}`}>
              <Typography type='h5' className='font-bold mt-6 hover:text-green-100'>
                {productData?.manufacturer?.title} {productData?.manufacturer_model?.title} {productData?.prod_year}
              </Typography>
            </Link>
            <Typography
              type='subtitle'
              className={`${
                userOrderDetails?.status_id === 0
                  ? 'text-yellow-100'
                  : userOrderDetails?.status_id === 5
                  ? 'text-yellow-100'
                  : userOrderDetails?.status_id === 1
                  ? 'text-green-100'
                  : userOrderDetails?.status_id === 2
                  ? 'text-orange-100'
                  : userOrderDetails?.status_id === 7
                  ? 'text-red-120'
                  : ''
              } mb-6`}
            >
              {userOrderDetails?.status_id === 0
                ? t('pending')
                : userOrderDetails?.status_id === 1
                ? t('approved')
                : userOrderDetails?.status_id === 2
                ? t('canceled')
                : userOrderDetails?.status_id === 5
                ? t('busy')
                : userOrderDetails?.status_id === 7
                ? 'canceled_status'
                : ''}
            </Typography>
            {userOrderDetails?.deposit_currency && userOrderDetails?.deposit_amount && (
              <Toast
                type='warning'
                className='mb-8 max-w-[300px]'
                title={
                  <>
                    {t('renter_request_amount')}{' '}
                    <span className='font-bold'>
                      {t('deposit_amount')} {userOrderDetails?.deposit_amount}
                      {userOrderDetails?.deposit_currency === 'GEL' ? '₾' : '$'}
                    </span>
                    , {t('which_play_at_place')}
                  </>
                }
              />
            )}
          </div>

          {userOrderDetails?.status_id === 0 ||
            (userOrderDetails?.status_id === 1 && (
              <DefaultButton
                bg='bg-raisin-10'
                text={t('booking_cancel')}
                className='!text-raisin-100'
                onClick={toggleCancelOrderDialog}
              />
            ))}
        </div>
      </PriceDetailsContainer>
      <CancelOrder open={cancelOrderDialog} close={toggleCancelOrderDialog} orderId={userOrderDetails?.id} />
      <div className='md:hidden flex justify-between items-center fixed w-full bg-white bottom-[75px] left-0 p-4 shadow-sm border-b-1 border-raisin-10'>
        <Typography type='subtitle' className='mr-8'>
          {t('call')}
        </Typography>
        <a
          href={`tel:${productData?.company?.information?.phone_numbers}`}
          className='flex items-center border border-green-80 rounded-lg gap-2 p-2'
        >
          <Icon svgPath='phone' width={20} height={20} className='fill-transparent' />
          <Typography type='subtitle'>{productData?.company?.information?.phone_numbers}</Typography>
        </a>
      </div>
    </div>
  )
}

export default OrderDetails
