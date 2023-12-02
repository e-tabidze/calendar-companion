import { useQuery } from '@tanstack/react-query'
import SearchService from 'src/services/SearchService'

const useSingleProductDetails = (id: any) => {
  const fetchSingleProduct = async () => {
    const response: any = await SearchService.getSingleProduct(id[0])

    return response.data?.result?.data
  }

  const { data: singleProductDetails } = useQuery(['singleProduct', id], fetchSingleProduct, {
    enabled: !!id
  })

  return { singleProductDetails }
}

export default useSingleProductDetails
