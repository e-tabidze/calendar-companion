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

  const queryClient = new QueryClient()

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
    searchProducts,
    searchProductsMutation
  } = useSearch()

  const objectToURI = (obj: any) => {
    return Object.entries(obj)
      .filter(([_, value]) => {
        return value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)
      })
      .map(([key, value]: [string, any]) => {
        if (key === 'booking' && value !== null && value !== undefined) {
          const { book_from, book_to } = value
          return [`book_from=${encodeURIComponent(book_from)}`, `book_to=${encodeURIComponent(book_to)}`]
        } else if (Array.isArray(value)) {
          return value.map(v => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`)
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        }
      })
      .flat()
      .join('&')
  }

  // const searchProductsMutation = useMutation((querystring: string) => searchProducts(querystring), {
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['searchProducts'])
  //   }
  // })

  // const searchProductsQuery = useQuery(['searchProducts', queryString], () => searchProducts(queryString), {
  //   // Set other query options as needed
  //   // enabled: false, // You might want to set this to true or remove it based on your requirements
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['searchProducts'])
  //   }
  // })

  // const { data, isLoading, isError } = useQuery(['searchProducts', queryString], () => searchProducts(queryString), {
  //   enabled: false
  // })
  const onClickSearch = async () => {
    const queryString = objectToURI(searchValues)
    router.push(`/search?${queryString}`)

    // try {
    //   await searchProductsMutation.mutateAsync(queryString)

    //   // Redirect after the mutation has successfully completed
    //   router.push(`/search?${queryString}`)
    // } catch (error) {
    //   console.error('Error during search mutation:', error)
    // }
  }

  console.log(searchProductsMutation, 'searchProductsMutation')

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
