import { IconTextButton } from '../../../components/button'
import LocationDropdown from './locationDropdown'
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import PeriodDropdown from './periodDropdown'
import { useState } from 'react'
import AdditionalFilters from 'src/views/components/additionalFilters'
import { useRouter } from 'next/router'
import useSearch from 'src/hooks/useSearch'

const Filters = () => {
  const [filters, toggleFilters] = useState(false)

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
    appendAdditionalInformation
  } = useSearch()

  const onSubmit = () => {
    console.log(searchValues, 'searchValues submit filters component')
  }

  console.log(searchValues, 'searchValues')

  const handleAdditionalFiltersSubmit = () => {
    onSubmit()
  }

  const router = useRouter()

  const onClickSearch = () => {
    router.push('/search')
  }

  return (
    <form>
      <FiltersContainer>
        <LocationDropdown control={control} />
        <Divider />
        <PeriodDropdown />
        <Divider />
        <ExtraFiltersContainer>
          <IconTextButton
            label={'დამატებითი ფილტრი'}
            icon={'/icons/filters.svg'}
            bg='white'
            labelClassname='text-xs text-base-100 text-left md:hidden'
            className='mr-[16px]'
            onClick={() => toggleFilters(!filters)}
            type="button"
          />
          <IconTextButton
            label={'ძებნა'}
            icon={'/icons/search.svg'}
            bg='bg-red-100'
            labelClassname='text-2sm text-white md:hidden'
            onClick={onClickSearch}
            className=''
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
        appendTransmissionType={appendTransmissionType}
        appendAdditionalInformation={appendAdditionalInformation}
        handleAdditionalFiltersSubmit={handleAdditionalFiltersSubmit}
      />
    </form>
  )
}

export default Filters
