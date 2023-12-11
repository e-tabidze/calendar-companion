import { useEffect, useRef, useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import dynamic from 'next/dynamic'

const Carousel = dynamic(() => import('src/views/components/carousel'), { ssr: false })
const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })

const ProductFeature = dynamic(() => import('src/views/pages/details/productFeature'), { ssr: false })
const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false })

import 'react-datepicker/dist/react-datepicker.css'

const PriceCalcCard = dynamic(() => import('src/views/pages/details/priceCalcCard'), { ssr: false })

// const InsuranceCard = dynamic(() => import('src/views/pages/details/insuranceCard'), { ssr: false })
const MapPicker = dynamic(() => import('src/views/components/mapPicker'), { ssr: true })

// const LessorInformationCard = dynamic(() => import('src/views/pages/details/lessorInformationCard'), { ssr: true })
const DetailsPageHeader = dynamic(() => import('src/views/pages/details/detailsPageHeader'), { ssr: true })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })

const EntityInformationCard = dynamic(() => import('src/views/pages/details/entitiInformationCard'), { ssr: true })
const Drawer = dynamic(() => import('src/views/pages/details/drawer'), { ssr: false })
const ResponsivePriceCalcCard = dynamic(() => import('src/views/pages/details/responsivePriceCalcCard'), { ssr: false })
const ProductImagesDialog = dynamic(() => import('src/views/pages/details/productImagesDialog'), { ssr: false })

import { ContentContainer, MaxWidthContainer } from 'src/styled/styles'

const SubNavItem = dynamic(() => import('src/views/pages/details/subNavItem'), { ssr: true })

import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import useBooking from 'src/views/pages/booking/useBooking'
import { Controller } from 'react-hook-form'
import { formatDate } from 'src/utils/formatDate'
import useSingleProductDetails from '../../views/pages/details/useSingleProductDetails'
import useMain from 'src/views/pages/main/useMain'
import Icon from "src/views/app/Icon";

const SimilarProducts = dynamic(() => import('src/views/pages/details/similarProducts'), { ssr: true })

// const Reviews = dynamic(() => import('src/views/pages/details/reviews'), { ssr: true })
const Features = dynamic(() => import('src/views/pages/details/features'), { ssr: true })

const productImages = [
  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden"  key={1}>
    <Image
        src='/images/car.png'
        className='object-cover '
        alt='productdetails'
    />
  </div>,
  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden"  key={2}>
    <Image
        src='/images/car.png'
        className='object-cover '
        alt='productdetails'
    />
  </div>,
  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden"  key={3}>
    <Image
        src='/images/car.png'
        className='object-cover '
        alt='productdetails'
    />
  </div>,
  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden"  key={4}>
    <Image
        src='/images/car.png'
        className='object-cover '
        alt='productdetails'
    />
  </div>,
  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden"  key={5}>
    <Image
        src='/images/car.png'
        className='object-cover '
        alt='productdetails'
    />
  </div>,
  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden"  key={6}>
    <Image
        src='/images/car.png'
        className='object-cover '
        alt='productdetails'
    />
  </div>,
  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden"  key={7}>
    <Image
        src='/images/car.png'
        className='object-cover '
        alt='productdetails'
    />
  </div>,
  <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden"  key={8}>
    <Image
        src='/images/car.png'
        className='object-cover '
        alt='productdetails'
    />
  </div>
]

