import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const useNewProduct = () => {
  const additional_parameter = {
    id: '',
    title: ''
  }

  const discount_item = {
    number_of_days: 1,
    period: '',
    amount: ''
  }
  const newListingDefaultValues = {
    discount: {
      apply_discount: false,
      discount_item: [discount_item]
    },
    additional_parameters: [additional_parameter]
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
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: newListingDefaultValues
  })

  const { fields: additionalParams, append: appendAdditionalParam } = useFieldArray({
    control,
    name: 'additional_parameters'
  })

  const { fields: discountItems, append: appendDiscountItem } = useFieldArray({
    control,
    name: 'discount.discount_item'
  })

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
    additionalParams,
    appendAdditionalParam,
    discountItems,
    appendDiscountItem,
    discount_item
  }
}

export default useNewProduct
