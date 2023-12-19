import { useQuery } from '@tanstack/react-query'
import useProfile from 'src/hooks/useProfile'
import CompanyService from 'src/services/CompanyService'
import ProductService from 'src/services/ProductService'

const useProductInfo = (step?: number | undefined) => {
  const { isAuthenticated, activeCompany } = useProfile()

  const useProductDetails: any = useQuery({
    queryKey: ['productDetails'],
    queryFn: () => getProductDetails(),
    staleTime: Infinity,
    enabled: step === 2
  })

  const useManufacturers: any = useQuery({
    queryKey: ['manufacturers'],
    queryFn: () => getManufacturers(),
    staleTime: Infinity
  })

  const useAdditionalParams: any = useQuery({
    queryKey: ['additionalParams'],
    queryFn: () => getAdditionalParams(),
    staleTime: Infinity,
    enabled: step === 2
  })

  const useCompanyServices: any = useQuery({
    queryKey: ['companyServices'],
    queryFn: () => getCompanyServices(''),
    staleTime: Infinity,
    enabled: step === 4
  })

  const useCompanyBranches: any = useQuery({
    queryKey: ['companyBranches'],
    queryFn: () => getCompanyBranches(''),
    staleTime: Infinity,
    enabled: true
  })

  const useGetDashboardData: any = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => getDashboardData(''),
    staleTime: Infinity,
    enabled: !!isAuthenticated && !!activeCompany
  })

  const productDetails = useProductDetails?.data?.result?.data

  const manufacturers = useManufacturers?.data?.result?.data

  const additionalParams = useAdditionalParams?.data?.result?.data

  const companyServices = useCompanyServices?.data?.result?.data

  const companyBranches = useCompanyBranches?.data?.result?.data

  const dashboardData = useGetDashboardData?.data?.result?.data

  return {
    productDetails,
    manufacturers,
    additionalParams,
    companyServices,
    isProductDetailsLoading: useProductDetails.isLoading,
    isManufacturersLoading: useManufacturers.isLoading,
    isAdditionalParamsLoading: useAdditionalParams.isLoading,
    isCompanyServicesLoading: useCompanyServices.isLoading,
    companyBranches,
    dashboardData
  }
}

export default useProductInfo

export const getProductDetails = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getProductDetails(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getManufacturers = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getManufacturers(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getManufacturerModels = async (accessToken = '', manufacturerId: string) => {
  try {
    const response: any = await ProductService.getManufacturerModels(accessToken, manufacturerId)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getAdditionalParams = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getAdditionalParams(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCompanyServices = async (accessToken = '') => {
  try {
    const response: any = await CompanyService.getCompanyServices(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCompanyBranches = async (accessToken = '') => {
  try {
    const response: any = await CompanyService.getCompanyBranches(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getDashboardData = async (accessToken = '') => {
  try {
    const response: any = await CompanyService.getDashboardData(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
