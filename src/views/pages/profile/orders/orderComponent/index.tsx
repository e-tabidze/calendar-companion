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

interface Props {
  toggleDetails: () => void
}

const OrderComponent: React.FC<Props> = ({ toggleDetails }) => {
  const [cancelOrderDialog, setCancelOrderDialog] = useState(false)

  const toggleCancelOrderDialog = () => setCancelOrderDialog(!cancelOrderDialog)

  return (
    <div>
      <div className='flex items-center md:w-full gap-6 p-4'>
        <IconTextButton icon='/icons/backWithBg.svg' label='ჩემი შეკვეთები' onClick={toggleDetails} />
      </div>
      <Divider />
      <RentalDetailsContainer>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            შეკვეთის თარიღი
          </Typography>
          <Typography type='subtitle'>30 ივნ, 2022</Typography>
        </RentalDetailsWrapper>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            შეკვეთის ნომერი
          </Typography>
          <Typography type='subtitle'>#03122328787</Typography>
        </RentalDetailsWrapper>
        <RentalDetailsWrapper>
          <Typography type='body' color='light'>
            განმცხადებელი
          </Typography>
          <Typography type='subtitle'>შპს ბენე+</Typography>
        </RentalDetailsWrapper>
        <div className='hidden md:flex items-center border border-green-80 rounded-lg gap-2 p-2'>
          <Image src='/icons/phone.svg' alt='' height={16} width={16} />
          <Typography type='subtitle'>+995 599 33 16 54</Typography>
        </div>
      </RentalDetailsContainer>
      <Divider />
      <PriceDetailsContainer>
        <div className='w-full md:w-7/12'>
          <div className=''>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <Image src='/icons/locationPlay.svg' height={24} width={24} alt='' />
                  <Typography type='body' color='light'>
                    წაყვანა
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='w-7/12'>
                <Typography type='subtitle'>თბილისი, იაკობ ცურტაველის 72</Typography>
                <Typography type='body' color='light'>
                  ივნ 17, 2022. 11:00
                </Typography>
              </div>
            </TakeAwayInfoContsiner>
            <TakeAwayInfoContsiner>
              <TakeAwayWrapper>
                <TakeAway>
                  <Image src='/icons/locationPlay.svg' height={24} width={24} alt='' />
                  <Typography type='body' color='light'>
                    წაყვანა
                  </Typography>
                </TakeAway>
              </TakeAwayWrapper>
              <div className='w-7/12'>
                <Typography type='subtitle'>თბილისი, იაკობ ცურტაველის 72</Typography>
                <Typography type='body' color='light'>
                  ივნ 17, 2022. 11:00
                </Typography>
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
              <Typography type='subtitle'>ქირაობის ღირებულება x 6 დღე</Typography>
              <Typography type='subtitle'>203$</Typography>
            </PriceDetailsWrapper>
            <PriceDetailsWrapper>
              <Typography type='subtitle'>ქირაობის ღირებულება x 6 დღე</Typography>
              <Typography type='subtitle'>203$</Typography>
            </PriceDetailsWrapper>
            <PriceDetailsWrapper>
              <Typography type='subtitle'>ქირაობის ღირებულება x 6 დღე</Typography>
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
        <div className='w-5/12 flex flex-col items-center'>
          <Image src='/images/car.png' alt='' height={150} width={200} className='m-auto rounded-lg' />
          <Typography type='h5' className='font-bold my-6'>
            Toyota Prius UTO 2017
          </Typography>
          <Typography type='subtitle' className='text-bold text-green-100 mb-6'>
            აქტიური
          </Typography>
          <DefaultButton bg='bg-raisin-10' text='ჯავშნის გაუქმება' onClick={toggleCancelOrderDialog} />
        </div>
      </PriceDetailsContainer>
      <CancelOrderDialog open={cancelOrderDialog} close={toggleCancelOrderDialog} />
    </div>
  )
}

export default OrderComponent