const ProductDetails = () => {
  const router = useRouter()
  const { id, book_from, book_to } = router.query

  const { control, handleSubmit, bookingValues, resetField, setValue } = useBooking(id)

  const { width } = useWindowDimensions()

  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [section, setSection] = useState('details')
  const [isSticky, setIsSticky] = useState(false)

  const [dateRange, setDateRange] = useState<
    [Date, Date] | [null, null] | [Date, null] | [null, Date] | [undefined, undefined]
  >(
    Array.isArray(book_from) && Array.isArray(book_to)
      ? [new Date(book_from[0]), new Date(book_to[0])]
      : [
          book_from ? new Date(book_from as string | number) : null,
          book_to ? new Date(book_to as string | number) : null
        ]
  )

  const [startDate, endDate] = dateRange
  const [productImageDialogOpen, setProductImageDialogOpen] = useState<boolean>(false)

  const { singleProductDetails } = useSingleProductDetails(id)

  const { similarProducts } = useMain(singleProductDetails?.man_id, singleProductDetails?.model_id)

  console.log(similarProducts, 'similarProducts')

  console.log(singleProductDetails, 'singleProductDetails')

  const ref = useRef<any>()

  useEffect(() => {
    if (book_from && book_to) {
      const fromDate = Array.isArray(book_from)
        ? new Date(book_from[0] as string | number)
        : new Date(book_from as string | number)
      const toDate = Array.isArray(book_to)
        ? new Date(book_to[0] as string | number)
        : new Date(book_to as string | number)

      setDateRange([fromDate, toDate])
      setValue('booking.book_from', book_from)
      setValue('booking.book_to', book_to)
    }
  }, [book_from, book_to])

  useEffect(() => {
    const componentPosition = ref.current?.getBoundingClientRect().top - 80

    function handleScroll() {
      const pageScroll = window.pageYOffset
      if (pageScroll > componentPosition) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = (id: string) => {
    const sectionToScroll = document.getElementById(id)
    sectionToScroll &&
      window.scrollTo({
        top: sectionToScroll.offsetTop - 180,
        behavior: 'smooth'
      })
    setSection(id)
  }

  const toggleDrawer = () => setIsOpenDrawer(!isOpenDrawer)

  const toggleProductImageDialog = () => {
    setProductImageDialogOpen(!productImageDialogOpen)
  }

  console.log(singleProductDetails, 'singleProductDetails')

  console.log(bookingValues, 'bookingValues')

  const onSubmit = () => {
    router.push({
      pathname: '/booking',
      query: {
        id: id,
        book_from: bookingValues?.booking?.book_from,
        book_to: bookingValues?.booking?.book_to,
        price_day: singleProductDetails?.price_gel,
        days: startDate && endDate && Math.round((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1,
        company_id: singleProductDetails?.company_id
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DefaultLayout>
        <ContentContainer>
          <DetailsPageHeader />
        </ContentContainer>
        <MaxWidthContainer>
          <Carousel
            itemsArray={productImages}
            type='productDetails'
            key={Math.random()}
            loop
            onClick={toggleProductImageDialog}
            pagination={true}
            detailSwiper
          />
        </MaxWidthContainer>
        <MaxWidthContainer className={`${isSticky ? 'sticky top-20' : ''} bg-white z-[30]`} ref={ref} id='head'>
          <ContentContainer className='overflow-x-auto no-scrollbar bg-white z-30'>
            <div className='flex gap-8 my-6 w-max'>
              <SubNavItem section='details' activeSection={section} handleClick={handleClick}>
                დეტალური ინფორმაცია
              </SubNavItem>
              <SubNavItem section='features' activeSection={section} handleClick={handleClick}>
                მახასიათებლები
              </SubNavItem>
              <SubNavItem section='pricing' activeSection={section} handleClick={handleClick}>
                ღირებულება
              </SubNavItem>

              {/* <SubNavItem section='insurance' activeSection={section} handleClick={handleClick}>
                დაზღვევა
              </SubNavItem> */}
              {/*<SubNavItem section='reviews' activeSection={section} handleClick={handleClick}>*/}
              {/*  შეფასება*/}
              {/*</SubNavItem>*/}
              <SubNavItem section='informationcard' activeSection={section} handleClick={handleClick}>
                განმცხადებელი
              </SubNavItem>
            </div>
          </ContentContainer>
          <Divider />
        </MaxWidthContainer>
        <MaxWidthContainer className={`${isSticky ? 'md:mt-20' : ''} z-40`}></MaxWidthContainer>
        <ContentContainer>
          <div className='flex gap-11 mt-8'>
            <div className='w-full md:w-7/12 lg:w-8/12'>
              <div id='details'>
                <Typography type='h3' className='text-3md md:text-2lg font-bold'>
                  {singleProductDetails?.manufacturer?.title} {singleProductDetails?.manufacturer_model?.title}
                  {singleProductDetails?.prod_year}
                </Typography>
                <div className='flex items-center gap-4 mb-12'>
                  <Typography type='body' color='light'>
                    ან მსგავსი
                  </Typography>
                  <Typography type='subtitle'>| </Typography>
                  <Icon svgPath='locationOutline' width={24} height={24} className='fill-transparent' />
                  <Typography type='subtitle'>{singleProductDetails?.start_address}</Typography>
                </div>
                <Typography type='subtitle'>{singleProductDetails?.additional_information}</Typography>
                <Typography type='subtitle' className='mt-8'>
                  {singleProductDetails?.use_instruction}
                </Typography>
                <EntityInformationCard name={singleProductDetails?.company_user?.company?.information?.name} entityProductsCount={singleProductDetails?.company_user?.company?.count_company_poduct} />
              </div>

              <Features id='features' singleProductDetails={singleProductDetails} />

              <Divider />
              <div className='my-8' id='pricing'>
                <Typography type='h3' className="text-3md md:text-2lg">ღირებულება</Typography>

                <div className='mt-8 mb-11 grid grid-cols-1 gap-4'>
                  {singleProductDetails?.product_services?.map((feature: any) => (
                    <ProductFeature
                      feature={feature?.title}
                      icon='briefcase'
                      key={feature.id}
                      description={feature.description}
                      price={
                        feature.company_service_type_id === 3
                          ? 'უფასო'
                          : feature.company_service_type_id === 1
                          ? `${feature.price}₾/დღე`
                          : `${feature.price}₾/ერთჯერადად`
                      }
                    />
                  ))}
                </div>
              </div>
              <Divider />
              <div className='my-8'>
                <Typography type='h3' className="text-3md md:text-2lg">პერიოდი</Typography>
                <div className='flex justify-between mb-16 mt-2'>
                  <div className='flex gap-4'>
                    <Typography type='subtitle' className='text-green-100'>
                      {/* {startDate && endDate
                        ? `${startDate?.toISOString().split('T')[0]} - ${endDate?.toISOString().split('T')[0]}`
                        : 'აირჩიეთ თარიღი და დრო'} */}

                      {startDate && endDate
                        ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                        : 'აირჩიეთ თარიღი და დრო'}
                    </Typography>
                    {startDate && endDate && (
                      <Typography type='subtitle'>
                        | {'    '}
                        {startDate &&
                          endDate &&
                          Math.round((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1}
                        დღე
                      </Typography>
                    )}
                  </div>
                  <div className='hidden lg:flex gap-4 cursor-pointer '>
                    <Icon svgPath='rotate' width={20} height={22} className='fill-transparent'/>
                    <Typography
                      type='body'
                      color='light'
                      className='border-b-[1px] w-fit pb-px'
                      onClick={() => {
                        resetField('booking')
                        setDateRange([null, null])
                      }}
                    >
                      გასუფთავება
                    </Typography>
                  </div>
                </div>
                <Controller
                  name='booking'
                  control={control}
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      className='text-center border-l-4 border-red-500  w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-transparent'
                      inline
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      monthsShown={width > 1399 ? 2 : 1}
                      onChange={(update: any) => {
                        if (update) {
                          const [start, end] = update
                          onChange({ book_from: formatDate(start), book_to: formatDate(end) })
                          setDateRange(update)
                        } else {
                          onChange(null)
                          setDateRange([null, null])
                        }
                      }}
                      dateFormat='yyyy-MM-dd'
                      onChangeRaw={e => e.preventDefault()}
                      minDate={new Date()}
                    />
                  )}
                />
              </div>
              <Divider />

              {/* <div className='mt-11 mb-16 md:mb-28 overflow-auto' id='insurance'>
                <Typography type='h3' className="text-3md md:text-2lg">დაზღვევა</Typography>
                <div className='flex gap-6 mt-10 w-[160%] md:w-full'>
                  <div className='w-8/12 md:w-full'>
                    <InsuranceCard selected />
                  </div>
                  <div className='w-8/12 lg:w-full'>
                    <InsuranceCard />
                  </div>
                </div>
              </div>

              <Divider /> */}

              <div className='mt-8'>
                <Typography type='h3' className="text-3md md:text-2lg">ადგილმდებარეობა</Typography>
                <div className='flex gap-4 items-center mt-10 mb-6'>
                  <Icon svgPath='locationOutline' width={24} height={24} className='fill-transparent'/>
                  <Typography type='h5' weight='normal'>
                    {singleProductDetails?.start_address}
                  </Typography>
                </div>
                <MapPicker height='300px' borderRadius='30px' />
              </div>
              {/*<Divider />*/}
              {/*<Reviews id='reviews' />*/}
            </div>
            <div className='hidden md:inline-block w-5/12 lg:w-4/12' ref={ref}>
              <PriceCalcCard
                className={`${isSticky ? 'sticky top-44' : ''} z-[11]`}
                price={singleProductDetails?.price_gel}
                dates={startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : ''}
                days={
                  startDate &&
                  endDate &&
                  Math.round((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1
                }
                onClick={onSubmit}
              />
            </div>
          </div>
          <div id='priceCard'></div>
          <Typography type='h3' className='text-3md md:text-2lg block my-6 lg:hidden'>
            ფასი მოიცავს
          </Typography>
          {/*<LessorInformationCard*/}
          {/*  id='informationcard'*/}
          {/*  lessor={singleProductDetails?.company_user?.company?.information?.name}*/}
          {/*  description={singleProductDetails?.company_user?.company?.information?.description}*/}
          {/*  count={singleProductDetails?.company_user?.company?.count_company_poduct}*/}
          {/*/>*/}
          <Divider className='my-10 md:my-20' />
          <SimilarProducts data={similarProducts}/>
        </ContentContainer>
        {isOpenDrawer && width < 779 ? (
          <Drawer
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            className={`${isSticky ? 'sticky top-44' : ''} z-[11]`}
            price={singleProductDetails?.price_gel}
            dates={startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : ''}
            days={
              startDate && endDate && Math.round((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1
            }
            onClick={onSubmit}
          />
        ) : (
          <ResponsivePriceCalcCard toggleDrawer={toggleDrawer} />
        )}
        <ProductImagesDialog open={productImageDialogOpen} setOpen={toggleProductImageDialog} images={productImages} />
      </DefaultLayout>
    </form>
  )
}

export default ProductDetails
