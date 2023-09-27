import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductService from 'src/services/ProductService'
import { useInfiniteQuery } from '@tanstack/react-query'

const useNewProduct = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const useProductDetails: any = useInfiniteQuery({
    queryKey: ['productDetails'],
    queryFn: () => getProductDetails(),
    staleTime: Infinity
  })

  const useManufacturers: any = useInfiniteQuery({
    queryKey: ['manufacturers'],
    queryFn: () => getManufacturers(),
    staleTime: Infinity
  })

  const productDetails = useProductDetails?.data

  const manufacturers = useManufacturers?.data?.pages[0]?.result?.data

  const newProductValues: any = useWatch({ control })

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    newProductValues,
    // manufacturerModels,
    manufacturers,
    productDetails
  }
}

export default useNewProduct

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
