import { useEffect, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { FullContainer } from 'src/styled/styles'

import {
  ClearFiltersWrapper,
  FiltersWrapper,
  MainFilters,
  MapContainer,
  ResponsiveDivider,
  SearchContentsContainer,
  SearchResultsContainer
} from '../../views/pages/search/styles'

import Icon from 'src/views/app/Icon'
import SearchLayout from '../../layouts/SearchLayout'
import useSearch from 'src/hooks/useSearch'
import { useRouter } from 'next/router'
import { IconTextButton } from 'src/views/components/button'
import dynamic from 'next/dynamic'

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: true })
const Image = dynamic(() => import('src/views/components/image'), { ssr: true })
const MapPicker = dynamic(() => import('src/views/components/mapPicker'), { ssr: true })
const ProductCard = dynamic(() => import('src/views/components/productCard'), { ssr: true })
const Switcher = dynamic(() => import('src/views/components/switcher'), { ssr: true })
const Tag = dynamic(() => import('src/views/components/tag'), { ssr: true })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: true })
const CategoryPopover = dynamic(() => import('src/views/pages/search/categoryPopover'), { ssr: true })
const FuelTypePopover = dynamic(() => import('src/views/pages/search/fuelTypePopover'), { ssr: true })
const PricePopover = dynamic(() => import('src/views/pages/search/pricePopover'), { ssr: true })
const SeatsPopover = dynamic(() => import('src/views/pages/search/seatsPopover'), { ssr: true })
const SuitcasesPopover = dynamic(() => import('src/views/pages/search/suitcasesPopover'), { ssr: true })
const AdditionalFilters = dynamic(() => import('src/views/components/additionalFilters'), { ssr: true })
const ToggleMapButton = dynamic(() => import('../../views/pages/search/toggleMapButton'), { ssr: true })

