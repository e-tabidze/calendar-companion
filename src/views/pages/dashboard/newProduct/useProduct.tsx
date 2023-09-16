import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductService from 'src/services/ProductService'
import { useQuery } from '@tanstack/react-query'

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
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const useSeatTypes: any = useQuery({
    queryKey: ['seatTypes'],
    queryFn: () => getSeatTypes(),
    staleTime: Infinity
  })

  const useDoorTypes: any = useQuery({
    queryKey: ['doorTypes'],
    queryFn: () => getDoorTypes(),
    staleTime: Infinity
  })

  const useDriveTypes: any = useQuery({
    queryKey: ['driveTypes'],
    queryFn: () => getDriveTypes(),
    staleTime: Infinity
  })

  const useTransmissionTypes: any = useQuery({
    queryKey: ['transmissionTypes'],
    queryFn: () => getTransmissionTypes(),
    staleTime: Infinity
  })

  const useCategories: any = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: Infinity
  })

  const useManufacturers: any = useQuery({
    queryKey: ['manufacturers'],
    queryFn: () => getManufacturers(),
    staleTime: Infinity
  })

  const useManufacturerModels: any = useQuery({
    queryKey: ['manufacturerModels'],
    queryFn: () => getManufacturerModels(),
    staleTime: Infinity
  })


  const useFuels: any = useQuery({
    queryKey: ['fuels'],
    queryFn: () => getFuels(),
    staleTime: Infinity
  })

  const seatTypes = useSeatTypes?.data?.result.data

  const doorTypes = useDoorTypes?.data?.result.data

  const driveTypes = useDriveTypes?.data?.result.data

  const transmissionTypes = useTransmissionTypes?.data?.result.data

  const categories = useCategories?.data?.result.data

  const manufacturers = useManufacturers?.data?.result.data

  const manufacturerModels = useManufacturerModels?.data?.result.data

  const fuels = useFuels?.data?.result.data

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
    seatTypes,
    doorTypes,
    driveTypes,
    transmissionTypes,
    categories,
    manufacturers,
    manufacturerModels,
    fuels
  }
}

export default useNewProduct

export const getSeatTypes = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getSeatTypes(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getDoorTypes = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getDoorTypes(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getDriveTypes = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getDriveTypes(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getTransmissionTypes = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getTransmissionTypes(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCategories = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getCategories(accessToken)

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

export const getManufacturerModels = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getManufacturerModels(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getFuels = async (accessToken = '') => {
  try {
    const response: any = await ProductService.getFuels(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}