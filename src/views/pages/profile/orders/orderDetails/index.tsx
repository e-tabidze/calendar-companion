import Image from 'next/image'
import { useState } from 'react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import CancelOrderDialog from '../cancelOrderDialog'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  toggleDetails: () => void
  orderId: any
  setOrderId: any
}

const OrderDetails: React.FC<Props> = ({ toggleDetails, orderId, setOrderId }) => {
  const [cancelOrderDialog, setCancelOrderDialog] = useState(false)

  const toggleCancelOrderDialog = () => setCancelOrderDialog(!cancelOrderDialog)

  console.log(orderId, 'orderId USER')

  const queryClient = useQueryClient()

  const { userOrderDetails, productData, cancelUserOrder } = useOrders(orderId!)

  console.log(productData, 'productData')

  const cancelOrderStatusMutation = useMutation(() => cancelUserOrder(orderId!, 2), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userOders'])
      queryClient.invalidateQueries(['userOdersDetails'])
    }
  })

  return (
    <div className='border border-raisin-10 rounded-2xl'>
      <div className='flex items-center md:w-full gap-6 p-4'>
        <IconTextButton
          icon='backWithBg'
          width={38}
          height={38}
          label='ჩემი შეკვეთები'
          onClick={() => {
            toggleDetails()
            setOrderId(null)
          }}
        />
      </div>
      <Divider />
      <RentalDetailsContainer>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            შეკვეთის თარიღი
          </Typography>
          <Typography type='subtitle'>{userOrderDetails?.created_at}</Typography>
        </RentalDetailsWrapper>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            შეკვეთის ნომერი
          </Typography>
          <Typography type='subtitle'>#{userOrderDetails?.id}</Typography>
        </RentalDetailsWrapper>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            განმცხადებელი
          </Typography>
          <Typography type='subtitle'>{userOrderDetails && productData?.company?.information?.name}</Typography>
        </RentalDetailsWrapper>
        <div className='hidden md:flex items-center border border-green-80 rounded-lg gap-2 p-2'>
          <Icon svgPath='phone' width={20} height={20} className='fill-transparent' />
          <Typography type='subtitle'>{productData?.company?.information?.phone_numbers}</Typography>
        </div>
      </RentalDetailsContainer>
      <Divider />
      <PriceDetailsContainer>
        <div className='w-full md:w-7/12'>
          <div className=''>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <Icon svgPath='locationPlay' height={24} width={24} className='fill-transparent' />
                  <Typography type='body' color='light'>
                    წაყვანა
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='w-7/12'>
                <Typography type='subtitle'>{userOrderDetails?.start_address}</Typography>
                <Typography type='body' color='light'>
                  {userOrderDetails?.start_date} {userOrderDetails?.start_time}
                </Typography>
              </div>
            </TakeAwayInfoContsiner>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <Icon svgPath='locationPlay' height={24} width={24} className='fill-transparent' />
                  <Typography type='body' color='light'>
                    დაბრუნება
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='w-7/12'>
                <Typography type='subtitle'>{userOrderDetails?.end_address}</Typography>
                <Typography type='body' color='light'>
                  {userOrderDetails?.end_date} {userOrderDetails?.end_time}
                </Typography>
              </div>
            </TakeAwayInfoContsiner>
          </div>
          <Divider />
          <div>
            <PriceDetailsWrapper>
              <Typography type='subtitle'>ქირაობის ღირებულება x {userOrderDetails?.days} დღე</Typography>
              <Typography type='subtitle'>{productData?.price * userOrderDetails?.days} </Typography>
            </PriceDetailsWrapper>
            {productData?.user_selected_product_services.map((service: any, index: number) => (
              <PriceDetailsWrapper key={index}>
                <Typography type='subtitle'>
                  {service?.title} {service?.quantity && 'x'} {service?.quantity}
                </Typography>
                <Typography type='subtitle'> {service?.type_id ==1 ? (service?.price * service?.quantity)*userOrderDetails?.days:service?.price * service?.quantity } ₾ </Typography>
              </PriceDetailsWrapper>
            ))}

            <Divider />
            <PriceDetailsWrapper>
              <Typography type='subtitle' className='font-bold'>
                ჯამი
              </Typography>
              <Typography type='subtitle' className='font-bold'>
                {userOrderDetails.price} ₾
              </Typography>
            </PriceDetailsWrapper>
          </div>
        </div>
        <div className='w-5/12 flex flex-col items-center'>
          <Image
            src={productData?.images?.split(',')[0]}
            alt={productData?.manufacturer?.title + productData?.manufacturer_model?.title + productData?.prod_year}
            height={150}
            width={200}
            className='m-auto rounded-lg'
          />
          <Typography type='h5' className='font-bold my-6'>
            {productData?.manufacturer?.title}
            {productData?.manufacturer_model?.title}
            {productData?.prod_year}
          </Typography>
          <Typography
            type='subtitle'
            className={`text-bold ${
              userOrderDetails?.status_id === 0
                ? 'text-yellow-100'
                : userOrderDetails?.status_id === 1
                ? 'text-green-100'
                : userOrderDetails?.status_id === 2
                ? 'text-orange-100'
                : ''
            } mb-6`}
          >
            {userOrderDetails?.status_id === 0
              ? 'მოლოდინში'
              : userOrderDetails?.status_id === 1
              ? 'დადასტურებული'
              : userOrderDetails?.status_id === 2
              ? 'გაუქმებული'
              : ''}
          </Typography>
          {userOrderDetails?.status_id === 0 ||
            (userOrderDetails?.status_id === 1 && (
              <DefaultButton bg='bg-raisin-10' text='ჯავშნის გაუქმება' onClick={toggleCancelOrderDialog} />
            ))}
        </div>
      </PriceDetailsContainer>
      <CancelOrderDialog
        open={cancelOrderDialog}
        close={toggleCancelOrderDialog}
        handleCancel={() => {
          cancelOrderStatusMutation.mutate()
          toggleCancelOrderDialog()
        }}
      />
    </div>
  )
}

export default OrderDetails
