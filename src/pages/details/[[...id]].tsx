import { useEffect, useRef, useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'

import Carousel from 'src/views/components/carousel';
import Image from 'src/views/components/image';
import Typography from 'src/views/components/typography';
import ProductFeature from 'src/views/pages/details/productFeature';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css'

import PriceCalcCard from 'src/views/pages/details/priceCalcCard';
import InsuranceCard from 'src/views/pages/details/insuranceCard';
import MapPicker from 'src/views/components/mapPicker';
import Review from 'src/views/components/review';
import ReviewCard from 'src/views/pages/details/reviewCard.tsx';
import LessorInformationCard from 'src/views/pages/details/lessorInformationCard';
import DetailsPageHeader from 'src/views/pages/details/detailsPageHeader';
import Divider from 'src/views/components/divider';
import EntityInformationCard from 'src/views/pages/details/entitiInformationCard';
import Drawer from 'src/views/pages/details/drawer';
import ResponsivePriceCalcCard from 'src/views/pages/details/responsivePriceCalcCard';
import ProductCard from 'src/views/components/productCard';
import ProductImagesDialog from 'src/views/pages/details/productImagesDialog';

import { ContentContainer, MaxWidthContainer } from 'src/styled/styles';

import SubNavItem from 'src/views/pages/details/subNavItem';

import { useRouter } from 'next/router';
import useDetails, { getSingleProductDetails } from './useDetails';
import useWindowDimensions from 'src/hooks/useWindowDimensions';
import { dehydrate, QueryClient } from '@tanstack/react-query';

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
  const { id } = router?.query
  const { singleProductDetails } = useDetails(id[0])

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

  console.log(singleProductDetails, 'singleProductDetails')

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
            <div className='my-8' id='features'>
              <Typography type='h3'>მახასიათებლები</Typography>
              <div className='mt-8 mb-11 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <ProductFeature feature={`${singleProductDetails?.door_type?.title} კარი`} icon='/icons/printer.svg' />
                <ProductFeature
                  feature={`წამყვანი თვლები - ${singleProductDetails?.drive_tires?.title}`}
                  icon='/icons/printer.svg'
                />
                <ProductFeature feature={singleProductDetails?.fuel_type?.title} icon='/icons/printer.svg' />
                <ProductFeature
                  feature={`${singleProductDetails?.luggage_numbers || 0} ჩემოდანი`}
                  icon='/icons/printer.svg'
                />
                <ProductFeature
                  feature={`გარბენი - ${singleProductDetails?.car_run} ${singleProductDetails?.measure}`}
                  icon='/icons/printer.svg'
                />
                <ProductFeature
                  feature={`${singleProductDetails?.seat_type?.title} მგზავრი`}
                  icon='/icons/printer.svg'
                />
                <ProductFeature feature={singleProductDetails?.transmission_type?.title} icon='/icons/printer.svg' />
              </div>
            </div>
            <Divider />
            <div className='my-8'>
              <Typography type='h3'>ფასი მოიცავს</Typography>
              <div className='mt-8 mb-11 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {singleProductDetails?.product_additional_information.map(
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
              <div className='mb-20'>
                <MapPicker height='300px' borderRadius='30px' />
              </div>
            </div>
            <Divider />

            <div id='reviews'>
              <Typography type='h3'>შეფასებები</Typography>
              <div className='flex items-center gap-5 mt-10 mb-5'>
                <Review review={4.5} size='large' />
                <Typography type='h5' weight='normal'>
                  206 შეფასება
                </Typography>
              </div>

              <div className='flex overflow-scroll lg:grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20'>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
              </div>
            </div>
          </div>
          <div className='hidden md:inline-block w-5/12 lg:w-4/12'>
            <PriceCalcCard />
          </div>
        </div>
        <Typography type='h3' className='block my-6 lg:hidden'>
          ფასი მოიცავს
        </Typography>
        <LessorInformationCard id='informationcard' />
        <Divider className='my-20' />
        <Typography type='h3'>მსგავსი მანქანები</Typography>
        <div className='flex gap-2 mt-10 overflow-auto'>
          <ProductCard productId={0} manufacturer={''} model={''} prodYear={0} priceGel={0} />
          <ProductCard productId={0} manufacturer={''} model={''} prodYear={0} priceGel={0} />
          <ProductCard productId={0} manufacturer={''} model={''} prodYear={0} priceGel={0} />
        </div>
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

const queryClient = new QueryClient()

export async function getServerSideProps() {
  try {
    await queryClient.prefetchQuery({
      queryKey: ['singleProductDetails'],
      queryFn: () => getSingleProductDetails(9),
      staleTime: Infinity
    })

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    }
  } catch (e) {
    return { notFound: true }
  }
}

export default ProductDetails
