import { useState } from 'react'
import { OutlinedButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Image from 'src/views/components/image'
import { DefaultInput } from 'src/views/components/input'
import Radio from 'src/views/components/radio'
import Typography from 'src/views/components/typography'
import PriceCalcCard from 'src/views/pages/details/priceCalcCard'
import AdditionalServices from 'src/views/pages/booking/additionalServices'
import { LargeContainer, ContentContainer } from 'src/styled/styles'
import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Drawer from 'src/views/pages/details/drawer'
import ResponsivePriceCalcCard from 'src/views/pages/details/responsivePriceCalcCard'
import useBooking from 'src/views/pages/booking/useBooking'
import BookingRadio from "../../views/components/bookingRadio";

// import DateDropdown from 'src/views/components/dateDropdown'

const Booking = () => {
  const [additionalServices, toggleAdditionalServices] = useState(false)
  const [insurance, toggleInsurance] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const { width } = useWindowDimensions()

  const { control, bookingValues, errors, handleSubmit } = useBooking()

  console.log(bookingValues, 'bookingValues')

  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)

  const router = useRouter()

  const { book_from, book_to, price_day, days } = router.query

  const onClickLogo = () => {
    router.push('/')
  }

  const TakeAway = () => (
    <div>
      <h1>TAKEAWAY</h1>
    </div>
  )

  const Delivery = () => (
    <div>
      <h1>DELIVERY</h1>
    </div>
  )

  const options = [
    { label: 'წავიყვან ოფისიდან', value: 'წავიყვან ოფისიდან', info: '$0.00', children: <TakeAway /> },
    { label: 'მიწოდება', value: 'მიწოდება', info: '$0.00', children: <Delivery /> }
  ]

  const onSubmit = () => {
    console.log(bookingValues, 'V')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LargeContainer className='flex items-baseline pt-5 flex-col md:flex-row'>
        <Image src='/images/logo-rent.svg' alt='logo' onClick={onClickLogo} />
        <ContentContainer className='flex gap-12'>
          <div className='w-full md:w-8/12'>
            <div className='flex justify-between my-8'>
              <div className='flex items-baseline gap-3'>
                <Typography type='h3' className='font-bold'>
                  {book_from} - {book_to}
                </Typography>
                <Typography type='body'>| 6 {days}</Typography>
              </div>
              <OutlinedButton label='შეცვლა' />
            </div>
            <Divider />
            <Typography type='h3' className='mt-11'>
              პირადი ინფორმაცია *
            </Typography>
            <div className='grid gap-3 my-6 grid-cols-1 lg:grid-cols-2 lg:gap-4'>
              <DefaultInput control={control} name='first_name' errors={errors} label='სახელი' />
              <DefaultInput control={control} name='last_name' errors={errors} label='გვარი' />
              <DefaultInput control={control} name='identification_number' errors={errors} label='პირადი ნომერი' />
              <DefaultInput control={control} name='phone' errors={errors} label='მობილურის ნომერი' />
              <DefaultInput control={control} name='email' errors={errors} label='ელ.ფოსტა' />

              {/* <DateDropdown label={'აირჩიე დაბადების თარიღი'} name='birth_date' control={control} />
              <DateDropdown
                label={'მართვის მოწმობის მოქმედების ვადა'}
                name='driver_license_expiration'
                control={control}
              /> */}
            </div>
            <Typography type='body' color='light' className='mb-14'>
              გთხოვთ გადაამოწმოთ მითითებული პარამეტრები და შემდეგ დაასრულოთ დაჯავშნის პროცესი, ეს პარამეტრები
              მნიშვნელოვანია შემდგომში თქვენსა და გამქირავებელს შორის კომუნიკაციისთვის
            </Typography>
            <Divider />
            <Typography type='h3' className='my-11'>
              ადგილმდებარეობა *
            </Typography>
            {/*<Radio name='name' options={options} control={control} color='bg-green-100' />*/}
            <BookingRadio name='name' options={options} control={control} color='bg-green-100'/>
            <div>
              <div
                className='mt-11 flex items-center justify-between mb-8'
                onClick={() => toggleAdditionalServices(!additionalServices)}
              >
                <Typography type='h3'>დამატებითი სერვისები</Typography>
                <Image
                  src='/icons/chevron.svg'
                  className={`${additionalServices ? '' : 'rotate-180'} w-auto h-4 transition duration-300`}
                  alt=''
                />
              </div>
              {additionalServices && <AdditionalServices control={control} />}
            </div>
            {!additionalServices && <Divider />}
            <div>
              <div className='mt-11 flex items-center justify-between mb-8' onClick={() => toggleInsurance(!insurance)}>
                <Typography type='h3'>დაზღვევა</Typography>
                <Image
                  src='/icons/chevron.svg'
                  className={`${additionalServices ? '' : 'rotate-180'} w-auto h-4 transition duration-300`}
                  alt=''
                />
              </div>
              {insurance && <AdditionalServices control={control} />}
            </div>
          </div>

          <div className='hidden md:inline-block w-5/12 lg:w-4/12'>
            <PriceCalcCard
              price={Number(Array.isArray(price_day) ? price_day[0] : price_day)}
              dates={`${book_from} - ${book_to}`}
              days={
                Math.round(
                  (new Date(Array.isArray(book_to) ? book_to[0] : book_to).getTime() -
                    new Date(Array.isArray(book_from) ? book_from[0] : book_from).getTime()) /
                    (24 * 60 * 60 * 1000)
                ) + 1
              }
              className={''}
              onClick={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          </div>
        </ContentContainer>
      </LargeContainer>
      {isOpenDrawer && width < 779 ? (
        <Drawer isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      ) : (
        <ResponsivePriceCalcCard toggleDrawer={toggleDrawer} />
      )}
    </form>
  )
}

export default Booking
