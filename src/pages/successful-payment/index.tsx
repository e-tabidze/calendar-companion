import Image from 'src/views/components/image'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'
import {
  PriceDetailsContainer,
  PriceDetailsWrapper,
  RentalDetailsContainer,
  RentalDetailsWrapper,
  TakeAway,
  TakeAwayInfoContsiner,
  TakeAwayWrapper
} from '../../views/pages/successful-payment/styles'
import UseOrders from 'src/views/pages/profile/orders/useOrders'
import { useRouter } from 'next/router'
import { DefaultButton } from 'src/views/components/button'

const SuccessfulPayment = () => {
  const router = useRouter()

  const { carOrderID } = router.query

  const { userOrderDetails, productData } = UseOrders(Number(carOrderID))

  console.log(userOrderDetails, 'userOrderDetails')

  return (
    <div className='bg-white'>
      <RentalDetailsContainer>
        <PriceDetailsContainer>
          <div className='lg:w-4/12 xl:w-5/12 flex flex-col items-center shrink-0'>
            <div className='flex items-center mb-4 md:mb-0'>
              <Icon svgPath='success' height={40} width={40} className='fill-transparent mr-4 flex shrink-0' />
              <Typography type='h3' className='text-white text-md md:text-2lg'>
                წარმატებული ტრანზაქცია
              </Typography>
            </div>
          </div>
          <div className='w-full lg:w-8/12 xl:w-7/12 md:pl-10 lg:pl-0 flex flex-col md:flex-row  gap-4 md:gap-24'>
            <RentalDetailsWrapper>
              <Typography type='body' color='light' className='text-white/50'>
                შეკვეთის თარიღი
              </Typography>
              <Typography type='subtitle' className='text-white'>
                {userOrderDetails?.created_at}
              </Typography>
            </RentalDetailsWrapper>
            <RentalDetailsWrapper>
              <Typography type='body' color='light' className='text-white/50'>
                შეკვეთის ნომერი
              </Typography>
              <Typography type='subtitle' className='text-white'>
                #{userOrderDetails?.id}
              </Typography>
            </RentalDetailsWrapper>
            <RentalDetailsWrapper>
              <Typography type='body' color='light' className='text-white/50'>
                განმცხადებელი
              </Typography>
              <Typography type='subtitle' className='text-white'>
                {productData?.company?.information?.name}
              </Typography>
            </RentalDetailsWrapper>
          </div>
        </PriceDetailsContainer>
      </RentalDetailsContainer>
      <Divider />
      <PriceDetailsContainer className='md:py-10 lg:py-16 p-4 md:px-10 lg:px-0'>
        <div className='lg:w-4/12 xl:w-5/12 flex flex-col xl:items-center shrink-0'>
          <div className='flex flex-col'>
            <div className='w-[260px] shrink-0'>
              <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                <Image src='/images/car.png' alt='' height={'100%'} width={'100%'} className='object-cover' />
              </div>
            </div>

            <Typography type='h5' className='font-bold my-4'>
              {productData?.manufacturer?.title} {productData?.manufacturer_model?.title} {productData?.prod_year}
            </Typography>
            <Typography type='subtitle' className='text-bold text-green-100'>
              აქტიური
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
                    წაყვანა
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='lg:w-7/12'>
                <Typography type='subtitle'>{userOrderDetails?.start_address}</Typography>
                <Typography type='body' color='light'>
                  {userOrderDetails?.start_date} {userOrderDetails?.start_time}
                </Typography>
              </div>
            </TakeAwayInfoContsiner>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <div className='flex shrink-0'>
                    <Icon svgPath='booking-stop' height={24} width={24} className='fill-transparent' />
                  </div>
                  <Typography type='body' color='light'>
                    დაბრუნება
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='lg:w-7/12'>
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
              <Typography type='subtitle' className='whitespace-nowrap flex shrink-0'>
                520 ₾
              </Typography>
            </PriceDetailsWrapper>

            <PriceDetailsWrapper>
              <Typography type='subtitle'>დაზღვევა - საბაზისო</Typography>
              <Typography type='subtitle' className='whitespace-nowrap flex shrink-0'>
                120 ₾
              </Typography>
            </PriceDetailsWrapper>

            <PriceDetailsWrapper>
              <Typography type='subtitle'>გადასახადები და საკომისიოები</Typography>
              <Typography type='subtitle' className='whitespace-nowrap flex shrink-0'>
                20 ₾
              </Typography>
            </PriceDetailsWrapper>

            <PriceDetailsWrapper>
              <Typography type='subtitle'>ბავშვის სავარძელი</Typography>
              <Typography type='subtitle' className='whitespace-nowrap flex shrink-0'>
                20 ₾
              </Typography>
            </PriceDetailsWrapper>

            <Divider />
            <PriceDetailsWrapper>
              <Typography type='subtitle' className='font-bold'>
                ჯამი
              </Typography>
              <Typography type='subtitle' className='font-bold'>
                {userOrderDetails?.price} ₾
              </Typography>
            </PriceDetailsWrapper>
            <DefaultButton
              text='შეკვეთების ისტორია'
              onClick={() => router.push('/profile/orders')}
              textColor='text-white'
              bg='bg-raisin-100'
              className='text-sm md:text-md px-6 h-10 md:h-12'
            />
          </div>
        </div>
      </PriceDetailsContainer>
    </div>
  )
}

export default SuccessfulPayment
