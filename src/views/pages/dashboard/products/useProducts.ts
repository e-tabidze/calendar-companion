import { useQuery } from '@tanstack/react-query'
import CompanyService from 'src/services/CompanyService'
import ProductService from 'src/services/ProductService'

const useProducts = () => {
  const useCompanyProducts: any = useQuery({
    queryKey: ['companyProducts'],
    queryFn: () => getCompanyProducts(),
    staleTime: Infinity,
    enabled: true
  })

  const companyProducts = useCompanyProducts?.data?.result

  const isLoading = useCompanyProducts.isLoading

  return {
    companyProducts,
    isLoading,
    deleteProduct
  }
}

export default useProducts

export const getCompanyProducts = async (accessToken = '') => {
  try {
    const response: any = await CompanyService.getCompanyProducts(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const deleteProduct = async (id: number) => {
  try {
    const response: any = await ProductService.deleteProduct('', id)

    return response
  } catch (error) {
    console.error('Error deleting company:', error)
    throw error
  }
}
