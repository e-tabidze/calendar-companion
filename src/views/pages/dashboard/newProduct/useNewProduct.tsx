import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductService from 'src/services/ProductService'
import { Product } from 'src/types/Product'
import { NewProductSchema } from 'src/@core/validation/newProductSchema'
import useProductInfo from './useProductInfo'
import { useEffect } from 'react'

const useNewProduct = () => {
  // const { companyServices } = useProductInfo()

  // const services = companyServices?.map((service: any) => ({
  //   id: service.id,
  //   price: '',
  //   currency: '',
  //   quantity: ''
  // }))

  // const serviceItem = {
  //   id: null,
  //   price: '',
  //   currency: '',
  //   quantity: ''
  // }

  const discount_item = {
    number: 1,
    period: 'დღე',
    discount_percent: ''
  }

  const newProductDefaultValues = {
    company_id: 102,
    apply_discount: false,
    discount: [discount_item],
    additional_options: [{}],
    identification_number: '123456789',
    company_services: [] as any[],
    any_period: true,
    min_period: {
      has_min_period: false,
      time_interval: 'კვირა',
      time_span: 1
    },
    start_city: '',
    end_city: ''
  }
  // useEffect(() => {
  //   if (companyServices) {
  //     setValue('company_services', services)
  //   }
  // }, [companyServices])

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
    reValidateMode: 'onChange',
    defaultValues: newProductDefaultValues,

    // @ts-ignore
    resolver: yupResolver(NewProductSchema)
  })

  const { fields: additionalParams, append: appendAdditionalParam } = useFieldArray({
    control,
    name: 'additional_options'
  })

  const { fields: serviceItems, append: appendServiceItem } = useFieldArray({
    control,
    name: 'company_services'
  })

  const {
    fields: discountItems,
    append: appendDiscountItem,
    remove
  } = useFieldArray({
    control,
    name: 'discount'
  })

  const productValues: any = useWatch({ control })

  const createNewProduct = async (params: { AccessToken: any; product: Product }) => {
    const { AccessToken, product } = params

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
    remove,
    createNewProduct,
    serviceItems,
    appendServiceItem
  }
}

export default useNewProduct
