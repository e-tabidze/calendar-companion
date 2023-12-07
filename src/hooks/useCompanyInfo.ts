import { useQuery } from '@tanstack/react-query'
import CompanyService from 'src/services/CompanyService'

const useCompanyInfo = (id: any) => {
  const { data, isLoading, refetch } = useQuery(['companyInfo', id], () => getCompanyInfo('', id), {
    staleTime: Infinity,
    enabled: !!id
  })

  const useCompanyBranches: any = useQuery({
    queryKey: ['singleCompanyBranches', id],
    queryFn: () => getSingleCompanyBranches(id),
    staleTime: Infinity,
    enabled: !!id
  })

  const companyInfo = data?.result?.data
  const singleCompanyBranches = useCompanyBranches?.data?.result?.data

  console.log(companyInfo, 'companyInfo')

  return {
    companyInfo,
    isLoading,
    refetch,
    singleCompanyBranches
  }
}

export default useCompanyInfo

export const getCompanyInfo = async (accessToken = '', id: number | string) => {
  try {
    const response: any = await CompanyService.getCompanyInfo(accessToken, id)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getSingleCompanyBranches = async (company_id: number | string) => {
  try {
    const response: any = await CompanyService.getSingleCompanyBranches(company_id)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
