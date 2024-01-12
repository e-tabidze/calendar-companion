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

const Filters = () => {
  const [filters, toggleFilters] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const handleResetLocation = () => {
    setValue('location', '')
  }
  const handleResetBooking = () => {
    setValue('booking', { book_from: '', book_to: '' })
  }

  const router = useRouter()

  const {
    searchValues,
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
    reset,
    setValue,
    searchProductsMutation
  } = useSearch()

  console.log(searchValues, 'searchValues')

  const onClickSearch = async () => {
    const queryString = objectToURI(searchValues)
    searchProductsMutation.mutate(queryString)
    router.push(`/search?${queryString}`)
  }
  useEffect(() => {
    setIsMobileDevice(isMobile)
  }, [])

  return (
    <form>
      <FiltersContainer>
        {isMobileDevice ? <LocationMob control={control} resetField={handleResetLocation} /> : <LocationDropdown control={control} resetField={handleResetLocation} />}
        <Divider />
        {isMobileDevice ? <PeriodMob control={control} resetField={handleResetBooking} /> : <PeriodDropdown control={control} resetField={handleResetBooking}/>}
        <Divider />
        <ExtraFiltersContainer className='flex shrink-0'>
          <IconTextButton
            label='დამატებითი ფილტრი'
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
            label='ძებნა'
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
        reset={reset}
        setValue={setValue}
      />
    </form>
  )
}

export default Filters
