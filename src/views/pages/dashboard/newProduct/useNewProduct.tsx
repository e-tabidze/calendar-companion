import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductService from 'src/services/ProductService'
import { Product } from 'src/types/product'
import CompanyService from 'src/services/CompanyService'

const useNewProduct = () => {
  const discount_item = {
    number: 1,
    period: 'დღე',
    discount_percent: ''
  }

  const newListingDefaultValues = {
    company_id: 102,
    apply_discount: false,
    discount: [discount_item],
    additional_options: [],
    identification_number: '123456789'
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
    reValidateMode: 'onChange',
    defaultValues: newListingDefaultValues
  })

  const { fields: additionalParams, append: appendAdditionalParam } = useFieldArray({
    control,
    name: 'additional_options'
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
    createNewProduct
  }
}

export default useNewProduct
