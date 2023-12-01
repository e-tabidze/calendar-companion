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
import BookingRadio from '../../views/components/bookingRadio'

import DateDropdown from 'src/views/components/dateDropdown'
import { useWatch } from 'react-hook-form'
import useCompanyInfo from 'src/hooks/useCompanyInfo'
import SelectField from 'src/views/components/selectField'

const Booking = () => {
  const [additionalServices, toggleAdditionalServices] = useState(false)
  const [insurance, toggleInsurance] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const { width } = useWindowDimensions()

  const { control, bookingValues, errors, handleSubmit } = useBooking()

  console.log(bookingValues, 'bookingValues')

  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)

  const router = useRouter()

  const { book_from, book_to, price_day, days, company_id } = router.query

  console.log(company_id, 'company_id')

  const { singleCompanyBranches } = useCompanyInfo(company_id[0])

  console.log(singleCompanyBranches, 'companyBranches')

  const onClickLogo = () => {
    router.push('/')
  }

  const TakeAway = () => (
    <div className='pl-[52px] mt-[16px]'>
      <div className='flex items-center'>
        <div className='w-2/12 flex items-start'>
          <Image src='/icons/start.svg' alt='' height={24} width={24} />

          <div className='flex flex-col ml-[12px]'>
            <span className='text-[12px]'>წაყვანა</span>
            <span className='text-[12px] text-black/60'>15 ივნ</span>
          </div>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[14px] ml-[40px]'>
            თბილისი, იაკობ წურტაველის 72
          </Typography>
        </div>
        <div className='w-4/12 flex justify-between'>
          <SelectField
            control={control}
            valueKey='id'
            labelKey='time'
            name='time'
            options={times}
            placeholder='დრო'
            className='bg-transparent border-green-100'
          />
          <button
            // onClick={toggleEditModal}
            className='ml-[16px] border border-black flex items-center justify-center h-[48px] rounded-[12px] text-[12px] px-[24px]'
          >
            შეცვლა
          </button>
        </div>
      </div>
      <div className='flex items-center mt-[12px]'>
        <div className='w-2/12 flex items-start'>
          <Image src='/icons/stop.svg' alt='' height={24} width={24} />

          <div className='flex flex-col ml-[12px]'>
            <span className='text-[12px]'>დაბრუნება</span>
            <span className='text-[12px] text-black/60'>20 ივნ</span>
          </div>
        </div>
        <div className='w-6/12'>
          <Typography type='body' className='text-[14px] ml-[40px]'>
            თბილისი, იაკობ წურტაველის 72
          </Typography>
        </div>
        <div className='w-4/12 flex justify-between'>
          {/* <SelectField
            control={control}
            valueKey='id'
            labelKey='time'
            name='time'
            options={times}
            placeholder='დრო'
            className='bg-transparent border-green-100'
          /> */}
        </div>
      </div>
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

  const formsState = useWatch({ control })

  console.log(formsState, 'formState')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LargeContainer className='flex items-baseline pt-5 flex-col md:flex-row'>
        <Image src='/images/logo-rent.svg' alt='logo' onClick={onClickLogo} />
        <ContentContainer className='flex gap-12'>
          <div className='w-full md:w-8/12'>
            <div className='flex items-baseline my-8 gap-3'>
              <Typography type='h3' className='font-bold'>
                {book_from} - {book_to}
              </Typography>
              <Typography type='body'>| {days} days</Typography>
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

              <DateDropdown label={'აირჩიე დაბადების თარიღი'} name='birth_date' control={control} />
              <DateDropdown
                label={'მართვის მოწმობის მოქმედების ვადა'}
                name='driver_license_expiration'
                control={control}
              />
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
            <BookingRadio name='name' options={options} control={control} color='bg-green-100' />
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
              onClick={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          </div>
        </ContentContainer>
      </LargeContainer>
      {isOpenDrawer && width < 779 ? (
        <Drawer
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          price={Number(Array.isArray(price_day) ? price_day[0] : price_day)}
          dates={`${book_from} - ${book_to}`}
          days={
            Math.round(
              (new Date(Array.isArray(book_to) ? book_to[0] : book_to).getTime() -
                new Date(Array.isArray(book_from) ? book_from[0] : book_from).getTime()) /
                (24 * 60 * 60 * 1000)
            ) + 1
          }
          onClick={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      ) : (
        <ResponsivePriceCalcCard toggleDrawer={toggleDrawer} />
      )}
    </form>
  )
}

export default Booking
