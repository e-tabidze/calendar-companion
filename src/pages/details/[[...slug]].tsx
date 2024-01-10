import { memo, useEffect, useRef, useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import dynamic from 'next/dynamic'
import EventListener from 'react-event-listener'
import { registerLocale } from 'react-datepicker'
import ka from 'date-fns/locale/ka'

const Carousel = dynamic(() => import('src/views/components/carousel'), { ssr: false })
const Image = dynamic(() => import('src/views/components/image'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: true })
const ProductFeature = dynamic(() => import('src/views/pages/details/productFeature'), { ssr: false })
const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false })

import 'react-datepicker/dist/react-datepicker.css'

const PriceCalcCard = dynamic(() => import('src/views/pages/details/priceCalcCard'), { ssr: false })

// const InsuranceCard = dynamic(() => import('src/views/pages/details/insuranceCard'), { ssr: false })
// const MapPicker = dynamic(() => import('src/views/components/mapPicker'), { ssr: true })

const LessorInformationCard = dynamic(() => import('src/views/pages/details/lessorInformationCard'), { ssr: false })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })

const EntityInformationCard = dynamic(() => import('src/views/pages/details/entitiInformationCard'), { ssr: false })
const Drawer = dynamic(() => import('src/views/pages/details/drawer'), { ssr: false })
const ResponsivePriceCalcCard = dynamic(() => import('src/views/pages/details/responsivePriceCalcCard'), { ssr: false })
const ProductImagesDialog = dynamic(() => import('src/views/pages/details/productImagesDialog'), { ssr: false })

import { ContentContainer, MaxWidthContainer } from 'src/styled/styles'

const SubNavItem = dynamic(() => import('src/views/pages/details/subNavItem'), { ssr: false })

import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import useBooking from 'src/views/pages/booking/useBooking'
import { Controller } from 'react-hook-form'
import { formatDate } from 'src/utils/formatDate'
import useSingleProductDetails from '../../views/pages/details/useSingleProductDetails'
import useMain from 'src/views/pages/main/useMain'
import Icon from 'src/views/app/Icon'
import { days } from 'src/utils/sample-data'
import ProductCard from 'src/views/components/productCard'

// const Reviews = dynamic(() => import('src/views/pages/details/reviews'), { ssr: true })
const Features = dynamic(() => import('src/views/pages/details/features'), { ssr: true })

import { format } from 'date-fns'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

registerLocale('ka', ka)

