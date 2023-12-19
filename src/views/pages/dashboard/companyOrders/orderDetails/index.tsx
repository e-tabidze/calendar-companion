import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import CancelOrderDialog from '../cancelOrderDialog'
import useCompanyOrders from '../useCompanyOrders'
import {
  OrderDetailsContainer,
  PriceDetailsContainer,
  PriceDetailsWrapper,
  RentalDetailsContainer,
  RentalDetailsWrapper,
  TakeAway,
  TakeAwayInfoContsiner,
  TakeAwayWrapper
} from './styles'
import Icon from 'src/views/app/Icon'
import Image from 'src/views/components/image'

import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import OrderDetailsSkeleton from './skeletonLoading'
import { useRouter } from 'next/router'

const OrderDetails = () => {
  const [cancelOrderDialog, setCancelOrderDialog] = useState(false)

  const router = useRouter()

  const { id } = router.query

  const { companyOrder, postOrderStatus, companyOrderproductData, companyOrderLoading } = useCompanyOrders(String(id)!)

  const queryClient = useQueryClient()

  console.log(companyOrderproductData, 'DATA')

  const toggleCancelOrderDialog = () => setCancelOrderDialog(!cancelOrderDialog)

  const activeOrderStatusMutation = useMutation(() => postOrderStatus('', String(id)!, 1), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyOrder'])
      queryClient.invalidateQueries(['companyOrders'])
    }
  })

  const cancelOrderStatusMutation = useMutation(() => postOrderStatus('', String(id)!, 2), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyOrder'])
      queryClient.invalidateQueries(['companyOrders'])
    }
  })

  if (companyOrderLoading) {
    return <OrderDetailsSkeleton />
  }

  return (
    <>
      <OrderDetailsContainer>
        <div className='flex items-center md:w-full gap-6 p-4'>
          <IconTextButton
            icon='backWithBg'
            width={38}
            height={38}
            label='შემოსული ჯავშნები'
            onClick={() => router.push('/dashboard/orders')}
          />
        </div>
        <Divider />
        <div className='bg-raisin-5 w-full'>
          <RentalDetailsContainer>
            <RentalDetailsWrapper>
              <Typography type='body' color='light'>
                შეკვეთის თარიღი
              </Typography>
              {companyOrder?.created_at && (
                <Typography type='subtitle'>
                  {format(parseISO(companyOrder?.created_at), 'd MMM yyyy HH:mm', { locale: ka })}
                </Typography>
              )}
            </RentalDetailsWrapper>
            <RentalDetailsWrapper>
              <Typography type='body' color='light'>
                შეკვეთის ნომერი
              </Typography>
              <Typography type='subtitle'>#{companyOrder?.id}</Typography>
            </RentalDetailsWrapper>
          </RentalDetailsContainer>
        </div>
        <Divider />
        <Divider />
        <PriceDetailsContainer>
          <div className='w-full lg:w-7/12'>
            <Typography type='h3' className='font-bold text-3md lg:text-2lg'>
              {companyOrder?.first_name} {companyOrder?.last_name}
            </Typography>
            <Typography type='h5' className='text-2sm lg:text-md'>
              პ.ნ. {companyOrder?.identification_number}
            </Typography>
            <div className='flex flex-col sm:flex-row w-full justify-between my-6'>
              <ul className=''>
                <li className='flex items-center space-x-4 my-3'>
                  <Icon svgPath='user' width={18} height={20} />
                  {companyOrder?.dob && (
                    <Typography type='subtitle'>
                      {format(parseISO(companyOrder?.dob), 'd MMM yyyy', { locale: ka })}{' '}
                    </Typography>
                  )}
                </li>
                <li className='flex items-center space-x-4 my-3'>
                  <Icon svgPath='email' width={20} height={18} />
                  <Typography type='subtitle'>{companyOrder?.email}</Typography>
                </li>
                <li className='flex items-center space-x-4 my-3'>
                  <Icon svgPath='phone' width={20} height={20} className='fill-transparent' />
                  <Typography type='subtitle'>{companyOrder?.phone}</Typography>
                </li>
              </ul>
              <ul>
                <li className='flex items-center space-x-4 my-3'>
                  <Typography type='subtitle'>მართვის მოწმობის მოქმედების ვადა</Typography>
                </li>
                <li className='flex items-center space-x-4 my-3'>
                  <Icon svgPath='calendar' width={24} height={24} className='fill-transparent' />
                  {companyOrder?.driver_license_expiration && (
                    <Typography type='subtitle'>
                      {format(parseISO(companyOrder?.driver_license_expiration), 'd MMM yyyy', { locale: ka })}
                    </Typography>
                  )}
                </li>
              </ul>
            </div>
            <Divider />
            <div className=''>
              <TakeAwayInfoContsiner>
                <TakeAwayWrapper>
                  <TakeAway>
                    <Typography type='body' color='light' className='lg:w-4/12'>
                      დაწყება
                    </Typography>
                    <div className='flex items-center lg:w-8/12'>
                      <div className='flex-shrink-0 mr-3'>
                        <Icon svgPath='calendarGreen' width={18} height={20} />
                      </div>
                      {companyOrder?.start_date && companyOrder?.start_time && (
                        <Typography type='body' color='light'>
                          {format(parseISO(companyOrder?.start_date), 'd MMM yyyy', { locale: ka })}
                          {' - '}
                          {format(parseISO(`1970-01-01T${companyOrder?.start_time}`), 'HH:mm')}
                        </Typography>
                      )}
                    </div>
                  </TakeAway>
                </TakeAwayWrapper>
                <div className='lg:w-6/12 lg:pl-4'>
                  <Typography type='subtitle'>{companyOrder?.start_address}</Typography>
                </div>
              </TakeAwayInfoContsiner>
              <TakeAwayInfoContsiner>
                <TakeAwayWrapper>
                  <TakeAway>
                    <Typography type='body' color='light' className='lg:w-4/12'>
                      დასრულება
                    </Typography>
                    <div className='flex items-center lg:w-8/12'>
                      <div className='flex-shrink-0 mr-3'>
                        <Icon svgPath='calendarRed' width={18} height={20} />
                      </div>
                      {companyOrder?.end_date && companyOrder?.end_time && (
                        <Typography type='body' color='light'>
                          {format(parseISO(companyOrder?.end_date), 'd MMM yyyy', { locale: ka })}
                          {' - '}
                          {format(parseISO(`1970-01-01T${companyOrder?.end_time}`), 'HH:mm')}
                        </Typography>
                      )}
                    </div>
                  </TakeAway>
                </TakeAwayWrapper>
                <div className='lg:w-6/12 lg:pl-4'>
                  <Typography type='subtitle'>{companyOrder?.end_address}</Typography>
                </div>
              </TakeAwayInfoContsiner>
            </div>
            <Divider />
            <div>
              <PriceDetailsWrapper>
                <Typography type='subtitle'>ქირაობის ღირებულება x {companyOrder?.days} დღე</Typography>
                <Typography type='subtitle'>{companyOrderproductData?.price * companyOrder?.days} </Typography>
              </PriceDetailsWrapper>
              {companyOrderproductData?.user_selected_product_services.map((service: any, index: number) => (
                <PriceDetailsWrapper key={index}>
                  <Typography type='subtitle'>
                    {service?.title} {service?.quantity && 'x'} {service?.quantity}
                  </Typography>
                  <Typography type='subtitle'>
                    {service?.company_service_type_id == 1
                      ? service?.price * service?.count * companyOrder?.days
                      : service?.price * service?.count}
                    ₾
                  </Typography>
                </PriceDetailsWrapper>
              ))}
              <PriceDetailsWrapper>
                <Typography type='subtitle' className='font-bold'>
                  ჯამი
                </Typography>
                <Typography type='subtitle' className='font-bold'>
                  {companyOrder?.price} ₾
                </Typography>
              </PriceDetailsWrapper>
            </div>
          </div>
          <div className='w-full mb-6 md:mb-0 lg:w-5/12 flex flex-col items-center md:w-auto shrink-0 md:pl-16 lg:pl-0'>
            <div className='w-[260px] shrink-0'>
              <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                <Image
                  src={companyOrderproductData?.images.split(',')[0]}
                  alt=''
                  height={'100%'}
                  width={'100%'}
                  className='object-cover'
                />
              </div>
            </div>
            <div>
              <Typography type='h5' className='font-bold mt-6'>
                {companyOrderproductData?.manufacturer?.title}
                {companyOrderproductData?.manufacturer_model?.title}
                {companyOrderproductData?.prod_year}
              </Typography>
              <Typography
                type='subtitle'
                className={`text-bold ${
                  companyOrder?.status_id === 0
                    ? 'text-yellow-100'
                    : companyOrder?.status_id === 1
                    ? 'text-green-100'
                    : companyOrder?.status_id === 2
                    ? 'text-orange-100'
                    : ''
                } mb-6`}
              >
                {cancelOrderStatusMutation.isLoading || activeOrderStatusMutation.isLoading
                  ? 'Loading...'
                  : companyOrder?.status_id === 0
                  ? 'მოლოდინში'
                  : companyOrder?.status_id === 1
                  ? 'დადასტურებული'
                  : companyOrder?.status_id === 2
                  ? 'გაუქმებული'
                  : ''}
              </Typography>
            </div>
            {companyOrder?.status_id === 0 && (
              <div className='flex gap-2'>
                <DefaultButton
                  bg='bg-green-100'
                  textColor='text-white'
                  text='დადასტურება'
                  onClick={() => activeOrderStatusMutation.mutate()}
                />
                <DefaultButton bg='bg-raisin-10' text='გაუქმება' onClick={toggleCancelOrderDialog} />
              </div>
            )}
          </div>
        </PriceDetailsContainer>
      </OrderDetailsContainer>
      <CancelOrderDialog
        open={cancelOrderDialog}
        toggleModal={toggleCancelOrderDialog}
        handleCancelOrder={() => cancelOrderStatusMutation.mutate()}
      />
    </>
  )
}

export default OrderDetails
