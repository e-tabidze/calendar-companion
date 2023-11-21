import { useEffect, useRef, useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import dynamic from 'next/dynamic'

const Carousel = dynamic(() => import('src/views/components/carousel'), { ssr: true })
const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: true })

const ProductFeature = dynamic(() => import('src/views/pages/details/productFeature'), { ssr: true })
const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false })

import 'react-datepicker/dist/react-datepicker.css'

const PriceCalcCard = dynamic(() => import('src/views/pages/details/priceCalcCard'), { ssr: false })
const InsuranceCard = dynamic(() => import('src/views/pages/details/insuranceCard'), { ssr: false })
const MapPicker = dynamic(() => import('src/views/components/mapPicker'), { ssr: true })
const LessorInformationCard = dynamic(() => import('src/views/pages/details/lessorInformationCard'), { ssr: true })
const DetailsPageHeader = dynamic(() => import('src/views/pages/details/detailsPageHeader'), { ssr: true })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })

const EntityInformationCard = dynamic(() => import('src/views/pages/details/entitiInformationCard'), { ssr: true })
const Drawer = dynamic(() => import('src/views/pages/details/drawer'), { ssr: false })
const ResponsivePriceCalcCard = dynamic(() => import('src/views/pages/details/responsivePriceCalcCard'), { ssr: false })
const ProductImagesDialog = dynamic(() => import('src/views/pages/details/productImagesDialog'), { ssr: true })

import { ContentContainer, MaxWidthContainer } from 'src/styled/styles'

const SubNavItem = dynamic(() => import('src/views/pages/details/subNavItem'), { ssr: true })

import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import SearchService from 'src/services/SearchService'
import { useQuery } from '@tanstack/react-query'

const SimilarProducts = dynamic(() => import('src/views/pages/details/similarProducts'), { ssr: true })

const Reviews = dynamic(() => import('src/views/pages/details/reviews'), { ssr: true })
const Features = dynamic(() => import('src/views/pages/details/features'), { ssr: true })

const productImages = [
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={1}
  />,
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={2}
  />,
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={3}
  />,
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={4}
  />,
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={5}
  />,
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={6}
  />,
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={7}
  />,
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={8}
  />,
  <Image
    src='/images/car.png'
    className='w-full px-1 object-cover rounded-2xl h-52 lg:h-[500px]'
    alt='productdetails'
    key={9}
  />
]

