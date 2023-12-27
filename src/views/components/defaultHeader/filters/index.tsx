import { IconTextButton } from '../../button'
import LocationDropdown from './locationDropdown'
import { Divider, ExtraFiltersContainer, FiltersContainer } from './styles'
import PeriodDropdown from './periodDropdown'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useSearch from 'src/hooks/useSearch'
import AdditionalFilters from 'src/views/components/additionalFilters'

interface Props {
  className?: string
}

const Filters: React.FC<Props> = ({ className }) => {
  const [filters, toggleFilters] = useState(false)

  const router = useRouter()

  const {
    searchValues,
    control,
    appendFuelType,
    appendCategory,
    appendSeatType,
    appendSteeringWheel,
    appendLuggageNumber,
    appendDriveTire,
    appendDoorType,
    appendTransmissionType,
    appendAdditionalInformation,
    objectToURI,
    reset,
    setValue,
    searchProductsMutation
  } = useSearch()

  const onClickSearch = async () => {
    // const queryString = objectToURI(searchValues)
    console.log('HERE?')
    // searchProductsMutation.mutate('?page=1&free_delivery=false&sort_by=id&order_by=asc')
    // searchProductsMutation.mutate(queryString)
    // router.push(`/search?${queryString}`)
  }

  return (
    <form className={className}>
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
            bg='bg-orange-100'
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
        appendSteeringWheel={appendSteeringWheel}
      />
    </form>
  )
}

export default Filters
