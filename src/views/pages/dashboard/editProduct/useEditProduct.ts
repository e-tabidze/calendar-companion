import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductService from 'src/services/ProductService'
import { Product } from 'src/types/Product'
import { NewProductSchema } from 'src/@core/validation/newProductSchema'
import useProductInfo from '../useProductInfo'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import useProfile from 'src/hooks/useProfile'

const useEditProduct = (id: number) => {
  const { companyServices } = useProductInfo()
  const { activeCompanyId } = useProfile()

  const useProductDetailsData = useQuery(['productDetails', id], () => getProductDetails('', id), {
    enabled: !!id
  })

  const productDetailsData = useProductDetailsData.data?.result?.data

  console.log(productDetailsData, 'productDetailsData in edit')

  console.log(productDetailsData?.product_services, ' productDetailsData?.product_services')

  const services = productDetailsData?.product_services?.map((service: any) => ({
    id: service?.company_service_id,
    price: service?.price || '',
    currency: service?.currency || 'GEL',
    quantity: service?.quantity || '',
    isSelected: true,
  }))

  const discount_item = {
    number: 1,
    period: 'დღე',
    discount_percent: ''
  }

  const productDefaultValues = {
    company_id: activeCompanyId,
    vin: '',
    plate: '',
    man_id: '',
    model_id: '',
    prod_year: '',
    odometer: {
      run: 0,
      measure: ''
    },
    additional_information: '',
    use_instruction: '',
    images: null,
    category_id: '',
    fuel_type_id: '',
    seat_type_id: '',
    luggage_numbers: '',
    door_type_id: '',
    drive_tires_id: '',
    transmission_type_id: '',
    additional_options: [] as any[],
    daily_price: {
      amount: '',
      currency: ''
    },
    apply_discount: '',
    identification_number: '',
    is_active: '',
    discount: [discount_item],
    company_services: [services] as any,
    any_period: true,
    min_period: {
      has_min_period: false,
      time_interval: 'კვირა',
      time_span: 1
    },
    preparation_period: '',

    start_city: '',
    start_address: '',
    end_city: '',
    end_address: ''
  }

  useEffect(() => {
    if (productDetailsData) {
      setValue('is_active', productDetailsData?.is_active)
      setValue('identification_number', productDetailsData?.company.identification_number)
      setValue('vin', productDetailsData?.vin)
      setValue('plate', productDetailsData?.plate)
      setValue('man_id', productDetailsData?.man_id)
      setValue('model_id', productDetailsData?.model_id)
      setValue('prod_year', productDetailsData?.prod_year)
      setValue('odometer.run', productDetailsData?.car_run)
      setValue('odometer.measure', productDetailsData?.measure)
      setValue('additional_information', productDetailsData?.additional_information)
      setValue('use_instruction', productDetailsData?.use_instruction)
      setValue('images', productDetailsData?.images?.split(',') || null)
      setValue('category_id', productDetailsData?.category_id)
      setValue('fuel_type_id', productDetailsData?.fuel_type_id)
      setValue('seat_type_id', productDetailsData?.seat_type_id)
      setValue('luggage_numbers', productDetailsData?.luggage_numbers)
      setValue('door_type_id', productDetailsData?.door_type_id)
      setValue('drive_tires_id', productDetailsData?.drive_tires_id)
      setValue('transmission_type_id', productDetailsData?.transmission_type_id)
      setValue(
        'additional_options',
        productDetailsData?.product_additional_information?.map((item: any) => item?.additional_information_id)
      )
      setValue('daily_price.amount', productDetailsData?.price)
      setValue('daily_price.currency', productDetailsData?.currency)
      setValue('apply_discount', productDetailsData?.apply_discount)
      setValue(
        'company_services',
        productDetailsData?.product_services?.map((service: any) => ({
          id: service?.company_service_id,
          price: service?.price || '',
          currency: service?.currency || 'GEL',
          quantity: service?.quantity || '',
          isSelected: true
        }))
      )
      setValue('any_period', productDetailsData?.any_period)

      setValue('min_period.time_span', productDetailsData?.min_time_span)
      setValue('min_period.time_interval', productDetailsData?.min_time_interval)
      setValue('any_period', productDetailsData?.any_period)
      setValue('preparation_period', productDetailsData?.preparation_period)

      setValue('start_city', productDetailsData?.start_city)
      setValue('start_address', productDetailsData?.start_address)

      setValue('end_city', productDetailsData?.end_city)
      setValue('end_address', productDetailsData?.end_address)
    }
  }, [companyServices, productDetailsData])

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    resetField,
    setError,
    clearErrors,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: productDefaultValues,
    resolver: yupResolver(NewProductSchema) as any
  })

  const {
    fields: images,
    append: appendImages,
    remove: removeImage
  } = useFieldArray({
    control,
    name: 'images'
  })

  const { fields: additionalParams, append: appendAdditionalParam } = useFieldArray({
    control,
    name: 'additional_options'
  })

  const {
    fields: discountItems,
    append: appendDiscountItem,
    remove: removeDiscountItem
  } = useFieldArray({
    control,
    name: 'discount'
  })

  const productValues: any = useWatch({ control })

  const editProduct = async (AccessToken = '', product: Product) => {
    try {
      const response: any = await ProductService.editProduct(AccessToken, id, product)

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
    images,
    appendImages,
    removeImage,
    productValues,
    additionalParams,
    appendAdditionalParam,
    discountItems,
    appendDiscountItem,
    discount_item,
    removeDiscountItem,
    editProduct,
    productDefaultValues,
    isValid,
    trigger
  }
}

export default useEditProduct

export const getProductDetails = async (accessToken = '', id: number) => {
  try {
    const response: any = await ProductService.editProductDetails(accessToken, id)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
