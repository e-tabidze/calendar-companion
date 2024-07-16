import { useQuery } from '@tanstack/react-query'
import MapService from 'src/services/MapService'

const useAllCities = () => {

  const useGetAllCities: any = useQuery({
    queryKey: ['allCities'],
    queryFn: () => getAllCities(),
    staleTime: Infinity,
    enabled: true
  })

  const allCitiesData = useGetAllCities?.data?.result

  return {
    allCitiesData
  }
}

export default useAllCities

export const getAllCities = async () => {
  try {
    const response: any = await MapService.getAllCities()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
