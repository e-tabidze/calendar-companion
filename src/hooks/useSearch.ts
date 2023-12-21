import { QueryClient, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import SearchService from 'src/services/SearchService'

const useSearch = () => {
  const urlSearchParams = typeof window !== 'undefined' ? new URLSearchParams(window?.location.search) : null
  const params: any = {}
  const queryClient = new QueryClient()

  const router = useRouter()

  if (urlSearchParams) {
    for (const [key, value] of urlSearchParams.entries()) {
      if (key.endsWith('[]')) {
        const paramName = key.slice(0, -2)
        params[paramName] = params[paramName] || []
        params[paramName].push(Number(value))
      } else {
        params[key] = value
      }
    }
  }

  const convertToNumberArray = (param: number[]) => {
    if (Array.isArray(param)) {
      return param.map(Number).filter(num => !isNaN(num) && num !== null)
    }

    return []
  }

  console.log(params, 'params')

  const searchDefaultValues = {
    page: Number(params?.page) || 1,
    location: params?.location || '',
    fuel_types: convertToNumberArray(params?.fuel_types),
    category: convertToNumberArray(params?.category),
    seat_types: convertToNumberArray(params?.seat_types),
    luggage_numbers: convertToNumberArray(params?.luggage_numbers),
    drive_tires: convertToNumberArray(params?.drive_tires),
    door_types: convertToNumberArray(params?.door_types),
    transmission_types: convertToNumberArray(params?.transmission_types),
    additional_information: convertToNumberArray(params?.additional_information),
    price_min: params?.price_min || '',
    price_max: params?.price_max || '',
    manufacturer_id: convertToNumberArray(params?.manufacturer_id),
    model_id: convertToNumberArray(params?.model_id),
    free_delivery: params?.free_delivery == 'false' ? false : true,
    year_from: params?.year_from || '',
    year_to: params?.year_to || '',
    sort_by: params?.sort_by || 'id',
    order_by: params.order_by || 'asc',
    booking: {
      book_from: params?.book_from || '',
      book_to: params?.book_to || ''
    }
  }

  useEffect(() => {
    setValue('page', Number(params?.page) || 1)
    setValue('location', params?.location || '')
    setValue('fuel_types', convertToNumberArray(params?.fuel_types))
    setValue('category', convertToNumberArray(params?.category))
    setValue('seat_types', convertToNumberArray(params?.seat_types))
    setValue('luggage_numbers', convertToNumberArray(params?.luggage_numbers))
    setValue('drive_tires', convertToNumberArray(params?.drive_tires))
    setValue('door_types', convertToNumberArray(params?.door_types))
    setValue('transmission_types', convertToNumberArray(params?.transmission_types))
    setValue('additional_information', convertToNumberArray(params?.additional_information))
    setValue('price_min', params?.price_min || '')
    setValue('price_max', params?.price_max || '')
    setValue('manufacturer_id', convertToNumberArray(params?.manufacturer_id))
    setValue('model_id', convertToNumberArray(params?.model_id))
    setValue('free_delivery', params?.free_delivery == 'false' ? false : true)
    setValue('year_from', params?.year_from || '')
    setValue('year_to', params?.year_to || '')
    setValue('sort_by', params?.sort_by || 'id')
    setValue('order_by', params?.order_by || 'asc')
    setValue('booking.book_from', params?.book_from || '')
    setValue('booking.book_to', params?.book_to || '')
  }, [router.query])

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    reset,
    setError,
    clearErrors,
    setValue,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: searchDefaultValues
  })

  const searchValues: any = useWatch({ control })

  const { fields: fuel_types, append: appendFuelType } = useFieldArray({
    control,
    name: 'fuel_types'
  })

  const { fields: category, append: appendCategory } = useFieldArray({
    control,
    name: 'category'
  })

  const { fields: seatTypes, append: appendSeatType } = useFieldArray({
    control,
    name: 'seat_types'
  })

  const { fields: luggageNumbers, append: appendLuggageNumber } = useFieldArray({
    control,
    name: 'luggage_numbers'
  })

  const { fields: driveTires, append: appendDriveTire } = useFieldArray({
    control,
    name: 'drive_tires'
  })

  const { fields: doorTypes, append: appendDoorType } = useFieldArray({
    control,
    name: 'door_types'
  })

  const { fields: transmissionType, append: appendTransmissionType } = useFieldArray({
    control,
    name: 'transmission_types'
  })

  const { fields: additionalInformation, append: appendAdditionalInformation } = useFieldArray({
    control,
    name: 'additional_information'
  })

  const searchProductsMutation = useMutation((querystring: string) => searchProducts(querystring), {
    onSettled: () => {
      queryClient.invalidateQueries(['searchProducts'])
    },
    onError: error => {
      console.error('Mutation Error:', error)
    }
  })

  const productsData = searchProductsMutation?.data?.result?.data
  const isLoading = searchProductsMutation?.isLoading
  const totalProductsCount = searchProductsMutation?.data?.result?.total
  const totalPages = searchProductsMutation?.data?.result?.last_page

  const searchProducts = async (querystring: string) => {
    try {
      const response: any = await SearchService.getSearchProducts(querystring)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  const objectToURI = (obj: any) => {
    return Object.entries(obj)
      .filter(([value]) => {
        return value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)
      })
      .map(([key, value]: [string, any]) => {
        if (key === 'booking' && value !== null && value !== undefined) {
          const { book_from, book_to } = value

          return [`book_from=${encodeURIComponent(book_from)}`, `book_to=${encodeURIComponent(book_to)}`]
        } else if (Array.isArray(value)) {
          return value.map(v => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`)
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        }
      })
      .flat()
      .join('&')
  }

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    getValues,
    reset,
    searchValues,
    fuel_types,
    appendFuelType,
    category,
    appendCategory,
    seatTypes,
    appendSeatType,
    luggageNumbers,
    appendLuggageNumber,
    driveTires,
    appendDriveTire,
    doorTypes,
    appendDoorType,
    transmissionType,
    appendTransmissionType,
    additionalInformation,
    appendAdditionalInformation,
    searchProducts,
    searchProductsMutation,
    productsData,
    isLoading,
    totalProductsCount,
    objectToURI,
    searchDefaultValues,
    totalPages
  }
}

export default useSearch
