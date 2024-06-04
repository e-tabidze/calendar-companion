import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductService from 'src/services/ProductService'
import { Product } from 'src/types/Product'
import { NewProductSchema } from 'src/@core/validation/newProductSchema'
import useProductInfo from '../useProductInfo'
import { useEffect } from 'react'
import StaticService from 'src/services/StaticService'
import useProfile from 'src/hooks/useProfile'

const useNewProduct = () => {
  const { companyServices } = useProductInfo()
  const { activeCompanyId } = useProfile()

  const services = companyServices?.map((service: any) => ({
    id: service.id,
    price: service.type_id === 3 ? 0 : null,
    currency: 'GEL',
    quantity: service.quantity ?? 0,
    is_selected: false
  }))

  const discount_item = {
    number: 1,
    period: 'დღე',
    discount_percent: ''
  }

  const other_locations = {
    city: '',
    price: '0',
    currency: 'GEL',
    address: ''
  }

  const newProductDefaultValues = {
    company_id: activeCompanyId,
    daily_price: {
      currency: 'GEL'
    },
    has_deposit: false,
 
    deposit_amount: 0,
    deposit_currency: 'GEL',
    apply_discount: false,
    is_active: true,
    images: [],
    discount: [discount_item],
    company_services: [services],
    any_period: true,
    min_period: {
      has_min_period: false,
      time_interval: 'კვირა',
      time_span: 1
    },
    has_other_delivery_locations: false,
    has_other_return_locations: false,
    other_delivery_locations: [other_locations],
    other_return_locations: [other_locations]
  }

  useEffect(() => {
    if (companyServices) {
      setValue('company_services', services)
    }
    if (activeCompanyId) {
      setValue('company_id', activeCompanyId)
    }
  }, [companyServices, activeCompanyId])

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    trigger,
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

  const {
    fields: otherDeliverLocations,
    append: appendOtherDeliveryLocations,
    remove: removeOtherDeliveryLocations
  } = useFieldArray({
    control,
    name: 'other_delivery_locations'
  })

  const {
    fields: otherReturnLocations,
    append: appendOtherReturnLocations,
    remove: removeOtherReturnLocations
  } = useFieldArray({
    control,
    name: 'other_return_locations'
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
    createNewProduct,
    isValid,
    postUploadProductImages,
    postSaveProductImages,
    trigger,
    other_locations,
    otherDeliverLocations, 
    appendOtherDeliveryLocations,
    removeOtherDeliveryLocations,
    otherReturnLocations,
    appendOtherReturnLocations,
    removeOtherReturnLocations
  }
}

export default useNewProduct

const postUploadProductImages = async ({ Files, count, userId }: any) => {
  try {
    const response: any = await StaticService.postUploadProductImages('', Files, count, userId)

    return response.data
  } catch (error) {
    console.error('Error fetching location suggestions:', error)
    throw error
  }
}

const postSaveProductImages = async (FilesList: string[], productId: number | string) => {
  try {
    const response: any = await StaticService.postSaveProductImages('', FilesList, productId)

    return response.data
  } catch (error) {
    console.error('Error fetching location suggestions:', error)
    throw error
  }
}
