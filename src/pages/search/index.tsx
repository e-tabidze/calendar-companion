import { useEffect, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { LargeContainer, FullContainer } from 'src/styled/styles'
import Divider from 'src/views/components/divider'
import Image from 'src/views/components/image'
import MapPicker from 'src/views/components/mapPicker'
import ProductCard from 'src/views/components/productCard'
import Switcher from 'src/views/components/switcher'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'
import CategoryPopover from 'src/views/pages/search/categoryPopover'
import FuelTypePopover from 'src/views/pages/search/fuelTypePopover'
import PricePopover from 'src/views/pages/search/pricePopover'
import SeatsPopover from 'src/views/pages/search/seatsPopover'
import SuitcasesPopover from 'src/views/pages/search/suitcasesPopover'
import {
  ClearFiltersWrapper,
  FiltersWrapper,
  MainFilters,
  MapContainer,
  ResponsiveDivider,
  SearchContentsContainer,
  SearchResultsContainer,
  Wrapper
} from '../../views/pages/search/styles'
import ToggleMapButton from '../../views/pages/search/toggleMapButton'

const SearchPage = () => {
  const { width } = useWindowDimensions()
  const [mapVisible, setMapVisible] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setMapVisible(window.innerWidth >= 1025)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleToggleMapWidth = () => {
    setMapVisible(!mapVisible)
  }

  return (
    <>
      <DefaultLayout fullWidth={true}>
        <Divider />
        <FullContainer className='px-10'>
          <FiltersWrapper>
            <MainFilters>
              <PricePopover />
              <FuelTypePopover />
              <CategoryPopover />
              <Tag
                label='უფასო მიწოდება'
                component={<Switcher height='h-5' value={false} onChange={() => console.log('')} />}
                height='h-10'
              />
              <SeatsPopover />
              <SuitcasesPopover />
              <Tag
                label='ყველა ფილტრი'
                component={<Image src='/icons/filters.svg' alt='' />}
                height='h-10'
                bg={'bg-grey-60'}
              />
            </MainFilters>
            <ClearFiltersWrapper>
              <Image src='/icons/return.svg' className='w-4' alt='' />
              <Typography type='body' className='text-orange-120 w-20'>
                ფილტრის გასუფთავება
              </Typography>
            </ClearFiltersWrapper>
          </FiltersWrapper>
        </FullContainer>
        <ResponsiveDivider />
      </DefaultLayout>

      <FullContainer className='laptop:flex'>
        <SearchContentsContainer
          className={`w-full px-5 large:pl-10 transition-all duration-300 ${
            mapVisible ? 'laptop:w-1/2 pr-8' : 'w-full laptop:pr-0'
          }`}
        >
          <SearchResultsContainer>
            <Typography type='h5' weight='normal' className='mr-2 mb-5 large:mb-0'>
              სულ ნაპოვნია 71 განცხადება
            </Typography>
            <div className='flex items-center my-4'>
              <span
                className={`cursor-pointer ml-3 hidden laptop:flex items-center justify-center w-8 h-8 rounded-full ${
                  mapVisible ? '' : 'bg-green-10'
                }`}
              >
                <Image src='/icons/grid.svg' onClick={handleToggleMapWidth} className='h-[14px]' alt='' />
              </span>
              <span
                className={`cursor-pointer ml-3 hidden laptop:flex items-center justify-center w-8 h-8 rounded-full ${
                  mapVisible ? 'bg-green-10' : ''
                }`}
              >
                <Image src='/icons/gridMap.svg' onClick={handleToggleMapWidth} className='h-[14px]' alt='' />
              </span>
              <div className='flex large:ml-6'>
                {width < 1025 && (
                  <Tag
                    component={<Image src='/icons/filters.svg' alt='' />}
                    label={'ფილტრი'}
                    height='h-10'
                    bg={'bg-grey-60'}
                  />
                )}
                <Tag
                  className='mx-4'
                  component={<Image src='/icons/sort.svg' alt='' />}
                  label={width > 779 ? 'სორტირება' : ''}
                  height={width > 779 ? 'h-12' : 'h-10'}
                />
                {width < 1025 && (
                  <Tag
                    component={<Image src='/icons/map.svg' alt='' />}
                    label='რუკაზე'
                    height='h-10'
                    handleClick={handleToggleMapWidth}
                  />
                )}
              </div>
            </div>
          </SearchResultsContainer>
          <div
            className={`grid tablet:grid-cols-2 gap-6 ${
              mapVisible ? 'grid-cols-2 2xl:grid-cols-3' : 'laptop:grid-cols-4 2xl:grid-cols-5'
            }`}
          >
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </SearchContentsContainer>
        <MapContainer
          className={`absolute z-[111] top-[197px] laptop:top-[0] w-full left-0 laptop:relative overflow-hidden transition-all duration-300 ${
            mapVisible ? 'h-[100vh] laptop:w-1/2' : 'h-0 laptop:h-[100vh] laptop:w-[40px]'
          }`}
        >
          <MapPicker
            width='100%'
            height='100vh'
            className={`${
              mapVisible
                ? ''
                : "after:content-[''] after:bg-white after:absolute after:z-[11] after:top-0 after:left-0 after:w-full after:h-full"
            }`}
          />
          <ToggleMapButton mapVisible={mapVisible} onClick={handleToggleMapWidth} />
        </MapContainer>
      </FullContainer>
    </>
  )
}

export default SearchPage
