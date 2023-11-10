import { useQuery } from '@tanstack/react-query'
import SearchService from 'src/services/SearchService'

const useFilters = () => {
  const useProductFilters: any = useQuery({
    queryKey: ['searchFilters'],
    queryFn: () => getProductFilters(),
    staleTime: Infinity,
    enabled: true
  })

  const categoriesFilter = useProductFilters?.data?.result?.data?.categories

  const fuelTypesFilter = useProductFilters?.data?.result?.data?.fuel_types

  const seatTypesFilter = useProductFilters?.data?.result?.data?.seat_types

  const doorTypesFilter = useProductFilters?.data?.result?.data?.door_types

  const driveTiresFilter = useProductFilters?.data?.result?.data?.drive_tires

  const transmisisonTypesFilter = useProductFilters?.data?.result?.data?.transmission_types

  const luggageNumbers = [
    {
      id: 1,
      title: 'ნებისმიერი'
    },
    {
      id: 2,
      title: '1'
    },
    {
      id: 3,
      title: '2'
    },
    {
      id: 4,
      title: '3'
    },
    {
      id: 5,
      title: '4'
    },
    {
      id: 6,
      title: '5'
    },
    {
      id: 7,
      title: '6'
    },
    {
      id: 8,
      title: '7'
    },
    {
      id: 9,
      title: '8+'
    }
  ]

  const isLoading = useProductFilters.isLoading

  return {
    categoriesFilter,
    fuelTypesFilter,
    seatTypesFilter,
    doorTypesFilter,
    driveTiresFilter,
    transmisisonTypesFilter,
    luggageNumbers,
    isLoading
  }
}

export default useFilters

export const getProductFilters = async () => {
  try {
    const response: any = await SearchService.getProductFilters()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
