import { useEffect, useRef, useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import Carousel from 'src/views/components/carousel'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'
import ProductFeature from 'src/views/pages/details/productFeature'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PriceCalcCard from 'src/views/pages/details/priceCalcCard'
import InsuranceCard from 'src/views/pages/details/insuranceCard'
import MapPicker from 'src/views/components/mapPicker'
import Review from 'src/views/components/review'
import ReviewCard from 'src/views/pages/details/reviewCard.tsx'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import LessorInformationCard from 'src/views/pages/details/lessorInformationCard'
import DetailsPageHeader from 'src/views/pages/details/detailsPageHeader'
import Divider from 'src/views/components/divider'
import EntityInformationCard from 'src/views/pages/details/entitiInformationCard'
import Drawer from 'src/views/pages/details/drawer'
import ResponsivePriceCalcCard from 'src/views/pages/details/responsivePriceCalcCard'
import ProductCard from 'src/views/components/productCard'
import ProductImagesDialog from 'src/views/pages/details/productImagesDialog'
import { ContentContainer, MaxWidthContainer } from 'src/styled/styles'
import SubNavItem from 'src/views/pages/details/subNavItem'

const productImages = [
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={1} />,
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={2} />,
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={3} />,
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={4} />,
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={5} />,
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={6} />,
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={7} />,
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={8} />,
  <Image src='/images/car.png' className='w-full px-1 object-cover h-auto rounded-2xl' alt='productdetails' key={9} />
]

const features = [
  {
    id: 1,
    feature: '5 მგზავრი',
    icon: '/icons/printer.svg'
  },
  {
    id: 2,
    feature: '2 ჩემოდანი',
    icon: '/icons/printer.svg'
  },
  {
    id: 3,
    feature: 'კონდიციონერი',
    icon: '/icons/printer.svg'
  },
  {
    id: 4,
    feature: 'ბენზინი',
    icon: '/icons/printer.svg'
  },
  {
    id: 5,
    feature: 'ავტომატიკა',
    icon: '/icons/printer.svg'
  },
  {
    id: 6,
    feature: '4/5 კარი',
    icon: '/icons/printer.svg'
  },
  {
    id: 7,
    feature: 'საწვავი, სავსე ავზი -  სავსე ავზი',
    icon: '/icons/printer.svg'
  },
  {
    id: 8,
    feature: 'ნაღდი ჰიუნდაია',
    icon: '/icons/printer.svg'
  }
]

const ProductDetails = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [section, setSection] = useState('details')
  const [isSticky, setIsSticky] = useState(false)
  const [productImageDialogOpen, setProductImageDialogOpen] = useState<boolean>(false)

  const { width } = useWindowDimensions()

  const ref = useRef<any>()

  useEffect(() => {
    const componentPosition = ref.current.getBoundingClientRect().top - 80
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
      <MaxWidthContainer className={`${isSticky ? 'fixed top-20' : ''} bg-white z-50`} ref={ref} id='head'>
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
          <div className='w-full large:w-7/12 laptop:w-8/12'>
            <div id='details'>
              <Typography type='h3' className='font-bold'>
                SOLVO XC60 2022
              </Typography>
              <div className='flex items-center gap-4 mb-12'>
                <Typography type='body' color='light'>
                  ან მსგავსი
                </Typography>
                <Typography type='subtitle'>| </Typography>
                <Image src='/icons/favIconOutlineDark.svg' alt='location' />
                <Typography type='subtitle'>თბილისი, იაკობ ცურტაველის 72</Typography>
              </div>
              <Typography type='subtitle'>
                The 2012 Subaru Forester is a five-passenger compact SUV that comes standard with full-time all-wheel
                drive. It has a functional interior that features what Subaru calls a “twin cockpit” design, that’s
                supposed to embrace its occupants. The Forester 2.5X comes standard with 16-inch steel wheels, It has a
                panoramic moon roof, and a roof rack. There are 7 Subaru Forester in our Company.
              </Typography>
              <EntityInformationCard />
            </div>
            <div className='my-8' id='features'>
              <Typography type='h3'>მახასიათებლები</Typography>
              <div className='mt-8 mb-11 grid grid-cols-1 laptop:grid-cols-2 gap-4'>
                {features.map(feature => (
                  <ProductFeature feature={feature.feature} icon={feature.icon} key={feature.id} />
                ))}
              </div>
            </div>
            <Divider />
            <div className='my-8'>
              <Typography type='h3'>ფასი მოიცავს</Typography>
              <div className='mt-8 mb-11 grid grid-cols-1 laptop:grid-cols-2 gap-4'>
                {features.map(feature => (
                  <ProductFeature feature={feature.feature} icon={feature.icon} key={feature.id} />
                ))}
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
                <div className='hidden laptop:flex gap-4 cursor-pointer '>
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

            <div className='mt-11 mb-16 large:mb-28 overflow-auto' id='insurance'>
              <Typography type='h3'>დაზღვევა</Typography>
              <div className='flex gap-6 mt-10 w-[160%] large:w-full'>
                <div className='w-8/12 large:w-full'>
                  <InsuranceCard selected />
                </div>
                <div className='w-8/12 laptop:w-full'>
                  <InsuranceCard />
                </div>
              </div>
            </div>
            <Divider />

            <div className='mt-20 large:mt-40'>
              <Typography type='h3'>ადგილმდებარეობა</Typography>
              <div className='flex gap-4 items-center mt-10 mb-6'>
                <Image src='/icons/locationOutline.svg' alt='' />
                <Typography type='h5' weight='normal'>
                  თბილისი, იაკობ ცურტაველის 72
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

              <div className='flex overflow-scroll laptop:grid grid-cols-1 laptop:grid-cols-2 gap-4 mb-20'>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
              </div>
            </div>
          </div>
          <div className='hidden large:inline-block w-5/12 laptop:w-4/12'>
            <PriceCalcCard />
          </div>
        </div>
        <Typography type='h3' className='block my-6 laptop:hidden'>
          ფასი მოიცავს
        </Typography>
        <LessorInformationCard id='informationcard' />
        <Divider className='my-20' />
        <Typography type='h3'>მსგავსი მანქანები</Typography>
        <div className='flex gap-2 mt-10 overflow-auto'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
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

export default ProductDetails
