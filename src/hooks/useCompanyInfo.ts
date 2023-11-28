import { useQuery } from '@tanstack/react-query'
import CompanyService from 'src/services/CompanyService'

const useCompanyInfo = (id: number) => {
  const { data, isLoading, refetch } = useQuery(['companyInfo', id], () => getCompanyInfo('', id), {
    staleTime: Infinity,
    enabled: !!id
  })

  const companyInfo = data?.result?.data

  return {
    companyInfo,
    isLoading,
    refetch
  }
}

export default useCompanyInfo

export const getCompanyInfo = async (accessToken = '', id = 60) => {
  try {
    const response: any = await CompanyService.getCompanyInfo(accessToken, id)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
