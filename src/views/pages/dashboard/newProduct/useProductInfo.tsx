import { useQuery } from '@tanstack/react-query'
import ProductService from 'src/services/ProductService'

const useProductInfo = () => {
  const useProductDetails: any = useQuery({
    queryKey: ['productDetails'],
    queryFn: () => getProductDetails(),
    staleTime: Infinity
  })

  const useManufacturers: any = useQuery({
    queryKey: ['manufacturers'],
    queryFn: () => getManufacturers(),
    staleTime: Infinity
  })

  const useAdditionalParams: any = useQuery({
    queryKey: ['additionalParams'],
    queryFn: () => getAdditionalParams(),
    staleTime: Infinity
  })

  const productDetails = useProductDetails?.data?.result?.data

  const manufacturers = useManufacturers?.data?.result?.data

  const additionalParams = useAdditionalParams?.data?.result?.data

  return {
    productDetails,
    manufacturers,
    additionalParams
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
