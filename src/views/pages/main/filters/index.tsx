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

  const objectToURI = (obj: any) => {
    return Object.entries(obj)
      .filter(([key, value]) => {
        return value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`).join('&')
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        }
      })
      .join('&')
  }

  const onSubmit = () => {
    console.log(searchValues, 'searchValues submit filters component')
  }

  const handleAdditionalFiltersSubmit = () => {
    onSubmit()
  }

  const router = useRouter()
  console.log(searchValues, 'searchValues')

  const onClickSearch = () => {
    const queryString = objectToURI(searchValues)
    console.log(queryString, 'queryStinrg')
    router.push(`/search?${queryString}`)
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
            className='mr-4'
            onClick={() => toggleFilters(!filters)}
            type='button'
          />
          <IconTextButton
            label={'ძებნა'}
            icon={'/icons/search.svg'}
            bg='bg-red-100'
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
        appendTransmissionType={appendTransmissionType}
        appendAdditionalInformation={appendAdditionalInformation}
        handleAdditionalFiltersSubmit={handleAdditionalFiltersSubmit}
      />
    </form>
  )
}

export default Filters
