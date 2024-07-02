import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { queryClient } from 'src/pages/_app'
import SearchService from 'src/services/SearchService'
import { objectToURI } from 'src/utils/objectToURI'

const useSearch = () => {
  const urlSearchParams = typeof window !== 'undefined' ? new URLSearchParams(window?.location.search) : null
  const params: any = {}
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

  const convertToNumberArray: any = (param: number[]) => {
    if (Array.isArray(param)) {
      return param.map(Number).filter(num => !isNaN(num) && num !== null)
    }

    return []
  }

  const searchDefaultValues = {
    page: 1,
    location: params?.location || '',
    fuel_types: convertToNumberArray(params?.fuel_types),
    category: convertToNumberArray(params?.category),
    seat_types: convertToNumberArray(params?.seat_types),
    luggage_numbers: convertToNumberArray(params?.luggage_numbers),
    drive_tires: convertToNumberArray(params?.drive_tires),
    steering_wheel: convertToNumberArray(params?.steering_wheel),
    door_types: convertToNumberArray(params?.door_types),
    transmission_types: convertToNumberArray(params?.transmission_types),
    additional_information: convertToNumberArray(params?.additional_information),
    price_min: params?.price_min || '',
    price_max: params?.price_max || '',
    manufacturer_id: convertToNumberArray(params?.manufacturer_id),
    model_id: convertToNumberArray(params?.model_id),

    // free_delivery: params?.free_delivery == 'true' ? true : false,
    year_from: params?.year_from || '',
    year_to: params?.year_to || '',
    sort_by: params?.sort_by || 'id',
    order_by: params.order_by || 'desc',
    booking: {
      book_from: params?.book_from || '',
      book_to: params?.book_to || ''
    }

    // page: 1,
    // location: '',
    // fuel_types: [],
    // category: [],
    // seat_types: [],
    // luggage_numbers: [],
    // drive_tires: [],
    // steering_wheel: [],
    // door_types: [],
    // transmission_types: [],
    // additional_information: [],
    // price_min: '',
    // price_max: '',
    // manufacturer_id: [],
    // model_id: [],

    // // free_delivery: params?.free_delivery == 'true' ? true : false,
    // year_from: params?.year_from || '',
    // year_to: params?.year_to || '',
    // sort_by: 'id',
    // order_by: 'desc',
    // booking: {
    //   book_from: '',
    //   book_to: ''
    // }
  }

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      setValue('page', 1)
      setValue('location', params?.location || '')
      setValue('fuel_types', convertToNumberArray(params?.fuel_types))
      setValue('category', convertToNumberArray(params?.category))
      setValue('seat_types', convertToNumberArray(params?.seat_types))
      setValue('luggage_numbers', convertToNumberArray(params?.luggage_numbers))
      setValue('drive_tires', convertToNumberArray(params?.drive_tires))
      setValue('door_types', convertToNumberArray(params?.door_types))
      setValue('steering_wheel', convertToNumberArray(params?.steering_wheel || 1))
      setValue('transmission_types', convertToNumberArray(params?.transmission_types))
      setValue('additional_information', convertToNumberArray(params?.additional_information))
      setValue('price_min', params?.price_min || '')
      setValue('price_max', params?.price_max || '')
      setValue('manufacturer_id', convertToNumberArray(params?.manufacturer_id))
      setValue('model_id', convertToNumberArray(params?.model_id))

      // setValue('free_delivery', params?.free_delivery == 'false' ? false : true)
      setValue('year_from', Number(params?.year_from) || '')
      setValue('year_to', Number(params?.year_to) || '')
      setValue('sort_by', params?.sort_by || 'id')
      setValue('order_by', params?.order_by || 'desc')
      setValue('booking.book_from', params?.book_from || '')
      setValue('booking.book_to', params?.book_to || '')

      // searchProductsMutation.mutate(objectToURI(searchDefaultValues))
      searchProductsQuery.refetch()
    }
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

  const { fields: steeringWheel, append: appendSteeringWheel } = useFieldArray({
    control,
    name: 'steering_wheel'
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

  // const searchProductsMutation = useMutation((querystring: string) => searchProducts('', querystring), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['searchProducts'])
  //   },
  //   onError: error => {
  //     console.error('Mutation Error:', error)
  //   }
  // })

  const searchProductsQuery = useQuery(
    ['searchProducts'],
    async () => {
      try {
        const response = await searchProducts('', objectToURI(getValues()))
        queryClient.invalidateQueries(['searchProducts'])

        return response
      } catch (error) {
        console.error('Mutation Error:', error)
        throw error
      }
    },
    {
      staleTime: Infinity,
      enabled: false,
      onError: error => {
        console.error('Query Error:', error)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['searchProducts'])
      }
    }
  )

  const productsData = searchProductsQuery?.data?.result?.data
  const isLoading = searchProductsQuery?.isLoading
  const totalProductsCount = searchProductsQuery?.data?.result?.total
  const totalPages = searchProductsQuery?.data?.result?.last_page

  const searchProducts = async (AccessToken = '', querystring: string) => {
    try {
      const response: any = await SearchService.getSearchProducts(AccessToken, querystring)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
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
    appendSteeringWheel,
    steeringWheel,
    appendAdditionalInformation,
    searchProducts,
    searchProductsQuery,
    productsData,
    isLoading,
    totalProductsCount,
    objectToURI,
    searchDefaultValues,
    totalPages
  }
}

export default useSearch
