import { useFieldArray, useForm, useWatch } from 'react-hook-form'

const useSearch = () => {
  const isClient = typeof window !== 'undefined'

  const urlSearchParams = typeof window !== 'undefined' ? new URLSearchParams(window?.location.search) : null
  const params = typeof window !== 'undefined' ? Object.fromEntries(urlSearchParams?.entries()) : {}

  const obj = {
    location: 'Arlene Mccoy',
    fuel_types: '3',
    category: '6',
    seat_types: '5',
    luggage_numbers: '3',
    drive_tires: '2',
    door_types: '2',
    transmission_types: '1',
    additional_information: '1',
    price_min: '10',
    price_max: '50',
    manufacturer: '2',
    free_delivery: 'true'
  }
  console.log(params, 'searchParams')

  const searchDefaultValues = {
    location: params?.location || '',
    fuel_types: [Number(params?.fuel_types)] || [],
    category: params?.category || [],
    seat_types: params?.seat_types || [],
    luggage_numbers: params?.luggage_numbers || [],
    drive_tires: params?.drive_tires || [],
    door_types: params?.door_types || [],
    transmission_types: params?.transmission_types || [],
    additional_information: params?.additional_information || [],
    price_min: params?.price_min || '',
    price_max: params?.price_max || '',
    manufacturer: params?.manufacturer || [],
    free_delivery: true
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
    appendAdditionalInformation
  }
}

export default useSearch
