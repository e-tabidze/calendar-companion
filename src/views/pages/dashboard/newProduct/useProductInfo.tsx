import { useQuery } from '@tanstack/react-query'
import CompanyService from 'src/services/CompanyService'
import ProductService from 'src/services/ProductService'

const useProductInfo = (step?: number | undefined) => {
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

  const useComapnyServices: any = useQuery({
    queryKey: ['companyServices'],
    queryFn: () => getCompanyServices(),
    staleTime: Infinity,
    enabled: step === 4
  })

  const productDetails = useProductDetails?.data?.result?.data

  const manufacturers = useManufacturers?.data?.result?.data

  const additionalParams = useAdditionalParams?.data?.result?.data

  const companyServices = useComapnyServices?.data?.result?.data

  return {
    productDetails,
    manufacturers,
    additionalParams,
    companyServices
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

export const getCompanyServices = async (accessToken = '', company_id = 102) => {
  try {
    const response: any = await CompanyService.getCompanyServices(accessToken, company_id)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
