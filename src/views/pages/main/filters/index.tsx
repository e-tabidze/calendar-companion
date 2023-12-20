import { IconTextButton } from '../../../components/button'
import LocationDropdown from './locationDropdown'
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import PeriodDropdown from './periodDropdown'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useSearch from 'src/hooks/useSearch'
import AdditionalFilters from 'src/views/components/additionalFilters'

import PeriodMob from "src/views/pages/main/filters/periodMob";
import LocationMob from "src/views/pages/main/filters/locationMob";

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
    objectToURI,
    reset,
    setValue
  } = useSearch()

  console.log(searchValues, 'searchValues')
  const queryString = objectToURI(searchValues)

  console.log(queryString, 'queryString')

  const onClickSearch = async () => {
    const queryString = objectToURI(searchValues)
    router.push(`/search?${queryString}`)
  }

  return (
    <form>
      <FiltersContainer>
        <div className="hidden md:flex w-full">
          <LocationDropdown control={control} />
        </div>
        <div className="flex md:hidden w-full">
          <LocationMob control={control} />
        </div>
        <Divider />
        <div className="hidden md:flex w-full">
          <PeriodDropdown control={control} />
        </div>
        <div className="flex md:hidden w-full">
          <PeriodMob control={control} />
        </div>
        <Divider />
        <ExtraFiltersContainer className='flex shrink-0'>
          <IconTextButton
            label={'დამატებითი ფილტრი'}
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
            label={'ძებნა'}
            icon='search'
            width={20}
            height={20}
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
        onSubmit={onClickSearch}
        reset={reset}
        setValue={setValue}
      />
    </form>
  )
}

export default Filters