const ProductDetails = memo(() => {
  const router = useRouter()
  const { slug, book_from, book_to } = router.query

  const { control, handleSubmit, bookingValues, resetField, setValue } = useBooking(slug)

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

  const { singleProductDetails, orderDatesData } = useSingleProductDetails(slug)

  const { similarProducts } = useMain(singleProductDetails?.man_id, singleProductDetails?.model_id)

  console.log(similarProducts, 'similarProducts')

  console.log(singleProductDetails, 'singleProductDetails')

  console.log(orderDatesData, 'orderDatesData')

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

  const handleScroll = () => {

    // const componentPosition = ref.current?.getBoundingClientRect().top - 80

    const pageScroll = window.pageYOffset

    if (pageScroll > window?.innerHeight / 4) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }

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
        id: slug,
        book_from: bookingValues?.booking?.book_from,
        book_to: bookingValues?.booking?.book_to,
        price_day: singleProductDetails?.price_gel,
        company_id: singleProductDetails?.company_id
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DefaultLayout>

        {/* <ContentContainer>
          <DetailsPageHeader />
        </ContentContainer> */}
        <MaxWidthContainer>
          <Carousel
            itemsArray={singleProductDetails?.large_images?.split(',')?.map((imageUrl: string) => (
              <div className='relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden' key={8}>
                <Image src={imageUrl} className='object-cover ' alt='productdetails' />
              </div>
            ))}
            type='productDetails'
            key={Math.random()}
            loop
            onClick={toggleProductImageDialog}
            pagination={true}
          />
        </MaxWidthContainer>
        <MaxWidthContainer
          className={`${isSticky ? 'sticky top-[72px] md:top-20' : ''} bg-white z-[30]`}
          ref={ref}
          id='head'
        >
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
        <MaxWidthContainer className={`${isSticky ? 'mt-[72px] md:mt-20' : ''} z-40`}></MaxWidthContainer>
        <EventListener target='window' onScroll={handleScroll} />
        <ContentContainer>
          <div className='flex gap-11 mt-8'>
            <div className='w-full md:w-7/12 lg:w-8/12'>
              <div id='details'>
                <Typography type='h3' className='md:text-2lg font-bold pb-2'>
                  {singleProductDetails?.manufacturer?.title} {singleProductDetails?.manufacturer_model?.title}{' '}
                  {singleProductDetails?.prod_year}
                </Typography>
                <div className='flex items-center gap-4 mb-12'>
                  <Typography type='body' color='light'>
                    ან მსგავსი
                  </Typography>
                  <Typography type='subtitle'>| </Typography>
                  <div className='flex shrink-0'>
                    <Icon svgPath='locationOutline' width={24} height={24} className='fill-transparent' />
                  </div>
                  <Typography type='subtitle'>
                    {singleProductDetails?.start_city}, {singleProductDetails?.start_address}
                  </Typography>
                </div>
                <Typography type='subtitle'>{singleProductDetails?.additional_information}</Typography>
                <Typography type='subtitle' className='mt-8'>
                  {singleProductDetails?.use_instruction}
                </Typography>
                <EntityInformationCard
                  name={singleProductDetails?.company_user?.company?.information?.name}
                  entityProductsCount={singleProductDetails?.company_user?.company?.count_company_poduct}
                />
              </div>
              <Divider />
              <Features id='features' singleProductDetails={singleProductDetails} />

              {singleProductDetails?.product_services.length > 0 && (
                <>
                  <Divider />
                  <div className='my-8' id='pricing'>
                    <Typography type='h3' className='text-3md md:text-2lg'>
                      ღირებულება
                    </Typography>

                    <div className='mt-8 mb-11 grid grid-cols-1 gap-4'>
                      {singleProductDetails?.product_services?.map((feature: any) => (
                        <ProductFeature
                          feature={feature?.title}
                          icon='feature'
                          key={feature.id}
                          description={feature.description}
                          price={
                            feature.company_service_type_id === 3
                              ? 'უფასო'
                              : feature.company_service_type_id === 1
                              ? `${feature.price}₾ / დღე`
                              : `${feature.price}₾ / ერთჯერადად`
                          }
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
              <Divider />
              <div className='my-8' id='calendar'>
                <Typography type='h3' className='text-3md md:text-2lg'>
                  პერიოდი
                </Typography>
                <div className='flex justify-between mb-16 mt-2'>
                  <div className='flex gap-2'>
                    <Typography type='subtitle' className='text-green-100'>
                      {startDate && endDate
                        ? `${format(startDate, 'd MMM yyyy', { locale: ka })} - ${format(endDate, 'd MMM yyyy', {
                            locale: ka
                          })}`
                        : 'თარიღი'}
                    </Typography>
                    {startDate && endDate && (
                      <Typography type='subtitle'>
                        | {'    '}
                        {startDate &&
                          endDate &&
                          Math.round((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))}
                        {'    '} დღე
                      </Typography>
                    )}
                  </div>
                  <div className='hidden lg:flex gap-4 cursor-pointer '>
                    <Icon svgPath='rotate' width={20} height={22} className='fill-transparent' />
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
                      locale='ka'
                      className='text-center border-l-4 border-red-500  w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-transparent'
                      inline
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      monthsShown={width > 1279 ? 2 : 1}
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
                      excludeDates={orderDatesData?.flatMap(({ start_date, end_date }: any) => {
                        const start = new Date(start_date)
                        const end = new Date(end_date)
                        const excludedDates = []

                        for (
                          let currentDate = start;
                          currentDate <= end;
                          currentDate.setDate(currentDate.getDate() + 1)
                        ) {
                          excludedDates.push(new Date(currentDate))
                        }

                        return excludedDates
                      })}
                    />
                  )}
                />
              </div>

              {/*<Divider />*/}

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

              {/*<div className='mt-8'>*/}
              {/*  <Typography type='h3' className='text-3md md:text-2lg'>*/}
              {/*    მდებარეობა*/}
              {/*  </Typography>*/}
              {/*  <div className='flex gap-4 items-center mt-10 mb-6'>*/}
              {/*    <Icon svgPath='locationOutline' width={24} height={24} className='fill-transparent' />*/}
              {/*    <Typography type='h5' weight='normal'>*/}
              {/*      {singleProductDetails?.start_address}*/}
              {/*    </Typography>*/}
              {/*  </div>*/}
              {/*  <MapPicker*/}
              {/*    height='300px'*/}
              {/*    borderRadius='30px'*/}
              {/*    markerCoordinates={[singleProductDetails?.start_lat, singleProductDetails?.start_lon]}*/}
              {/*  />*/}
              {/*</div>*/}

              {/*<Divider />*/}
              {/*<Reviews id='reviews' />*/}
            </div>
            <div className='hidden md:inline-block w-5/12 lg:w-4/12' ref={ref}>
              <PriceCalcCard
                className={`${isSticky ? 'sticky top-44' : ''} z-[11]`}
                price={singleProductDetails?.price_gel}
                dates={
                  startDate && endDate
                    ? `${format(startDate, 'd MMM yyyy', { locale: ka })} - ${format(endDate, 'd MMM yyyy', {
                        locale: ka
                      })}`
                    : ''
                }
                days={
                  startDate && endDate && Math.round((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))
                }
                handleDateChange={() => handleClick('calendar')}
                onClick={onSubmit}
                disabled={days === null}
                companyId={singleProductDetails?.company_id}
                changeDates
                control={control}
              />
            </div>
          </div>
          <div id='priceCard'></div>
          <Typography type='h3' className='text-3md md:text-2lg block my-6 lg:hidden'>
            ფასი მოიცავს
          </Typography>
          <LessorInformationCard
            id='informationcard'
            lessor={singleProductDetails?.company_user?.company?.information?.name}
            description={singleProductDetails?.company_user?.company?.information?.description}
            count={singleProductDetails?.company_user?.company?.count_company_poduct}
          />
          <Divider className='my-10 md:my-20' />

          {similarProducts?.length > 1 && (
            <div>
              <Typography type='h3' className='text-3md md:text-2lg mb-8'>
                მსგავსი შეთავაზებები
              </Typography>
              <Carousel
                itemsArray={similarProducts?.map((product: any) => (
                  <ProductCard
                    key={product?.id}
                    productId={product?.id}
                    manufacturer={product?.manufacturer?.title}
                    model={product?.manufacturer_model?.title}
                    prodYear={product?.prod_year}
                    priceGel={product?.price_gel}
                    luggageNumbers={product?.luggage_numbers}
                    seats={product?.seat_type?.title}
                    images={product?.images?.split(',')}
                    city={product?.start_city}
                  />
                ))}
                type='products'
              />
            </div>
          )}
        </ContentContainer>
        {isOpenDrawer && width < 779 ? (
          <Drawer
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            className={`${isSticky ? 'sticky top-44' : ''} z-[11]`}
            price={singleProductDetails?.price_gel}
            dates={
              startDate && endDate
                ? `${format(startDate, 'd MMM yyyy', { locale: ka })} - ${format(endDate, 'd MMM yyyy', {
                    locale: ka
                  })}`
                : ''
            }
            days={startDate && endDate && Math.round((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))}
            onClick={onSubmit}
          />
        ) : (
          <ResponsivePriceCalcCard toggleDrawer={toggleDrawer} price={singleProductDetails?.price_gel} />
        )}
        <ProductImagesDialog
          open={productImageDialogOpen}
          setOpen={toggleProductImageDialog}
          images={singleProductDetails?.large_images?.split(',').map((imageUrl: string) => (
            <div className='relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden' key={8}>
              <Image src={imageUrl} className='object-cover ' alt='productdetails' />
            </div>
          ))}
        />
      </DefaultLayout>
    </form>
  )
})

export default ProductDetails

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'productDetails']))
    }
  }
}