const SearchPage = () => {
  const {
    control,
    reset,
    getValues,
    resetField,
    handleSubmit,
    appendFuelType,
    appendCategory,
    appendSeatType,
    appendLuggageNumber,
    appendDriveTire,
    appendDoorType,
    appendTransmissionType,
    appendAdditionalInformation,
    productsData,
    isLoading,
    searchProductsMutation,
    totalProductsCount,
    objectToURI
  } = useSearch()
  const { width } = useWindowDimensions()
  const [mapVisible, setMapVisible] = useState(true)
  const [filters, toggleFilters] = useState(false)

  const router = useRouter()

  const { asPath } = router

  const { book_from, book_to } = router.query

  console.log(book_from, 'from', book_to, 'to')

  const startIndex = asPath.indexOf('/search/?') + '/search/?'.length
  const searchString = asPath.slice(startIndex)

  useEffect(() => {
    setMapVisible(width >= 1025)
  }, [width])

  useEffect(() => {
    searchProductsMutation.mutateAsync(searchString)
  }, [searchString])

  const handleToggleMapWidth = () => {
    setMapVisible(!mapVisible)
  }

  const onSubmit = () => {
    const updatedSearchValues = getValues()
    router.push(`/search?${objectToURI(updatedSearchValues)}`)
  }

  console.log(productsData, 'productsData')

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchLayout>
          <Divider />
          <FiltersWrapper>
            <MainFilters>
              <PricePopover control={control} handleSubmit={onSubmit} reset={resetField} />
              <FuelTypePopover control={control} appendFuelType={appendFuelType} reset={resetField} />
              <CategoryPopover
                control={control}
                appendCategory={appendCategory}
                handleSubmit={onSubmit}
                reset={resetField}
              />
              <Tag
                label='უფასო მიწოდება'
                component={
                  <Switcher
                    height='h-5'
                    name='free_delivery'
                    control={control}
                    onChangeCallback={onSubmit}
                  />
                }
                height='h-10'
                control={control}
              />
              <div className='hidden xl:flex'>
                <SeatsPopover
                  control={control}
                  appendSeatType={appendSeatType}
                  handleSubmit={onSubmit}
                  reset={resetField}
                />
              </div>
              <div className='hidden xl:flex'>
                <SuitcasesPopover
                  control={control}
                  appendLuggageNumber={appendLuggageNumber}
                  handleSubmit={onSubmit}
                  reset={resetField}
                />
              </div>
              <Tag
                label='ყველა ფილტრი'
                className='bg-grey-60'
                component={<Image src='/icons/filters.svg' alt='' />}
                height='h-10'
                handleClick={() => toggleFilters(!filters)}
              />
            </MainFilters>
            <ClearFiltersWrapper>
              <IconTextButton
                icon='return'
                width={20}
                height={22}
                label='ფილტრის გასუფთავება'
                labelClassname='text-orange-120'
                type='reset'
                onClick={() => {
                  reset()
                  onSubmit()
                }}
              />
            </ClearFiltersWrapper>
          </FiltersWrapper>
          <ResponsiveDivider />
          <FullContainer className='lg:flex pt-20 lg:pt-[185px]'>
            <SearchContentsContainer
              className='w-full px-5 md:px-10 transition-all duration-300 lg:w-[calc(100%-40px)] lg:pr-0'
            >
            {/*  className={`w-full px-5 md:px-10 transition-all duration-300 ${*/}
            {/*    mapVisible ? 'lg:w-1/2 pr-8' : 'lg:w-[calc(100%-40px)] lg:pr-0'*/}
            {/*}`}*/}
              <SearchResultsContainer>
                <Typography type='h5' weight='normal' className='mr-2 mb-5 md:mb-0'>
                  სულ ნაპოვნია {totalProductsCount} განცხადება
                </Typography>
                <div className='w-full md:w-auto flex items-center my-4'>
                  {/*<span*/}
                  {/*  onClick={handleToggleMapWidth}*/}
                  {/*  className={`cursor-pointer group hover:bg-green-10 ml-3 hidden lg:flex items-center justify-center w-8 h-8 rounded-full ${*/}
                  {/*    mapVisible ? '' : 'bg-green-10'*/}
                  {/*  }`}*/}
                  {/*>*/}
                  {/*  <Icon*/}
                  {/*    svgPath='grid'*/}
                  {/*    width={14}*/}
                  {/*    height={14}*/}
                  {/*    className={`${mapVisible ? 'fill-raisin-30' : 'fill-green-100'}  group-hover:fill-green-100`}*/}
                  {/*  />*/}
                  {/*</span>*/}
                  {/*<span*/}
                  {/*  onClick={handleToggleMapWidth}*/}
                  {/*  className={`cursor-pointer group hover:bg-green-10 ml-3 hidden lg:flex items-center justify-center w-8 h-8 rounded-full ${*/}
                  {/*    mapVisible ? 'bg-green-10' : ''*/}
                  {/*  }`}*/}
                  {/*>*/}
                  {/*  <Icon*/}
                  {/*    svgPath='gridMap'*/}
                  {/*    width={17}*/}
                  {/*    height={15}*/}
                  {/*    className={`${mapVisible ? 'fill-green-100' : 'fill-raisin-30'} group-hover:fill-green-100`}*/}
                  {/*  />*/}
                  {/*</span>*/}
                  <div className='w-full md:w-auto flex justify-between md:ml-6'>
                    <div className='flex'>
                      {width < 1025 && (
                        <Tag
                          component={<Image src='/icons/filters.svg' alt='' />}
                          className='bg-grey-60'
                          label={'ფილტრი'}
                          height='h-10'
                          handleClick={() => toggleFilters(!filters)}
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
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <div
                  className='grid sm:grid-cols-2 gap-6 lg:grid-cols-4 2xl:grid-cols-5'
                >
                {/*  className={`grid sm:grid-cols-2 gap-6 ${*/}
                {/*    mapVisible ? 'grid-cols-2 2xl:grid-cols-3' : 'lg:grid-cols-4 2xl:grid-cols-5'*/}
                {/*}`}*/}
                  {productsData?.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      productId={product.id}
                      manufacturer={product?.manufacturer?.title}
                      model={product?.manufacturer_model?.title}
                      prodYear={product?.prod_year}
                      priceGel={product?.price_gel}
                      bookFrom={Array.isArray(book_from) ? book_from[0] : book_from}
                      bookTo={Array.isArray(book_to) ? book_to[0] : book_to}
                      luggageNumbers={product?.luggage_numbers}
                      seats={product?.seat_type?.title}
                    />
                  ))}
                </div>
              )}
            </SearchContentsContainer>
            {/*<MapContainer*/}
            {/*  className={`absolute z-[11] lg:z-[1] top-[197px] md:top-[153px] w-full left-0 lg:sticky lg:right-0 lg:left-auto lg:top-0 overflow-hidden transition-all duration-300 ${*/}
            {/*    mapVisible ? 'h-[100vh] lg:w-1/2' : 'h-0 lg:h-[100vh] lg:w-10'*/}
            {/*  }`}*/}
            {/*>*/}
            {/*  <MapPicker*/}
            {/*    width='100%'*/}
            {/*    height='100vh'*/}
            {/*    className={`${*/}
            {/*      mapVisible*/}
            {/*        ? ''*/}
            {/*        : "after:content-[''] after:bg-white after:absolute after:z-[11] after:top-0 after:left-0 after:w-full after:h-full"*/}
            {/*    }`}*/}
            {/*  />*/}
            {/*  <ToggleMapButton mapVisible={mapVisible} onClick={handleToggleMapWidth} />*/}
            {/*</MapContainer>*/}
          </FullContainer>
        </SearchLayout>
        <AdditionalFilters
          open={filters}
          toggleModal={() => toggleFilters(!filters)}
          control={control}
          appendFuelType={appendFuelType}
          appendSeatType={appendSeatType}
          appendLuggageNumber={appendLuggageNumber}
          appendCategory={appendCategory}
          appendDriveTire={appendDriveTire}
          appendDoorType={appendDoorType}
          appendTransmissionType={appendTransmissionType}
          appendAdditionalInformation={appendAdditionalInformation}
          onSubmit={onSubmit}
          reset={reset}
        />
      </form>
    </>
  )
}

export default SearchPage
