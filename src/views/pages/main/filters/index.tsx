import { IconTextButton } from '../../../components/button'
import LocationDropdown from './locationDropdown'
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import PeriodDropdown from './periodDropdown'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import useSearch from 'src/hooks/useSearch'
import AdditionalFilters from 'src/views/components/additionalFilters'

import PeriodMob from 'src/views/pages/main/filters/periodMob'
import LocationMob from 'src/views/pages/main/filters/locationMob'
import { useTranslation } from 'next-i18next'

const Filters = () => {
  const [filters, toggleFilters] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [locationDropdown, setLocationDropdown] = useState<boolean>(false)
  const [periodDropdown, setPeriodDropdown] = useState<boolean>(false)

  const handleResetLocation = () => {
    setValue('location', '')
  }
  const handleResetBooking = () => {
    setValue('booking', { book_from: '', book_to: '' })
  }

  const router = useRouter()

  const {

    // searchValues,
    control,
    appendFuelType,
    appendCategory,
    appendSeatType,
    appendLuggageNumber,
    appendDriveTire,
    appendDoorType,
    appendTransmissionType,
    appendAdditionalInformation,
    appendSteeringWheel,
    objectToURI,
    
    // resetField,
    setValue,
    searchProductsQuery,
    reset,
    getValues
  } = useSearch()

  // const onClickSearch = async () => {
  //   // const queryString = objectToURI(searchValues)
  //   // searchProductsMutation.refetch()
  //   // router.push(`/search?${queryString}`)
  //   const updatedSearchValues: any = getValues()

  //   // searchProductsMutation.mutate(objectToURI(updatedSearchValues))
  //   searchProductsMutation.refetch()

  //   router.push(`/search?${objectToURI(updatedSearchValues)}`)
  // }

  const onClickSearch = async () => {
    const updatedSearchValues = getValues()
    searchProductsQuery.refetch()
    router.push(`/search?${objectToURI(updatedSearchValues)}`)
  }
  


  useEffect(() => {
    setIsMobileDevice(isMobile)
  }, [])

  // const resetSearchFields = () => {
  //   resetField('fuel_types')
  //   resetField('category')
  //   resetField('seat_types')
  //   resetField('luggage_numbers')
  //   resetField('drive_tires')
  //   resetField('door_types')
  //   resetField('steering_wheel')
  //   resetField('transmission_types')
  //   resetField('additional_information')
  //   resetField('price_min')
  //   resetField('price_max')
  //   resetField('manufacturer_id')
  //   resetField('year_from')
  //   resetField('year_to')
  // }

  const { t } = useTranslation()

  return (
    <form>
      <FiltersContainer className={locationDropdown || periodDropdown ? 'bg-raisin-10' : 'bg-white'}>
        {isMobileDevice ? (
          <LocationMob control={control} resetField={handleResetLocation} />
        ) : (
          <LocationDropdown control={control} resetField={handleResetLocation} setOpen={setLocationDropdown} />
        )}
        <Divider />
        {isMobileDevice ? (
          <PeriodMob control={control} resetField={handleResetBooking} />
        ) : (
          <PeriodDropdown control={control} resetField={handleResetBooking} setOpen={setPeriodDropdown} />
        )}
        <Divider />
        <ExtraFiltersContainer className='flex shrink-0'>
          <IconTextButton
            label={t('additional_filter')}
            icon='filters'
            width={22}
            height={20}
            bg='white'
            labelClassname='text-xs text-base-100 text-left md:hidden'
            className='md:mr-4 !px-0 md:!p-4'
            onClick={() => toggleFilters(!filters)}
            type='button'
          />
          <IconTextButton
            label={t('search')}
            icon='search'
            width={20}
            height={20}
            bg='bg-orange-100 hover:bg-orange-110 transition-all'
            className='md:h-16 px-4 md:px-6'
            labelClassname='text-2sm text-white md:hidden'
            onClick={onClickSearch}
            type='button'
          />
        </ExtraFiltersContainer>
      </FiltersContainer>
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
        appendSteeringWheel={appendSteeringWheel}
        appendTransmissionType={appendTransmissionType}
        appendAdditionalInformation={appendAdditionalInformation}
        onSubmit={onClickSearch}

        // reset={resetSearchFields}
        reset={reset}
        setValue={setValue}
      />
    </form>
  )
}

export default Filters
