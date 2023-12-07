import Image from 'next/image'
import { useState } from 'react'
import { DefaultButton, IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
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

interface Props {
  toggleDetails: () => void
  setOrderId: any
}

const OrderDetails: React.FC<Props> = ({ toggleDetails, setOrderId }) => {
  const [cancelOrderDialog, setCancelOrderDialog] = useState(false)

  const toggleCancelOrderDialog = () => setCancelOrderDialog(!cancelOrderDialog)

  return (
    <OrderDetailsContainer>
      <div className='hidden md:flex items-center md:w-full gap-6 p-4'>
        <IconTextButton
          icon='/icons/backWithBg.svg'
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
            <Typography type='subtitle'>12 მარტი, 2023</Typography>
          </RentalDetailsWrapper>
          <RentalDetailsWrapper>
            <Typography type='body' color='light'>
              შეკვეთის ნომერი
            </Typography>
            <Typography type='subtitle'>#03122328787</Typography>
          </RentalDetailsWrapper>
        </RentalDetailsContainer>
      </div>
      <Divider />
      <Divider />
      <PriceDetailsContainer>
        <div className='w-full md:w-7/12'>
          <Typography type='h3' className='font-bold'>
            ლევან გეჯაძე
          </Typography>
          <Typography type='h5'>პ.ნ. 01010011102</Typography>
          <div className='flex w-full justify-between my-6'>
            <ul className=''>
              <li className='flex items-center space-x-4 my-3'>
                <Image src='/icons/user.svg' alt='' width={20} height={20} />
                <Typography type='subtitle'>22 - 00 - 2001</Typography>
              </li>
              <li className='flex items-center space-x-4 my-3'>
                <Image src='/icons/email.svg' alt='' width={20} height={20} />
                <Typography type='subtitle'>levan.gejadze@gmail.com</Typography>
              </li>
              <li className='flex items-center space-x-4 my-3'>
                <Image src='/icons/phone.svg' alt='' width={20} height={20} />
                <Typography type='subtitle'>+995 599 33 16 54</Typography>
              </li>
            </ul>
            <ul>
              <li className='flex items-center space-x-4 my-3'>
                <Typography type='subtitle'>მართვის მოწმობის მოქმედების ვადა</Typography>
              </li>
              <li className='flex items-center space-x-4 my-3'>
                <Image src='/icons/calendar.svg' alt='' width={20} height={20} />
                <Typography type='subtitle'>22 - 00 - 2001</Typography>
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
                  <Image src='/icons/calendarGreen.svg' height={24} width={24} alt='' />
                  <Typography type='body' color='light'>
                    22-01-2027, 12:00
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='w-7/12'>
                <Typography type='subtitle'>თბილისი, იაკობ ცურტაველის 72</Typography>
              </div>
            </TakeAwayInfoContsiner>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <Typography type='body' color='light'>
                    დასრულება
                  </Typography>
                  <Image src='/icons/calendarRed.svg' height={24} width={24} alt='' />
                  <Typography type='body' color='light'>
                    27-01-2027, 15:00
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='w-7/12'>
                <Typography type='subtitle'>თბილისი, იაკობ ცურტაველის 72</Typography>
              </div>
            </TakeAwayInfoContsiner>
          </div>
          <Divider />
          <div>
            <PriceDetailsWrapper>
              <Typography type='subtitle'>ქირაობის ღირებულება x 6 დღე</Typography>
              <Typography type='subtitle'>203$</Typography>
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
        <div className='w-full mb-6 md:mb-0 md:w-5/12 flex flex-col items-center'>
          <Image src='/images/car.png' alt='' height={150} width={200} className='m-auto rounded-lg' />
          <div>
            <Typography type='h5' className='font-bold mt-6'>
              Toyota Prius UTO 2017
            </Typography>
            <Typography type='subtitle' className='text-bold text-yellow-100 mb-6'>
              მოლოდინში
            </Typography>
          </div>
          <div className='flex gap-2'>
            <DefaultButton
              bg='bg-green-100'
              textColor='text-white'
              text='დადასტურება'
              onClick={toggleCancelOrderDialog}
            />
            <DefaultButton bg='bg-raisin-10' text='გაუქმება' onClick={toggleCancelOrderDialog} />
          </div>
        </div>
      </PriceDetailsContainer>
    </OrderDetailsContainer>
  )
}

export default OrderDetails
