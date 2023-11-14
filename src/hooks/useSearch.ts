import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import SearchService from 'src/services/SearchService'

const useSearch = () => {
  const urlSearchParams = typeof window !== 'undefined' ? new URLSearchParams(window?.location.search) : null
  const params: any = {}

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

  const searchDefaultValues = {
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
    manufacturer: convertToNumberArray(params?.manufacturer),
    free_delivery: params?.free_delivery === 'true'
  }

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
    defaultValues: searchDefaultValues
  })

  const searchValues: any = useWatch({ control })

  const { fields: fuel_types, append: appendFuelType } = useFieldArray({
    control,
    name: 'fuel_types'
  })

  const {
    fields: category,
    append: appendCategory,
    remove: removeCategory
  } = useFieldArray({
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

  const searchProducts = async (querystring: string) => {
    try {
      const response: any = await SearchService.getSearchProducts(querystring)

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
    searchValues,
    fuel_types,
    appendFuelType,
    category,
    appendCategory,
    removeCategory,
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
    searchProducts
  }
}

export default useSearch
