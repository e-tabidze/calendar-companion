import { useEffect, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { FullContainer } from 'src/styled/styles'

import {
  ClearFiltersWrapper,
  FiltersWrapper,
  MainFilters,

  // MapContainer,
  SearchContentsContainer,
  SearchResultsContainer
} from '../../views/pages/search/styles'

import useSearch from 'src/hooks/useSearch'
import { useRouter } from 'next/router'
import { IconTextButton } from 'src/views/components/button'
import dynamic from 'next/dynamic'
import { Controller, useWatch } from 'react-hook-form'

import SortListBox from 'src/views/pages/search/sortListBox'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PageMeta from 'src/@core/meta/PageMeta'
import { useTranslation } from 'next-i18next'
import { queryClient } from '../_app'
import { dehydrate } from '@tanstack/react-query'

// const MapPicker = dynamic(() => import('src/views/components/mapPicker'), { ssr: true })
const SkeletonLoading = dynamic(() => import('src/views/pages/search/skeletonLoading'), { ssr: false })
const SearchLayout = dynamic(() => import('../../layouts/SearchLayout'), { ssr: false })
const Icon = dynamic(() => import('src/views/app/Icon'), { ssr: false })
const Pagination = dynamic(() => import('src/views/components/pagination'), { ssr: false })
const ProductCard = dynamic(() => import('src/views/components/productCard'), { ssr: false })
const Tag = dynamic(() => import('src/views/components/tag'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: true })
const CategoryPopover = dynamic(() => import('src/views/pages/search/categoryPopover'), { ssr: false })
const FuelTypePopover = dynamic(() => import('src/views/pages/search/fuelTypePopover'), { ssr: false })
const PricePopover = dynamic(() => import('src/views/pages/search/pricePopover'), { ssr: false })
const SeatsPopover = dynamic(() => import('src/views/pages/search/seatsPopover'), { ssr: false })
const SuitcasesPopover = dynamic(() => import('src/views/pages/search/suitcasesPopover'), { ssr: false })
const AdditionalFilters = dynamic(() => import('src/views/components/additionalFilters'), { ssr: false })

// const ToggleMapButton = dynamic(() => import('../../views/pages/search/toggleMapButton'), { ssr: true })

// const pageMeta = {
//   title: 'მეტა?',
//   desc: '',
//   img: ''
// }

const SearchPage = () => {
  const {
    control,
    reset,
    getValues,
    appendFuelType,
    appendCategory,
    appendSeatType,
    appendLuggageNumber,
    appendDriveTire,
    appendDoorType,
    appendTransmissionType,
    appendSteeringWheel,
    appendAdditionalInformation,
    productsData,
    isLoading,
    totalProductsCount,
    totalPages,
    objectToURI,
    setValue
  } = useSearch()
  const { width } = useWindowDimensions()

  const router = useRouter()

  const { book_from, book_to } = router.query

  const page = router.query.page ? Number(router.query.page) : 1

  const [hasFilter, setHasFilter] = useState(false)

  const formState = useWatch({ control })

  const { t } = useTranslation()

  // const [mapVisible, setMapVisible] = useState(true)
  const [filters, toggleFilters] = useState(false)
  const [pageMeta, setPageMeta] = useState({})
  const [manufactuterMeta, setManufactuterMeta] = useState('Rent.myauto.ge | მანქანის ქირაობის პლატფორმა')
  const [yearFromMeta, setYearFromMeta] = useState('')
  const [yearToMeta, setYearToMeta] = useState('')

  useEffect(() => {
    setHasFilter(
      !!formState?.price_min?.length ||
        !!formState?.price_max?.length ||
        (formState?.category?.length ?? 0) > 0 ||
        (formState?.manufacturer_id?.length ?? 0) > 0 ||
        (formState?.model_id?.length ?? 0) > 0 ||
        !!formState?.year_from ||
        !!formState?.year_to ||
        (formState?.fuel_types?.length ?? 0) > 0 ||
        (formState?.seat_types?.length ?? 0) > 0 ||
        (formState?.luggage_numbers?.length ?? 0) > 0 ||
        (formState?.drive_tires?.length ?? 0) > 0 ||
        (formState?.transmission_types?.length ?? 0) > 0 ||
        (formState?.additional_information?.length ?? 0) > 0
    )
  }, [formState])

  useEffect(() => {
    const metaTitle = `${manufactuterMeta} ${yearFromMeta} ${yearToMeta} Rent.myauto.ge | მანქანის ქირაობის პლატფორმა`
    const metaDesc = `Rent.myauto.ge | მანქანის ქირაობის პლატფორმა`
    setPageMeta({ title: metaTitle, desc: metaDesc, img: '' })
  }, [formState])

  // useEffect(() => {
  //   setMapVisible(width >= 1025)
  // }, [width])

  // const handleToggleMapWidth = () => {
  //   setMapVisible(!mapVisible)
  // }

  const onSubmit = () => {
    const updatedSearchValues: any = getValues()

    // searchProductsMutation.mutate(objectToURI(updatedSearchValues))
    // searchProductsQuery.refetch()

    router.push(`/search?${objectToURI(updatedSearchValues)}`)
  }

  return (
    <>
      <PageMeta meta={pageMeta} />

      <form>
        <SearchLayout>
          <FiltersWrapper className='border-t-1 border-b-1 border-raisin-10'>
            <MainFilters>
              <PricePopover
                control={control}
                handleSubmit={onSubmit}
                reset={() => {
                  setValue('price_max', '')
                  setValue('price_min', '')
                }}
              />
              <FuelTypePopover
                control={control}
                appendFuelType={appendFuelType}
                handleSubmit={onSubmit}
                setValue={setValue}
              />
              <CategoryPopover
                control={control}
                appendCategory={appendCategory}
                handleSubmit={onSubmit}
                setValue={setValue}
              />

              {/* <Tag
                label='უფასო მიყვანა'
                component={<Switcher height='h-5' name='free_delivery' control={control} onChangeCallback={onSubmit} />}
                height='h-10'
                control={control}
              /> */}
              <SeatsPopover
                control={control}
                appendSeatType={appendSeatType}
                handleSubmit={onSubmit}
                setValue={setValue}
              />
              <div className='hidden xl:flex'>
                <SuitcasesPopover
                  control={control}
                  appendLuggageNumber={appendLuggageNumber}
                  handleSubmit={onSubmit}
                  setValue={setValue}
                />
              </div>
              <Tag
                label={t('filters_all')}
                className={`${hasFilter ? 'border border-raisin-100' : ''} bg-grey-60`}
                component={<Icon svgPath='filters' width={22} height={20} className='flex fill-transparent' />}
                height='h-10'
                handleClick={() => toggleFilters(!filters)}
              />
            </MainFilters>
            <ClearFiltersWrapper>
              <IconTextButton
                icon='clearFilter'
                width={24}
                height={24}
                className='fill-transparent'
                label={t('clear')}
                labelClassname='text-red-100'
                iconFill='!fill-red-100'
                type='reset'
                onClick={(e: { preventDefault: () => void }) => {
                  reset()
                  e.preventDefault()
                  router.push('/search/?free_delivery=false&page=1&order_by=desc&sort_by=id')
                }}
              />
            </ClearFiltersWrapper>
          </FiltersWrapper>
          <FullContainer className='lg:flex border-t-1 md:border-none border-raisin-10'>
            <SearchContentsContainer className='w-full px-5 md:px-10 transition-all duration-300 lg:w-[calc(100%-40px)] lg:pr-0'>
              {/*  className={`w-full px-5 md:px-10 transition-all duration-300 ${*/}
              {/*    mapVisible ? 'lg:w-1/2 pr-8' : 'lg:w-[calc(100%-40px)] lg:pr-0'*/}
              {/*}`}*/}
              <SearchResultsContainer>
                <Typography type='body' className='text-md mr-2 mt-6 md:mt-0'>
                  {totalProductsCount} {t('search_results')} {t('founded')}
                </Typography>
                <div className='w-full md:w-auto flex items-center'>
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
                    <div className='flex w-full justify-between'>
                      {width < 1025 && (
                        <Tag
                          component={<Icon svgPath='filters' width={22} height={20} className='fill-transparent' />}
                          className='bg-grey-60'
                          label={t('filter')}
                          height='h-10'
                          handleClick={() => toggleFilters(!filters)}
                        />
                      )}

                      <SortListBox control={control} onClick={onSubmit} setValue={setValue} />
                    </div>

                    {/* {width < 1025 && (
                      <Tag
                        component={<Icon svgPath='map' width={24} height={24} className='fill-transparent' />}
                        label='რუკაზე'
                        height='h-10'
                        handleClick={handleToggleMapWidth}
                      />
                    )} */}
                  </div>
                </div>
              </SearchResultsContainer>

              {isLoading ? (
                <SkeletonLoading />
              ) : (
                <div className='flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6'>
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
                      images={product?.images?.split(',')}
                      city={product?.start_city}
                      isProductInFavorites={product.is_favourite}
                      priceUsd={product?.price_usd}
                      days={
                        (new Date(String(book_to)).getTime() - new Date(String(book_from)).getTime()) /
                        (1000 * 3600 * 24)
                      }
                      discounts={product?.discounts}
                    />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <Controller
                  name='page'
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Pagination
                      totalPages={totalPages}
                      currentPage={Number(page)}
                      onPageChange={newPage => {
                        onChange(newPage)
                        onSubmit()
                      }}
                    />
                  )}
                />
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
          setValue={setValue}
          appendSteeringWheel={appendSteeringWheel}
          setManufactuterMeta={setManufactuterMeta}
          setYearFromMeta={setYearFromMeta}
          setYearToMeta={setYearToMeta}
        />
      </form>
    </>
  )
}

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      rehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common', 'searchProducts']))
    }
  }
}

export default SearchPage
