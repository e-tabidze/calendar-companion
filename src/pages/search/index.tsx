import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { LargeContainer } from 'src/styled/styles'
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

const SearchPage = () => {
  const { width } = useWindowDimensions()
  const [mapLayout, toggleMapLayout] = useState(true)

  const handleToggleMap = () => {
    toggleMapLayout(!mapLayout)
  }

  const { control } = useForm()

  return (
    <DefaultLayout>
      <LargeContainer>
        <Divider />
        <FiltersWrapper>
          <MainFilters>
            <PricePopover />
            <FuelTypePopover />
            <CategoryPopover />
            <Tag
              label='უფასო მიწოდება'
              component={<Switcher height='h-5' name='name' control={control} defaultValue />}
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

        <ResponsiveDivider />
        <SearchContentsContainer>
          <Wrapper>
            <SearchResultsContainer>
              <Typography type='h5' weight='normal' className='mr-2 mb-5 large:mb-0'>
                სულ ნაპოვნია 71 განცხადება
              </Typography>
              <div className='flex gap-5 my-4'>
                <Image src='/icons/grid.svg' onClick={handleToggleMap} className='hidden large:block' alt='' />
                <Image src='/icons/gridMap.svg' onClick={handleToggleMap} className='hidden large:block' alt='' />
                {width < 781 && (
                  <Tag
                    component={<Image src='/icons/filters.svg' alt='' />}
                    label={'ფილტრი'}
                    height='h-10'
                    bg={'bg-grey-60'}
                  />
                )}
                <Tag
                  component={<Image src='/icons/sort.svg' alt='' />}
                  label={width > 779 ? 'სორტირება' : ''}
                  height={width > 779 ? 'h-12' : 'h-10'}
                />
                {width < 781 && (
                  <Tag
                    component={<Image src='/icons/map.svg' alt='' />}
                    label='რუკაზე'
                    height='h-10'
                    handleClick={handleToggleMap}
                  />
                )}
              </div>
            </SearchResultsContainer>
            <div className={`grid gap-4 ${mapLayout ? 'grid-cols-2' : 'grid-cols-4'}`}>
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
          </Wrapper>
          {mapLayout && width > 779 && (
            <MapContainer>
              <MapPicker height='700px' borderRadius={width > 557 ? '30px' : '0px'} />
            </MapContainer>
          )}
        </SearchContentsContainer>
      </LargeContainer>
    </DefaultLayout>
  )
}

export default SearchPage