const ProductDetails = () => {
  const router = useRouter()

  const { width } = useWindowDimensions()
  const { id } = router.query

  const productId = id && id?.length > 0 ? id[0] : ''

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [section, setSection] = useState('details')
  const [isSticky, setIsSticky] = useState(false)
  const [productImageDialogOpen, setProductImageDialogOpen] = useState<boolean>(false)

  const ref = useRef<any>()

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

  const fetchSingleProduct = async () => {
    const response: any = await SearchService.getSingleProduct(productId)

    return response.data?.result?.data
  }

  const { data: singleProductDetails } = useQuery(['singleProduct', productId], fetchSingleProduct, {
    enabled: !!productId
  })

  console.log(singleProductDetails, 'singleProductDetails')

  return (
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
        />
      </MaxWidthContainer>
      <MaxWidthContainer className={`${isSticky ? 'sticky top-20' : ''} bg-white z-[11]`} ref={ref} id='head'>
        <ContentContainer className='overflow-x-auto bg-white z-30'>
          <div className='flex gap-8 my-6 w-max'>
            <SubNavItem section='details' activeSection={section} handleClick={handleClick}>
              დეტალური ინფორმაცია
            </SubNavItem>
            <SubNavItem section='features' activeSection={section} handleClick={handleClick}>
              მახასიათებლები
            </SubNavItem>
            <SubNavItem section='insurance' activeSection={section} handleClick={handleClick}>
              დაზღვევა
            </SubNavItem>
            <SubNavItem section='reviews' activeSection={section} handleClick={handleClick}>
              შეფასება
            </SubNavItem>
            <SubNavItem section='informationcard' activeSection={section} handleClick={handleClick}>
              განმცხადებელი
            </SubNavItem>
          </div>
        </ContentContainer>
        <Divider />
      </MaxWidthContainer>
      <MaxWidthContainer className={`${isSticky ? 'mt-20' : ''} z-40`}></MaxWidthContainer>
      <ContentContainer>
        <div className='flex gap-11 mt-8'>
          <div className='w-full md:w-7/12 lg:w-8/12'>
            <div id='details'>
              <Typography type='h3' className='font-bold'>
                {singleProductDetails?.manufacturer?.title} {singleProductDetails?.manufacturer_model?.title}{' '}
                {singleProductDetails?.prod_year}
              </Typography>
              <div className='flex items-center gap-4 mb-12'>
                <Typography type='body' color='light'>
                  ან მსგავსი
                </Typography>
                <Typography type='subtitle'>| </Typography>
                <Image src='/icons/favIconOutlineDark.svg' alt='location' />
                <Typography type='subtitle'>{singleProductDetails?.start_address}</Typography>
              </div>
              <Typography type='subtitle'>{singleProductDetails?.additional_information}</Typography>
              <EntityInformationCard name={singleProductDetails?.company_user?.company?.information?.name} />
            </div>

            <Features id='features' singleProductDetails={singleProductDetails} />

            <Divider />
            <div className='my-8'>
              <Typography type='h3'>ფასი მოიცავს</Typography>

              <div className='mt-8 mb-11 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {singleProductDetails?.product_additional_information?.map(
                  (feature: { additional_information: { title: string }; icon: string; id: string | number }) => (
                    <ProductFeature
                      feature={feature?.additional_information?.title}
                      icon='/icons/printer.svg'
                      key={feature.id}
                    />
                  )
                )}
              </div>
            </div>
            <Divider />
            <div className='my-8'>
              <Typography type='h3'>პერიოდი</Typography>
              <div className='flex justify-between mb-16 mt-2'>
                <div className='flex gap-4'>
                  <Typography type='subtitle' className='text-green-100'>
                    14 ივლისი, 2022 - 23 ივლისი, 2022
                  </Typography>
                  <Typography type='subtitle'>| 6 days</Typography>
                </div>
                <div className='hidden lg:flex gap-4 cursor-pointer '>
                  <Image src='/icons/rotate.svg' alt='' />
                  <Typography type='body' color='light' className='border-b-[1px] w-fit pb-px'>
                    გასუფთავება
                  </Typography>
                </div>
              </div>
              <DatePicker
                inline
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                monthsShown={width > 1399 ? 2 : 1}
                onChange={(update: any) => {
                  setDateRange(update)
                }}
                minDate={new Date()}
              />
            </div>
            <Divider />

            <div className='mt-11 mb-16 md:mb-28 overflow-auto' id='insurance'>
              <Typography type='h3'>დაზღვევა</Typography>
              <div className='flex gap-6 mt-10 w-[160%] md:w-full'>
                <div className='w-8/12 md:w-full'>
                  <InsuranceCard selected />
                </div>
                <div className='w-8/12 lg:w-full'>
                  <InsuranceCard />
                </div>
              </div>
            </div>

            <Divider />

            <div className='mt-20 md:mt-40'>
              <Typography type='h3'>ადგილმდებარეობა</Typography>
              <div className='flex gap-4 items-center mt-10 mb-6'>
                <Image src='/icons/locationOutline.svg' alt='' />
                <Typography type='h5' weight='normal'>
                  {singleProductDetails?.start_address}
                </Typography>
              </div>
              <MapPicker height='300px' borderRadius='30px' />
            </div>
            <Divider />
            <Reviews id='reviews' />
          </div>
          <div className='hidden md:inline-block w-5/12 lg:w-4/12'>
            <PriceCalcCard />
          </div>
        </div>
        <Typography type='h3' className='block my-6 lg:hidden'>
          ფასი მოიცავს
        </Typography>
        <LessorInformationCard
          id='informationcard'
          lessor={singleProductDetails?.company_user?.company?.information?.name}
          description={singleProductDetails?.company_user?.company?.information?.description}
          count={singleProductDetails?.company_user?.company?.count_company_poduct}
        />
        <Divider className='my-20' />
        <SimilarProducts />
      </ContentContainer>
      {isOpenDrawer && width < 779 ? (
        <Drawer isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      ) : (
        <ResponsivePriceCalcCard toggleDrawer={toggleDrawer} />
      )}
      <ProductImagesDialog open={productImageDialogOpen} setOpen={toggleProductImageDialog} images={productImages} />
    </DefaultLayout>
  )
}

export default ProductDetails
