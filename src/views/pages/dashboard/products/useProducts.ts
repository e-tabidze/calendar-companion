import { useQuery } from '@tanstack/react-query'
import CompanyService from 'src/services/CompanyService'

const useProducts = (step?: number | undefined) => {
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
    isLoading
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
