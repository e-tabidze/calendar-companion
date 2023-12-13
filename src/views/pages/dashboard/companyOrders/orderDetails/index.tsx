import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
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

interface Props {
  toggleDetails: () => void
  setOrderId: any
  orderId: number
}

const OrderDetails: React.FC<Props> = ({ toggleDetails, setOrderId, orderId }) => {
  const [cancelOrderDialog, setCancelOrderDialog] = useState(false)

  const { companyOrder, postOrderStatus } = useCompanyOrders(orderId!)

  const queryClient = useQueryClient()

  console.log(companyOrder && JSON.parse(companyOrder?.product_data), 'DATA')

  const toggleCancelOrderDialog = () => setCancelOrderDialog(!cancelOrderDialog)

  const activeOrderStatusMutation = useMutation(() => postOrderStatus('', orderId!, 1), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyOrder'])
      queryClient.invalidateQueries(['companyOrders'])
    }
  })

  const cancelOrderStatusMutation = useMutation(() => postOrderStatus('', orderId!, 2), {
    onSuccess: () => {
      queryClient.invalidateQueries(['companyOrder'])
      queryClient.invalidateQueries(['companyOrders'])
    }
  })

  return (
    <>
      <OrderDetailsContainer>
        <div className='flex items-center md:w-full gap-6 p-4'>
          <IconTextButton
            icon='backWithBg'
            width={38}
            height={38}
            label='შემოსული ჯავშნები'
            onClick={() => {
              toggleDetails()
              setOrderId(null)
            }}
          />
        </div>
        <Divider />
        <div className='bg-raisin-5 w-full'>
          <RentalDetailsContainer>
            <RentalDetailsWrapper>
              <Typography type='body' color='light'>
                შეკვეთის თარიღი
              </Typography>
              <Typography type='subtitle'>{companyOrder?.created_at}</Typography>
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
            <Typography type='h5' className='text-2sm lg:text-md'>პ.ნ. {companyOrder?.identification_number}</Typography>
            <div className='flex flex-col sm:flex-row w-full justify-between my-6'>
              <ul className=''>
                <li className='flex items-center space-x-4 my-3'>
                  <Icon svgPath='user' width={18} height={20} />
                  <Typography type='subtitle'>{companyOrder?.dob}</Typography>
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
                  <Typography type='subtitle'>{companyOrder?.driver_license_expiration}</Typography>
                </li>
              </ul>
            </div>
            <Divider />
            <div className=''>
              <TakeAwayInfoContsiner>
                <TakeAwayWrapper>
                  <TakeAway>
                    <Typography type='body' color='light'>
                      დაწყება
                    </Typography>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4 lg:mr-0">
                        <Icon svgPath='calendarGreen' width={18} height={20} />
                      </div>
                      <Typography type='body' color='light'>
                        {companyOrder?.start_date} {companyOrder?.start_time}
                      </Typography>
                    </div>

                  </TakeAway>
                </TakeAwayWrapper>
                <div className='lg:w-7/12'>
                  <Typography type='subtitle'>{companyOrder?.start_address}</Typography>
                </div>
              </TakeAwayInfoContsiner>
              <TakeAwayInfoContsiner>
                <TakeAwayWrapper>
                  <TakeAway>
                    <Typography type='body' color='light'>
                      დასრულება
                    </Typography>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4 lg:mr-0">
                        <Icon svgPath='calendarRed' width={18} height={20} />
                      </div>
                      <Typography type='body' color='light'>
                        {companyOrder?.end_date} {companyOrder?.end_time}
                      </Typography>
                    </div>

                  </TakeAway>
                </TakeAwayWrapper>
                <div className='lg:w-7/12'>
                  <Typography type='subtitle'>{companyOrder?.end_address}</Typography>
                </div>
              </TakeAwayInfoContsiner>
            </div>
            <Divider />
            <div>
              <PriceDetailsWrapper>
                <Typography type='subtitle'>ქირაობის ღირებულება x {companyOrder?.days} დღე</Typography>
                <Typography type='subtitle'>{companyOrder?.price}</Typography>
              </PriceDetailsWrapper>
              <PriceDetailsWrapper>
                <Typography type='subtitle'>დაზღვევა - საბაზისო</Typography>
                <Typography type='subtitle'>0.00$</Typography>
              </PriceDetailsWrapper>
              <PriceDetailsWrapper>
                <Typography type='subtitle'>გადასახადები და საკომისიოები</Typography>
                <Typography type='subtitle'>203$</Typography>
              </PriceDetailsWrapper>
              <PriceDetailsWrapper>
                <Typography type='subtitle'>ბავშვის სავარძელი</Typography>
                <Typography type='subtitle'>203$</Typography>
              </PriceDetailsWrapper>
              <Divider />
              <PriceDetailsWrapper>
                <Typography type='subtitle' className='font-bold'>
                  ჯამი
                </Typography>
                <Typography type='subtitle' className='font-bold'>
                  203$
                </Typography>
              </PriceDetailsWrapper>
            </div>
          </div>
          <div className='w-full mb-6 md:mb-0 lg:w-5/12 flex flex-col items-center md:w-auto shrink-0 md:pl-16 lg:pl-0'>
            <Image src='/images/car.png' alt='' height={150} width={200} className='m-auto rounded-lg' />
            <div>
              <Typography type='h5' className='font-bold mt-6'>
                {companyOrder?.product_data?.manufacturer?.title}
                {companyOrder?.product_data?.manufacturer_model?.title}
                {companyOrder?.product_data?.prod_year}
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
