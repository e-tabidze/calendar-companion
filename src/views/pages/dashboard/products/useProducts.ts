import { useQuery } from '@tanstack/react-query'
import CompanyService from 'src/services/CompanyService'
import ProductService from 'src/services/ProductService'

const useProducts = (filter: 0 | 1 | 2 | null) => {
  const useCompanyProducts: any = useQuery({
    queryKey: ['companyProducts', filter],
    queryFn: () => getCompanyProducts('', filter),
    staleTime: Infinity,
    enabled: true
  })

  const companyProducts = useCompanyProducts?.data?.result

  const isLoading = useCompanyProducts.isLoading

  return {
    companyProducts,
    isLoading,
    deleteProduct,
    activeProducts,
    getCompanyProducts
  }
}

export default useProducts

const getCompanyProducts = async (accessToken = '', activeStatus: 0 | 1 | 2 | null) => {
  try {
    const response: any = await CompanyService.getCompanyProducts(accessToken, activeStatus)

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
    console.error('Error deleting product:', error)
    throw error
  }
}

const activeProducts = async (id: number, statusId: 0 | 1 | 2) => {
  try {
    const response: any = await ProductService.activeProducts('', id, statusId)

    return response
  } catch (error) {
    console.error('Error changing product status:', error)
    throw error
  }
}
