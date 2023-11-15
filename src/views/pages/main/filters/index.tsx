import { IconTextButton } from '../../../components/button'
import LocationDropdown from './locationDropdown'
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import PeriodDropdown from './periodDropdown'
import { useState } from 'react'
import AdditionalFilters from 'src/views/components/additionalFilters'
import { useRouter } from 'next/router'
import useSearch from 'src/hooks/useSearch'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'

const Filters = () => {
  const [filters, toggleFilters] = useState(false)

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
    objectToURI
  } = useSearch()

  const onClickSearch = async () => {
    const queryString = objectToURI(searchValues)
    router.push(`/search?${queryString}`)
  }

  return (
    <form>
      <FiltersContainer>
        <LocationDropdown control={control} />
        <Divider />
        <PeriodDropdown control={control} />
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
        handleAdditionalFiltersSubmit={onClickSearch}
      />
    </form>
  )
}

export default Filters
