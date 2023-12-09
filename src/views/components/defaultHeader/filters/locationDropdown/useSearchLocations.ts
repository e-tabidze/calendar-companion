import { useQuery } from '@tanstack/react-query'
import SearchService from 'src/services/SearchService'

const useSearchLocations = () => {
  const useLocations: any = useQuery({
    queryKey: ['searchLocations'],
    queryFn: () => getCities(),
    staleTime: Infinity,
    enabled: true
  })

  const cities = useLocations?.data?.result?.data

  return {
    cities
  }
}

export default useSearchLocations

export const getCities = async () => {
  try {
    const response: any = await SearchService.getCities()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
