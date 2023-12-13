import Image from 'next/image'
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
} from '../../views/pages/success/styles'


const SuccessfulPayment = () => {

    return (
        <div className='bg-white'>
            <RentalDetailsContainer>
                <PriceDetailsContainer>
                    <div className="lg:w-4/12 xl:w-5/12 flex flex-col items-center shrink-0">
                        <div className="flex items-center mb-4 md:mb-0">
                            <Icon svgPath='success' height={40} width={40} className='fill-transparent mr-4' />
                            <Typography type='h3' className='text-white text-md md:text-2lg'>
                                წარმატებული ტრანზაქცია
                            </Typography>
                        </div>

                    </div>
                    <div className="w-full lg:w-8/12 xl:w-7/12 md:pl-10 lg:pl-0 flex flex-col md:flex-row  gap-4 md:gap-24">
                        <RentalDetailsWrapper>
                            <Typography type='body' color='light' className='text-white/50'>
                                შეკვეთის თარიღი
                            </Typography>
                            <Typography type='subtitle' className='text-white'>30 ივნ, 2022</Typography>
                        </RentalDetailsWrapper>
                        <RentalDetailsWrapper>
                            <Typography type='body' color='light' className='text-white/50'>
                                შეკვეთის ნომერი
                            </Typography>
                            <Typography type='subtitle' className='text-white'>#2425252525</Typography>
                        </RentalDetailsWrapper>
                        <RentalDetailsWrapper>
                            <Typography type='body' color='light' className='text-white/50'>
                                განმცხადებელი
                            </Typography>
                            <Typography type='subtitle' className='text-white'>შპს ბენე+</Typography>
                        </RentalDetailsWrapper>
                    </div>
                </PriceDetailsContainer>
            </RentalDetailsContainer>
            <Divider />
            <PriceDetailsContainer className='md:py-10 lg:py-16 p-4 md:px-10 lg:px-0'>
                <div className='lg:w-4/12 xl:w-5/12 flex flex-col items-center shrink-0'>
                    <div className="flex flex-col">
                        <Image
                            src='/images/car.png'
                            alt=''
                            height={150}
                            width={200}
                            className='m-auto rounded-lg'
                        />
                        <Typography type='h5' className='font-bold my-4'>
                            Fiat 500X 2017
                        </Typography>
                        <Typography
                            type='subtitle'
                            className='text-bold text-green-100'>
                            აქტიური
                        </Typography>
                    </div>


                </div>
                <div className='w-full lg:w-6/12 xl:w-5/12 md:pl-10 lg:pl-0'>
                    <div className=''>
                        <TakeAwayInfoContsiner>
                            <TakeAwayWrapper>
                                <TakeAway>
                                    <Icon svgPath='booking-start' height={24} width={24} className='fill-transparent' />
                                    <Typography type='body' color='light'>
                                        წაყვანა
                                    </Typography>
                                </TakeAway>
                            </TakeAwayWrapper>
                            <div className='lg:w-7/12'>
                                <Typography type='subtitle'>თბილისი, იაკობ ცურტაველის 72</Typography>
                                <Typography type='body' color='light'>
                                    ივნ 17, 2022.  11:00
                                </Typography>
                            </div>
                        </TakeAwayInfoContsiner>
                        <TakeAwayInfoContsiner>
                            <TakeAwayWrapper>
                                <TakeAway>
                                    <Icon svgPath='booking-stop' height={24} width={24} className='fill-transparent' />
                                    <Typography type='body' color='light'>
                                        დაბრუნება
                                    </Typography>
                                </TakeAway>
                            </TakeAwayWrapper>
                            <div className='lg:w-7/12'>
                                <Typography type='subtitle'>თბილისი,  იაკობ ცურტაველის 72</Typography>
                                <Typography type='body' color='light'>
                                    ივნ 17, 2022.  11:00
                                </Typography>
                            </div>
                        </TakeAwayInfoContsiner>
                    </div>
                    <Divider />
                    <div>
                        <PriceDetailsWrapper>
                            <Typography type='subtitle'>ქირაობის ღირებულება x 6 დღე</Typography>
                            <Typography type='subtitle'>520 ₾</Typography>
                        </PriceDetailsWrapper>

                        <PriceDetailsWrapper>
                            <Typography type='subtitle'>
                                დაზღვევა - საბაზისო
                            </Typography>
                            <Typography type='subtitle'> 120 ₾ </Typography>
                        </PriceDetailsWrapper>

                        <PriceDetailsWrapper>
                            <Typography type='subtitle'>
                                გადასახადები და საკომისიოები
                            </Typography>
                            <Typography type='subtitle'> 20 ₾ </Typography>
                        </PriceDetailsWrapper>

                        <PriceDetailsWrapper>
                            <Typography type='subtitle'>
                                ბავშვის სავარძელი
                            </Typography>
                            <Typography type='subtitle'> 20 ₾ </Typography>
                        </PriceDetailsWrapper>

                        <Divider />
                        <PriceDetailsWrapper>
                            <Typography type='subtitle' className='font-bold'>
                                ჯამი
                            </Typography>
                            <Typography type='subtitle' className='font-bold'>
                                750 ₾
                            </Typography>
                        </PriceDetailsWrapper>
                    </div>
                </div>
            </PriceDetailsContainer>
        </div>
    )
}

export default SuccessfulPayment
