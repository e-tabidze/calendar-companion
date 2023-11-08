import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { FullContainer } from 'src/styled/styles'
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
import AdditionalFilters from 'src/views/components/additionalFilters'
import {
  ClearFiltersWrapper,
  FiltersWrapper,
  MainFilters,
  MapContainer,
  ResponsiveDivider,
  SearchContentsContainer,
  SearchResultsContainer
} from '../../views/pages/search/styles'
import ToggleMapButton from '../../views/pages/search/toggleMapButton'

import Icon from 'src/views/app/Icon'
import SearchLayout from '../../layouts/SearchLayout'
import useSearch from 'src/hooks/useSearch'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getProductFilters } from 'src/hooks/useFilters'

const SearchPage = () => {
  const { control, searchValues, handleSubmit, appendFuelType, fuel_types } = useSearch()
  const { width } = useWindowDimensions()
  const [mapVisible, setMapVisible] = useState(true)
  const [filters, toggleFilters] = useState(false)

  useEffect(() => {
    setMapVisible(width >= 1025)
  }, [width])

  const handleToggleMapWidth = () => {
    setMapVisible(!mapVisible)
  }

  const onSubmit = () => {
    console.log(searchValues, 'searchValues submit')
  }

  console.log(searchValues, 'searchValues')

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchLayout>
          <Divider />
          <FiltersWrapper>
            <MainFilters>
              <PricePopover control={control} />
              <FuelTypePopover control={control} appendFuelType={appendFuelType} fuelTypes={fuel_types} />
              <CategoryPopover control={control} />
              <Tag
                label='უფასო მიწოდება'
                component={<Switcher height='h-5' name='free' control={control} defaultValue />}
                height='h-10'
                control={control}
              />
              <div className='hidden xl:flex'>
                <SeatsPopover control={control} />
              </div>
              <div className='hidden xl:flex'>
                <SuitcasesPopover />
              </div>
              <Tag
                label='ყველა ფილტრი'
                component={<Image src='/icons/filters.svg' alt='' />}
                height='h-10'
                bg={'bg-grey-60'}
                handleClick={() => toggleFilters(!filters)}
              />
            </MainFilters>
            <ClearFiltersWrapper>
              <Image src='/icons/return.svg' className='w-4' alt='' />
              <Typography type='body' className='text-orange-120'>
                ფილტრის გასუფთავება
              </Typography>
            </ClearFiltersWrapper>
          </FiltersWrapper>
          <ResponsiveDivider />
          <FullContainer className='lg:flex pt-20 lg:pt-[185px]'>
            <SearchContentsContainer
              className={`w-full px-5 md:px-10 transition-all duration-300 ${
                mapVisible ? 'lg:w-1/2 pr-8' : 'lg:w-[calc(100%-40px)] lg:pr-0'
              }`}
            >
              <SearchResultsContainer>
                <Typography type='h5' weight='normal' className='mr-2 mb-5 md:mb-0'>
                  სულ ნაპოვნია 71 განცხადება
                </Typography>
                <div className='w-full md:w-auto flex items-center my-4'>
                  <span
                    onClick={handleToggleMapWidth}
                    className={`cursor-pointer group hover:bg-green-10 ml-3 hidden lg:flex items-center justify-center w-8 h-8 rounded-full ${
                      mapVisible ? '' : 'bg-green-10'
                    }`}
                  >
                    <Icon
                      svgPath='grid'
                      width={14}
                      height={14}
                      className={`${mapVisible ? 'fill-raisin-30' : 'fill-green-100'}  group-hover:fill-green-100`}
                    />
                  </span>
                  <span
                    onClick={handleToggleMapWidth}
                    className={`cursor-pointer group hover:bg-green-10 ml-3 hidden lg:flex items-center justify-center w-8 h-8 rounded-full ${
                      mapVisible ? 'bg-green-10' : ''
                    }`}
                  >
                    <Icon
                      svgPath='gridMap'
                      width={17}
                      height={15}
                      className={`${mapVisible ? 'fill-green-100' : 'fill-raisin-30'} group-hover:fill-green-100`}
                    />
                  </span>
                  <div className='w-full md:w-auto flex justify-between md:ml-6'>
                    <div className='flex'>
                      {width < 1025 && (
                        <Tag
                          component={<Image src='/icons/filters.svg' alt='' />}
                          label={'ფილტრი'}
                          height='h-10'
                          bg={'bg-grey-60'}
                        />
                      )}
                      <Tag
                        className='mx-4 lg:mx-0'
                        component={<Image src='/icons/sort.svg' alt='' />}
                        label={width > 779 ? 'სორტირება' : ''}
                        height={width > 1025 ? 'h-12' : 'h-10'}
                      />
                    </div>

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
                className={`grid sm:grid-cols-2 gap-6 ${
                  mapVisible ? 'grid-cols-2 2xl:grid-cols-3' : 'lg:grid-cols-4 2xl:grid-cols-5'
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
              className={`absolute z-[11] lg:z-[1] top-[197px] md:top-[153px] lg:top-[0] w-full left-0 lg:fixed lg:right-0 lg:left-auto lg:top-0 overflow-hidden transition-all duration-300 ${
                mapVisible ? 'h-[100vh] lg:w-1/2' : 'h-0 lg:h-[100vh] lg:w-[40px]'
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
        </SearchLayout>
        <AdditionalFilters open={filters} setOpen={() => toggleFilters(!filters)} />
      </form>
    </>
  )
}

const queryClient = new QueryClient()

// export async function getServerSideProps() {
//   try {
//     await queryClient.prefetchQuery({
//       queryKey: ['searchFilters'],
//       queryFn: () => getProductFilters(),
//       staleTime: Infinity,
//     })

//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient)
//       }
//     }
//   } catch (e) {
//     return { notFound: true }
//   }
// }

export default SearchPage
