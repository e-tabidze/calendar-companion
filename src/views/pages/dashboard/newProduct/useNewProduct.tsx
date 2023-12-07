import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductService from 'src/services/ProductService'
import { Product } from 'src/types/Product'
import { NewProductSchema } from 'src/@core/validation/newProductSchema'
import useProductInfo from '../useProductInfo'
import { useEffect } from 'react'

const useNewProduct = () => {
  const { companyServices } = useProductInfo()

  const services = companyServices?.map((service: any) => ({
    id: service.id,
    price: service.type_id === 3 ? 0 : null,
    currency: 'GEL',
    quantity: '',
    isSelected: false
  }))

  const discount_item = {
    number: 1,
    period: 'დღე',
    discount_percent: ''
  }

  const newProductDefaultValues = {
    company_id: 161,
    vin: '',
    plate: '',
    man_id: '',
    model_id: '',
    prod_year: '',
    odometer: {
      run: 0,
      measure: 'km'
    },
    additional_information: '',
    use_instruction: '',
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
      currency: 'GEL'
    },
    apply_discount: false,
    is_active: true,
    discount: [discount_item],
    company_services: [services],
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
    if (companyServices) {
      setValue('company_services', services)
    }
  }, [companyServices])

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: newProductDefaultValues,
    resolver: yupResolver(NewProductSchema) as any
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

  const createNewProduct = async (AccessToken = '', product: Product) => {
    try {
      const response: any = await ProductService.createNewProduct(AccessToken, product)

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
    productValues,
    additionalParams,
    appendAdditionalParam,
    discountItems,
    appendDiscountItem,
    discount_item,
    removeDiscountItem,
    createNewProduct,
    isValid
  }
}

export default useNewProduct
