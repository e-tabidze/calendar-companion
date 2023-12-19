import { useQuery } from '@tanstack/react-query'
import SearchService from 'src/services/SearchService'

const useSingleProductDetails = (id: any) => {
  const getSingleProduct = async () => {
    const response: any = await SearchService.getSingleProduct(id)

    return response.data?.result?.data
  }

  const { data: singleProductDetails } = useQuery(['singleProduct', id], getSingleProduct, {
    enabled: !!id
  })

  return { singleProductDetails }
}

export default useSingleProductDetails
